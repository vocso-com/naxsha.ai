"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FLOORS, DEFAULT_PLOT, TOOLS, RECENT_PROJECTS, computeCost, glassBlur,
  type ToolId, type FurnitureKind, type PlacedItem, type Plot, type Wall, type Floor,
} from "@/lib/studio";
import { HomeScreen } from "./HomeScreen";
import { Onboarding } from "./Onboarding";
import { StudioNav } from "./StudioNav";
import { Toolbar } from "./Toolbar";
import { ZoomControls } from "./FloorSwitcher";
import { ChatDock, type ChatMsg } from "./ChatDock";
import { RightPanel } from "./RightPanel";
import { FloorCanvas, contentSize, type View } from "./FloorCanvas";

type Phase = "home" | "onboarding" | "studio";
type Theme = "dark" | "light";
type Sel = { type: "room" | "item"; id: string } | null;

let idc = 0;
const uid = () => `id-${Date.now()}-${idc++}`;

const FACING: Record<string, Wall> = { North: "N", South: "S", East: "E", West: "W" };

function aiReply(text: string): string {
  const t = text.toLowerCase();
  if (/budget|cost|cheap|expensive|reduce|save/.test(t))
    return "I've recalculated the estimate — open the Costs tab on the right to see the civil breakdown. Want me to swap vitrified tiles for a more economical finish to bring it down?";
  if (/vastu|facing|direction|pooja/.test(t))
    return "The pooja room and kitchen already sit in the auspicious north-east and south-east zones. Select any room to see its Vastu verdict in the properties panel.";
  if (/bedroom|bed|room|bigger|smaller|enlarge/.test(t))
    return "I can resize that — select the room on the plan and I'll adjust the walls while keeping the layout buildable. Which room did you have in mind?";
  if (/furniture|sofa|bed|sofa|place|add/.test(t))
    return "Open the Furniture tool on the left rail, pick a piece, then click anywhere on the plan to drop it. Everything you add flows straight into the cost estimate.";
  if (/floor|upstairs|first|terrace/.test(t))
    return "Use the floor switcher at the bottom to move between Ground and First. I've stacked the staircase consistently on both levels.";
  return "Got it — I've noted that. You can keep refining by selecting elements on the plan, or tell me a specific change and I'll redraft that part.";
}

export function StudioApp() {
  const [phase, setPhase] = useState<Phase>("home");
  const [plot, setPlot] = useState<Plot>(DEFAULT_PLOT);
  const [floors, setFloors] = useState(FLOORS);
  const [activeFloorId, setActiveFloorId] = useState(FLOORS[0].id);
  const [items, setItems] = useState<PlacedItem[]>([]);
  const [selected, setSelected] = useState<Sel>(null);
  const [tool, setTool] = useState<ToolId>("select");
  const [placingKind, setPlacingKind] = useState<FurnitureKind | null>(null);
  const [view, setView] = useState<View>({ zoom: 1, tx: 0, ty: 0 });
  const [rightTab, setRightTab] = useState<"properties" | "costs">("properties");
  const [projectName, setProjectName] = useState("Untitled home");

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [theme, setTheme] = useState<Theme>("dark");

  const [size, setSize] = useState({ w: 0, h: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const activeFloor = floors.find((f) => f.id === activeFloorId)!;
  const cost = useMemo(() => computeCost(floors, items), [floors, items]);
  const floorItems = useMemo(() => items.filter((i) => i.floorId === activeFloorId), [items, activeFloorId]);

  // measure canvas wrapper
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [phase]);

  // Centre the plan in the visible gap between the floating docks.
  const fit = useCallback((s = size) => {
    if (!s.w || !s.h) return;
    const { CW, CH } = contentSize(plot);
    const padL = chatOpen ? 380 : 48, padR = 348, padT = 56, padB = 104;
    const availW = Math.max(200, s.w - padL - padR);
    const availH = Math.max(200, s.h - padT - padB);
    const zoom = Math.min(2, Math.max(0.5, Math.min(availW / CW, availH / CH)));
    setView({
      zoom,
      tx: padL + (availW - CW * zoom) / 2,
      ty: padT + (availH - CH * zoom) / 2,
    });
  }, [size, plot, chatOpen]);

  // fit once when entering studio and size is known
  const fitted = useRef(false);
  useEffect(() => {
    if (phase === "studio" && size.w && !fitted.current) {
      fit(size);
      fitted.current = true;
    }
  }, [phase, size, fit]);

  // re-centre the plan into the freed/reclaimed space when the chat dock toggles
  useEffect(() => {
    if (phase === "studio" && fitted.current) fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen]);

  // keyboard tool shortcuts
  useEffect(() => {
    if (phase !== "studio") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const t = TOOLS.find((x) => x.shortcut.toLowerCase() === e.key.toLowerCase());
      if (t) setTool(t.id);
      if (e.key === "Escape") { setSelected(null); setPlacingKind(null); }
      if ((e.key === "Delete" || e.key === "Backspace") && selected?.type === "item") {
        setItems((arr) => arr.filter((i) => i.id !== selected.id));
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, selected]);

  const completeOnboarding = (answers: Record<string, string>) => {
    // derive plot facing from answer
    const facing = FACING[answers.facing] ?? "S";
    let pw = DEFAULT_PLOT.w, ph = DEFAULT_PLOT.h;
    const m = answers.plot?.match(/(\d+)\s*[×x]\s*(\d+)/);
    if (m) { pw = +m[1]; ph = +m[2]; }
    setPlot({ w: pw, h: ph, facing });
    const floorsLabel = answers.floors === "Ground only" ? "Ground" : answers.floors === "G + 2" ? "G+2" : "G+1";
    const used = answers.floors === "Ground only" ? FLOORS.slice(0, 1) : FLOORS;
    setFloors(used);
    setActiveFloorId(used[0].id);
    setProjectName(`${answers.bhk ?? "Home"} · ${pw}×${ph} ${floorsLabel}`);
    setMessages([
      { id: uid(), from: "ai", text: `Done — here's your ${pw}×${ph} ${answers.bhk ?? "home"}, ${answers.facing ?? "south"}-facing. I've placed every room to Vastu and the live estimate is on the right.` },
      { id: uid(), from: "ai", text: "Select any room to inspect it, drop furniture from the left rail, or just tell me what to change." },
    ]);
    setPhase("studio");
  };

  // "Draw from scratch" / opening a recent project — jump straight into the studio.
  const startBlank = (name = "Untitled home") => {
    setPlot(DEFAULT_PLOT);
    setFloors(FLOORS);
    setActiveFloorId(FLOORS[0].id);
    setProjectName(name);
    setMessages([
      { id: uid(), from: "ai", text: "Blank canvas ready. Use the left rail to draw walls and drop rooms, or just tell me what to add." },
    ]);
    fitted.current = false;
    setPhase("studio");
  };

  // open an existing project by id (from the home grid or the nav switcher)
  const openProject = (id: string) => {
    const p = RECENT_PROJECTS.find((x) => x.id === id);
    startBlank(p?.name ?? "Untitled home");
  };

  // "New project" — return to the home screen so the user picks
  // Draft-with-AI or Draw-from-scratch (the new-project flow).
  const newProject = () => {
    fitted.current = false;
    setPhase("home");
  };

  const send = (text?: string) => {
    const value = (text ?? draft).trim();
    if (!value) return;
    setMessages((m) => [...m, { id: uid(), from: "user", text: value }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: uid(), from: "ai", text: aiReply(value) }]);
      setThinking(false);
      if (!chatOpen) setUnread((u) => u + 1);
    }, 900);
  };

  const toggleChat = () => {
    setChatOpen((o) => {
      if (!o) setUnread(0);
      return !o;
    });
  };

  const placeFurniture = (kind: FurnitureKind, x: number, y: number) => {
    const it: PlacedItem = { id: uid(), kind, floorId: activeFloorId, x, y, rot: 0 };
    setItems((arr) => [...arr, it]);
    setSelected({ type: "item", id: it.id });
  };
  const rotateItem = (id: string) => setItems((arr) => arr.map((i) => (i.id === id ? { ...i, rot: (i.rot + 90) % 360 } : i)));
  const deleteItem = (id: string) => { setItems((arr) => arr.filter((i) => i.id !== id)); setSelected(null); };
  const moveItem = (id: string, x: number, y: number) => setItems((arr) => arr.map((i) => (i.id === id ? { ...i, x, y } : i)));

  const onSelect = (sel: Sel) => {
    setSelected(sel);
    if (sel) setRightTab("properties");
  };

  const FLOOR_WORDS = ["Ground", "First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
  const addFloor = () => {
    const level = floors.reduce((m, f) => Math.max(m, f.level), -1) + 1;
    const word = FLOOR_WORDS[level] ?? `Level ${level}`;
    const nf: Floor = { id: uid(), name: `${word} Floor`, level, rooms: [] };
    setFloors((arr) => [...arr, nf]);
    setActiveFloorId(nf.id);
    setSelected(null);
  };

  const suggestions = useMemo(() => {
    if (messages.length <= 2) return ["Make the master bigger", "Reduce the budget", "Is this Vastu compliant?"];
    return ["Add a car porch", "Swap to vitrified tiles", "Move the staircase"];
  }, [messages.length]);

  return (
    <div className="studio-root naxsha-theme fixed inset-0 flex flex-col" data-theme={theme}>
      {/* drafting grid texture over the whole workspace */}
      <div aria-hidden className="st-grid-overlay pointer-events-none fixed inset-0" />

      <StudioNav
        projectName={projectName}
        onExport={() => window.print()}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        minimal={phase !== "studio"}
        floors={floors}
        activeFloorId={activeFloorId}
        onPickFloor={(id) => { setActiveFloorId(id); setSelected(null); }}
        onAddFloor={addFloor}
        projects={RECENT_PROJECTS}
        onSwitchProject={openProject}
        onNewProject={newProject}
      />

      <div ref={wrapRef} className="relative flex-1 overflow-hidden">
        {/* home + onboarding workspace glow */}
        {phase !== "studio" && (
          <>
            <div aria-hidden className="pointer-events-none absolute" style={{ width: 520, height: 520, left: "50%", top: "38%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(31,90,158,0.25), transparent 70%)" }} />
            <div aria-hidden className="pointer-events-none absolute" style={{ width: 380, height: 380, right: "12%", bottom: "8%", background: "radial-gradient(circle, rgba(184,85,43,0.14), transparent 70%)" }} />
          </>
        )}

        {/* canvas (studio only) */}
        {phase === "studio" && size.w > 0 && (
          <FloorCanvas
            floor={activeFloor}
            plot={plot}
            items={floorItems}
            selected={selected}
            tool={tool}
            placingKind={placingKind}
            view={view}
            width={size.w}
            height={size.h}
            onView={setView}
            onSelect={onSelect}
            onPlace={placeFurniture}
            onMoveItem={moveItem}
          />
        )}

        <AnimatePresence>
          {phase === "home" && (
            <HomeScreen
              key="home"
              onGenerate={() => setPhase("onboarding")}
              onDraw={() => startBlank()}
              onOpenProject={openProject}
            />
          )}
          {phase === "onboarding" && <Onboarding key="onb" onComplete={completeOnboarding} />}
        </AnimatePresence>

        {phase === "studio" && (
          <>
            {/* bottom dock — horizontal toolbar with labels, centered in the
                canvas gap so it never slides under the side panels */}
            <div
              className="absolute bottom-4 z-20 flex justify-center pointer-events-none"
              style={{ left: chatOpen ? 360 : 16, right: 332, transition: "left 420ms cubic-bezier(0.22,1,0.36,1)" }}
            >
              <div className="pointer-events-auto">
                <Toolbar tool={tool} onTool={setTool} placingKind={placingKind} onPlacing={setPlacingKind} />
              </div>
            </div>

            {/* zoom controls — centered in the canvas gap, mirroring the
                bottom toolbar so it never slides under the side panels */}
            <div
              className="absolute top-4 z-20 flex justify-center pointer-events-none"
              style={{ left: chatOpen ? 360 : 16, right: 332, transition: "left 420ms cubic-bezier(0.22,1,0.36,1)" }}
            >
              <div className="pointer-events-auto">
                <ZoomControls
                  zoom={view.zoom}
                  onZoom={(z) => setView((v) => ({ ...v, zoom: z }))}
                  onFit={() => fit()}
                />
              </div>
            </div>

            {/* active-tool hint — tucked to the left of the canvas gap */}
            <div
              className="absolute top-4 z-10"
              style={{ left: chatOpen ? 376 : 32, transition: "left 420ms cubic-bezier(0.22,1,0.36,1)" }}
            >
              <motion.div
                key={tool + String(placingKind)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="st-glass-float px-3 h-8 inline-flex items-center rounded-full"
                style={glassBlur(16)}
              >
                <span style={{ fontFamily: "var(--font-naxsha-mono)", fontSize: 10.5, letterSpacing: "0.04em", color: "var(--st-text-2)" }}>
                  {TOOLS.find((t) => t.id === tool)?.hint}
                  {!TOOLS.find((t) => t.id === tool)?.functional && " · preview"}
                </span>
              </motion.div>
            </div>

            <ChatDock
              messages={messages}
              draft={draft}
              onDraft={setDraft}
              onSend={() => send()}
              suggestions={suggestions}
              onSuggestion={(s) => send(s)}
              thinking={thinking}
              open={chatOpen}
              onToggle={toggleChat}
              unread={unread}
            />
            <RightPanel
              tab={rightTab}
              onTab={setRightTab}
              selected={selected}
              floors={floors}
              activeFloor={activeFloor}
              items={items}
              plot={plot}
              cost={cost}
              onRotate={rotateItem}
              onDelete={deleteItem}
              onClear={() => setSelected(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}
