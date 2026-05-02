'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Sparkles, Brain, CheckCircle2, Zap, Play, RotateCcw, Crown, Code2, ChevronLeft, ChevronRight, PauseCircle, Pause, CheckCircle, HelpCircle, ListChecks, Info, AlertCircle, Globe } from 'lucide-react';
import { ALGORITHM_CONTENT } from '@/lib/algorithm-content';

/* ═══════════════════════════════════════════════════════════════
   REAL ALGORITHM ANIMATIONS
════════════════════════════════════════════════════════════════ */

/* ── Alpha-Beta Tree Animation ── */
type TreeNode = { id: number; x: number; y: number; value: number; isMax: boolean; pruned: boolean; active: boolean; evaluated: boolean; alpha: number; beta: number; children: number[] };
type TreeEdge = { from: number; to: number; pruned: boolean };

const AB_NODES: TreeNode[] = [
  { id: 0, x: 470, y: 36, value: 0, isMax: true, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [1, 2] },
  { id: 1, x: 250, y: 112, value: 0, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [3, 4] },
  { id: 2, x: 690, y: 112, value: 0, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [5, 6] },
  { id: 3, x: 140, y: 196, value: 0, isMax: true, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [7, 8] },
  { id: 4, x: 360, y: 196, value: 0, isMax: true, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [9, 10] },
  { id: 5, x: 580, y: 196, value: 0, isMax: true, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [11, 12] },
  { id: 6, x: 800, y: 196, value: 0, isMax: true, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [13, 14] },
  { id: 7, x: 90, y: 286, value: 3, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 8, x: 190, y: 286, value: 5, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 9, x: 310, y: 286, value: 6, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 10, x: 410, y: 286, value: 9, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 11, x: 530, y: 286, value: 2, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 12, x: 630, y: 286, value: 4, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 13, x: 750, y: 286, value: 1, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
  { id: 14, x: 850, y: 286, value: 7, isMax: false, alpha: -Infinity, beta: Infinity, pruned: false, active: false, evaluated: false, children: [] },
];

const AB_EDGES: TreeEdge[] = [
  { from: 0, to: 1, pruned: false },
  { from: 0, to: 2, pruned: false },
  { from: 1, to: 3, pruned: false },
  { from: 1, to: 4, pruned: false },
  { from: 2, to: 5, pruned: false },
  { from: 2, to: 6, pruned: false },
  { from: 3, to: 7, pruned: false },
  { from: 3, to: 8, pruned: false },
  { from: 4, to: 9, pruned: false },
  { from: 4, to: 10, pruned: false },
  { from: 5, to: 11, pruned: false },
  { from: 5, to: 12, pruned: false },
  { from: 6, to: 13, pruned: false },
  { from: 6, to: 14, pruned: false },
];

const AB_STEPS: { nodeId: number; evaluated: number[]; active: number; pruned: number[]; values: Record<number, number>; msg: string }[] = [
  { nodeId: 3, evaluated: [3], active: 3, pruned: [], values: { 3: 3 }, msg: 'Leaf node 3 returns value = 3' },
  { nodeId: 4, evaluated: [3,4], active: 4, pruned: [], values: { 3: 3, 4: 5 }, msg: 'Leaf node 4 returns value = 5' },
  { nodeId: 1, evaluated: [1,3,4], active: 1, pruned: [], values: { 1: 3, 3: 3, 4: 5 }, msg: 'Minimizer node 1 picks min(3,5) = 3. α=3' },
  { nodeId: 5, evaluated: [1,3,4,5], active: 5, pruned: [], values: { 1: 3, 3: 3, 4: 5, 5: 2 }, msg: 'Leaf node 5 returns value = 2. β updates to 2 at node 2' },
  { nodeId: 6, evaluated: [1,3,4,5], active: -1, pruned: [6], values: { 1: 3, 3: 3, 4: 5, 5: 2, 6: 9 }, msg: '✂ PRUNED: α(3) ≥ β(2) — node 6 cut off!' },
  { nodeId: 2, evaluated: [1,2,3,4,5], active: 2, pruned: [6], values: { 1: 3, 2: 2, 3: 3, 4: 5, 5: 2, 6: 9 }, msg: 'Minimizer node 2 picks min(2) = 2 (node 6 pruned)' },
  { nodeId: 0, evaluated: [0,1,2,3,4,5], active: 0, pruned: [6], values: { 0: 3, 1: 3, 2: 2, 3: 3, 4: 5, 5: 2, 6: 9 }, msg: 'Maximizer root picks max(3,2) = 3 ✓' },
];

const AB_STEPS_V2: { nodeId: number; evaluated: number[]; active: number; pruned: number[]; values: Record<number, number>; msg: string }[] = [
  { nodeId: 7, evaluated: [7], active: 7, pruned: [], values: { 7: 3 }, msg: 'Leaf node 7 returns value = 3' },
  { nodeId: 8, evaluated: [7, 8], active: 8, pruned: [], values: { 7: 3, 8: 5 }, msg: 'Leaf node 8 returns value = 5' },
  { nodeId: 3, evaluated: [3, 7, 8], active: 3, pruned: [], values: { 3: 5, 7: 3, 8: 5 }, msg: 'Max node 3 picks max(3,5) = 5' },
  { nodeId: 9, evaluated: [3, 7, 8, 9], active: 9, pruned: [], values: { 3: 5, 7: 3, 8: 5, 9: 6 }, msg: 'Leaf node 9 returns value = 6' },
  { nodeId: 10, evaluated: [3, 7, 8, 9, 10], active: 10, pruned: [], values: { 3: 5, 7: 3, 8: 5, 9: 6, 10: 9 }, msg: 'Leaf node 10 returns value = 9' },
  { nodeId: 4, evaluated: [3, 4, 7, 8, 9, 10], active: 4, pruned: [], values: { 3: 5, 4: 9, 7: 3, 8: 5, 9: 6, 10: 9 }, msg: 'Max node 4 picks max(6,9) = 9' },
  { nodeId: 1, evaluated: [1, 3, 4, 7, 8, 9, 10], active: 1, pruned: [], values: { 1: 5, 3: 5, 4: 9, 7: 3, 8: 5, 9: 6, 10: 9 }, msg: 'Min node 1 picks min(5,9) = 5. Root alpha becomes 5.' },
  { nodeId: 11, evaluated: [1, 3, 4, 7, 8, 9, 10, 11], active: 11, pruned: [], values: { 1: 5, 3: 5, 4: 9, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2 }, msg: 'Leaf node 11 returns value = 2' },
  { nodeId: 12, evaluated: [1, 3, 4, 7, 8, 9, 10, 11, 12], active: 12, pruned: [], values: { 1: 5, 3: 5, 4: 9, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2, 12: 4 }, msg: 'Leaf node 12 returns value = 4' },
  { nodeId: 5, evaluated: [1, 3, 4, 5, 7, 8, 9, 10, 11, 12], active: 5, pruned: [], values: { 1: 5, 3: 5, 4: 9, 5: 4, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2, 12: 4 }, msg: 'Max node 5 picks max(2,4) = 4' },
  { nodeId: 2, evaluated: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12], active: 2, pruned: [], values: { 1: 5, 2: 4, 3: 5, 4: 9, 5: 4, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2, 12: 4 }, msg: 'Min node 2 sees beta = 4, already below root alpha = 5' },
  { nodeId: 6, evaluated: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12], active: -1, pruned: [6, 13, 14], values: { 1: 5, 2: 4, 3: 5, 4: 9, 5: 4, 6: 7, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2, 12: 4, 13: 1, 14: 7 }, msg: 'Pruned: subtree at node 6 is skipped because beta(4) <= alpha(5)' },
  { nodeId: 0, evaluated: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12], active: 0, pruned: [6, 13, 14], values: { 0: 5, 1: 5, 2: 4, 3: 5, 4: 9, 5: 4, 6: 7, 7: 3, 8: 5, 9: 6, 10: 9, 11: 2, 12: 4, 13: 1, 14: 7 }, msg: 'Root picks max(5,4) = 5 and keeps the left branch as the best move' },
];

function AlphaBetaAnimation() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStep(-1);
    setRunning(false);
  };

  const play = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(true);
    setStep(0);
    let s = 0;
    intervalRef.current = setInterval(() => {
      s++;
      if (s >= AB_STEPS_V2.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setRunning(false);
        return;
      }
      setStep(s);
    }, 1400);
  }, []);

  useEffect(() => () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const cur = step >= 0 && step < AB_STEPS_V2.length ? AB_STEPS_V2[step] : null;
  const activeNode = cur && cur.active >= 0 ? AB_NODES.find((node) => node.id === cur.active) : null;

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02), 0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>Alpha-Beta Pruning — Live Tree evaluation</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Minimax Decision Flow with Optimization</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          <button onClick={play} disabled={running} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25), inset 0 2px 0 rgba(255,255,255,0.3)' }}><Play size={14} /> Play</button>
        </div>
      </div>

      <svg viewBox="0 0 940 340" className="w-full" style={{ height: '320px' }}>
        {/* Edges */}
        {AB_EDGES.map((e, i) => {
          const from = AB_NODES[e.from], to = AB_NODES[e.to];
          const isPruned = cur?.pruned.includes(to.id);
          return (
            <line key={i} x1={from.x} y1={from.y + 18} x2={to.x} y2={to.y - 18}
              stroke={isPruned ? '#ef4444' : 'rgba(255,255,255,0.12)'} strokeWidth={isPruned ? 2 : 1.5}
              strokeDasharray={isPruned ? '5 3' : ''} />
          );
        })}

        {/* Nodes */}
        {AB_NODES.map((n) => {
          const isActive = cur?.active === n.id;
          const isEvaluated = cur?.evaluated.includes(n.id);
          const isPruned = cur?.pruned.includes(n.id);
          const val = cur?.values[n.id as keyof typeof cur.values];
          const fill = isPruned ? 'rgba(239,68,68,0.1)' : isActive ? 'rgba(255,179,67,0.2)' : isEvaluated ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)';
          const strk = isPruned ? '#ef4444' : isActive ? '#ffb343' : isEvaluated ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)';
          const textColor = isPruned ? '#ef4444' : isActive ? '#ffb343' : isEvaluated ? '#ffffff' : 'rgba(255,255,255,0.4)';
          return (
            <g key={n.id}>
              <motion.circle cx={n.x} cy={n.y} r={22} fill={fill} stroke={strk} strokeWidth={isActive ? 3.5 : 2}
                animate={isActive ? { r: [22, 25, 22] } : {}} transition={{ duration: 0.6, repeat: Infinity }} />
              <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="14" fill={textColor} fontWeight="900" fontFamily="var(--font-display)">
                {val !== undefined ? val : n.isMax ? 'MAX' : 'MIN'}
              </text>
              {isPruned && <text x={n.x} y={n.y - 28} textAnchor="middle" fontSize="18" fill="#ef4444">✂</text>}
              {n.children.length === 0 && (
                <text x={n.x} y={n.y + 36} textAnchor="middle" fontSize="10" fontWeight="900" fill="rgba(255,255,255,0.3)" className="uppercase tracking-widest">leaf</text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g>
          <circle cx={20} cy={252} r={6} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <text x={30} y={256} fontSize="9" fill="rgba(255,255,255,0.45)">Evaluated</text>
          <circle cx={90} cy={252} r={6} fill="rgba(255,179,67,0.2)" stroke="#ffb343" strokeWidth="1.5" />
          <text x={100} y={256} fontSize="9" fill="rgba(255,255,255,0.45)">Active</text>
          <circle cx={155} cy={252} r={6} fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5" />
          <text x={165} y={256} fontSize="9" fill="rgba(255,255,255,0.45)">Pruned</text>
        </g>
      </svg>

      {/* Step message */}
      <AnimatePresence mode="wait">
        {cur && (
          <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="mt-10 rounded-[28px] border-2 p-8 shadow-2xl relative overflow-hidden" style={{ background: cur.pruned.length > 0 && step === 4 ? 'rgba(239,68,68,0.1)' : 'rgba(255,179,67,0.1)', color: cur.pruned.length > 0 && step === 4 ? '#ef4444' : '#ffb343', borderColor: cur.pruned.length > 0 && step === 4 ? 'rgba(239,68,68,0.4)' : 'rgba(255,179,67,0.4)' }}>
            <div className="absolute top-0 left-0 w-2 h-full bg-current opacity-20"/>
            <div className="text-[12px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Decision Step {step + 1}/{AB_STEPS_V2.length}</div>
            <div className="text-xl font-black leading-tight tracking-tight">{cur.msg}</div>
          </motion.div>
        )}
        {!cur && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-10 rounded-3xl p-8 text-center bg-white/[0.01] border-2 border-white/5 shadow-inner">
            <div className="text-lg font-black text-white/20 uppercase tracking-[0.5em]">Press Play to Evaluate Tree</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border bg-white/5 p-5 md:flex-row md:items-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex-1">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Search Progress</div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #ffb343, #ff9820)' }}
              animate={{ width: step >= 0 ? `${((step + 1) / AB_STEPS_V2.length) * 100}%` : '8%' }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-[12px] font-semibold text-white/58">
          <div className="rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>Evaluated: {cur?.evaluated.length ?? 0}</div>
          <div className="rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>Pruned: {cur?.pruned.length ?? 0}</div>
          <div className="rounded-full border px-3 py-1.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>Step: {step >= 0 ? step + 1 : 0}/{AB_STEPS_V2.length}</div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border-2 p-6 transition-all" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Current Evaluator</div>
          <div className="text-xl font-black text-white">{activeNode ? (activeNode.isMax ? 'Maximizer Mode' : 'Minimizer Mode') : 'Inertia'}</div>
          <p className="mt-3 text-[14px] font-bold leading-relaxed text-white/40">
            {activeNode ? `Node ${activeNode.id} is comparing branch values to update local bounds.` : 'The algorithm is waiting for activation.'}
          </p>
        </div>
        <div className="rounded-[28px] border-2 p-6 transition-all" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Pruning Rule</div>
          <div className="text-xl font-black text-[#ffb343] tracking-widest">ALPHA ≥ BETA</div>
          <p className="mt-3 text-[14px] font-bold leading-relaxed text-white/40">
            Discard subtrees when the optimal result for parent is already guaranteed elsewhere.
          </p>
        </div>
        <div className="rounded-[28px] border-2 p-6 transition-all" style={{ borderColor: cur?.pruned.length ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)', background: cur?.pruned.length ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)' }}>
          <div className="text-[12px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Decision Outcome</div>
          <div className="text-xl font-black text-white">{step === AB_STEPS_V2.length - 1 ? 'Optimal Score = 5' : cur?.pruned.length ? '✂ Subtree Cut' : 'Continuous Assessment'}</div>
          <p className="mt-3 text-[14px] font-bold leading-relaxed text-white/40">
            {step === AB_STEPS_V2.length - 1 ? 'Comparison complete. Strategy resolved to value 5.' : cur?.pruned.length ? 'Decision-making efficiency boosted by cutting redundant paths.' : 'Evaluating tree heuristic values.'}
          </p>
        </div>
      </div>

    </div>
  );
}

/* ── BFS Wave Animation ── */
type BFSNode = { id: number; x: number; y: number; label: string; level: number };
const BFS_NODES: BFSNode[] = [
  { id: 0, x: 430, y: 40, label: 'S', level: 0 },
  { id: 1, x: 250, y: 120, label: 'A', level: 1 },
  { id: 2, x: 430, y: 120, label: 'B', level: 1 },
  { id: 3, x: 610, y: 120, label: 'C', level: 1 },
  { id: 4, x: 160, y: 205, label: 'D', level: 2 },
  { id: 5, x: 300, y: 205, label: 'E', level: 2 },
  { id: 6, x: 520, y: 205, label: 'F', level: 2 },
  { id: 7, x: 680, y: 205, label: 'G', level: 2 },
  { id: 8, x: 100, y: 290, label: 'H', level: 3 },
  { id: 9, x: 205, y: 290, label: 'I', level: 3 },
  { id: 10, x: 460, y: 290, label: 'J', level: 3 },
  { id: 11, x: 575, y: 290, label: 'K', level: 3 },
];
const BFS_EDGES = [[0,1],[0,2],[0,3],[1,4],[1,5],[3,6],[3,7],[4,8],[4,9],[6,10],[6,11]];
const BFS_LEVEL_COLORS = ['#ffb343','#ffd27f','#8fd3ff','#d9f3ff'];

function BFSAnimation() {
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const generateSteps = () => {
    const steps: any[] = [];
    const q: number[] = [0];
    const vis: number[] = [];
    
    steps.push({
      queue: [...q],
      visited: [...vis],
      currentNode: null,
      msg: `Starting BFS level-order traversal at root S.`
    });

    while (q.length > 0) {
      const cur = q.shift()!;
      steps.push({
        queue: [...q],
        visited: [...vis],
        currentNode: cur,
        msg: `Dequeued ${BFS_NODES[cur].label}. Checking neighbors...`
      });

      if (!vis.includes(cur)) {
        vis.push(cur);
        steps.push({
          queue: [...q],
          visited: [...vis],
          currentNode: cur,
          msg: `Marking ${BFS_NODES[cur].label} as visited.`
        });

        const neighbors = BFS_EDGES
          .filter((e) => e[0] === cur || e[1] === cur)
          .map((e) => (e[0] === cur ? e[1] : e[0]))
          .filter((n) => !vis.includes(n) && !q.includes(n));
        
        for (const n of neighbors) {
          q.push(n);
          steps.push({
            queue: [...q],
            visited: [...vis],
            currentNode: cur,
            msg: `Found unvisited neighbor ${BFS_NODES[n].label}, adding to queue.`
          });
        }
      }
    }
    steps.push({
      queue: [],
      visited: [...vis],
      currentNode: null,
      msg: 'BFS Wave Traversal Complete! All reachable nodes processed.'
    });
    return steps;
  };

  const play = async () => {
    if (running && paused) {
      setPaused(false);
      refPaused.current = false;
      return;
    }
    const steps = generateSteps();
    setHistory(steps);
    setRunning(true);
    refRunning.current = true;
    setPaused(false);
    refPaused.current = false;

    for (let i = 0; i < steps.length; i++) {
        if (!refRunning.current) break;
        while (refPaused.current && refRunning.current) {
          await new Promise(r => setTimeout(r, 100));
        }
        if (!refRunning.current) break;
        setCurrentStep(i);
        await new Promise(r => setTimeout(r, 800));
    }
    setRunning(false);
    refRunning.current = false;
  };

  const pause = () => {
    setPaused(true);
    refPaused.current = true;
  };

  const reset = () => {
    setRunning(false);
    refRunning.current = false;
    setPaused(false);
    refPaused.current = false;
    setCurrentStep(-1);
    setHistory([]);
  };

  const next = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (history.length === 0) {
      const steps = generateSteps();
      setHistory(steps);
      setCurrentStep(0);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const state = currentStep >= 0 ? history[currentStep] : {
    queue: [],
    visited: [],
    currentNode: null,
    msg: 'Idle. Press Play or Next to step through.'
  };

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-base font-bold text-white tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>BFS — Step-by-Step Debugger</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mt-1.5 text-white/40">Queue-Based Frontier Propagation</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <svg viewBox="0 0 780 330" className="w-full" style={{ height: '300px' }}>
        {BFS_EDGES.map(([a, b], i) => {
          const na = BFS_NODES[a], nb = BFS_NODES[b];
          const highlighted = state.currentNode === a || state.currentNode === b;
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={highlighted ? 'rgba(255,179,67,0.55)' : 'rgba(255,255,255,0.1)'} strokeWidth={highlighted ? 2.5 : 1.5} />;
        })}
        {BFS_NODES.map((n) => {
          const isVisited = state.visited.includes(n.id);
          const inQueue = state.queue.includes(n.id);
          const isCurrent = state.currentNode === n.id;
          const fill = isCurrent ? 'rgba(255,152,32,0.24)' : isVisited ? 'rgba(143,211,255,0.15)' : inQueue ? 'rgba(255,179,67,0.12)' : 'rgba(255,255,255,0.03)';
          const stroke = isCurrent ? '#ff9820' : isVisited ? '#8fd3ff' : inQueue ? '#ffb343' : 'rgba(255,255,255,0.15)';
          const textColor = isCurrent ? '#ff9820' : isVisited ? '#8fd3ff' : inQueue ? '#ffb343' : 'rgba(255,255,255,0.4)';
          return (
            <g key={n.id}>
              <motion.circle cx={n.x} cy={n.y} r={24} fill={fill} stroke={stroke} strokeWidth={isVisited || inQueue || isCurrent ? 3.5 : 2} animate={isCurrent ? { scale: [1, 1.15, 1] } : {}} />
              <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={textColor} fontFamily="var(--font-display)">{n.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-8 flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-[28px] p-6 lg:p-8">
        <div className="flex-1">
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Interactive Debugger Feedback</div>
          <div className="text-[20px] font-black text-[#ffb343] leading-tight min-h-[60px] drop-shadow-sm">{state.msg}</div>
          
          <div className="mt-6 border-t pt-6 border-white/5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-3">Traversal Sequence</div>
            <div className="flex flex-wrap gap-2">
              {state.visited.map((id: number, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black text-white border border-white/10" style={{ background: 'rgba(255,179,67,0.08)' }}>
                    {BFS_NODES[id].label}
                  </div>
                  {idx < state.visited.length - 1 && <span className="text-white/20 select-none">→</span>}
                </div>
              ))}
              {state.visited.length === 0 && <span className="text-xs text-white/10 italic">No nodes visited yet</span>}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[300px] space-y-5">
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em]">Live Queue State</div>
          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {state.queue.map((id: number) => (
                <motion.div key={id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                  className="w-12 h-12 rounded-[18px] flex items-center justify-center text-[16px] font-black text-[#ffb343] border-2 shadow-xl" style={{ background: 'rgba(255,179,67,0.1)', borderColor: 'rgba(255,179,67,0.4)' }}>
                  {BFS_NODES[id].label}
                </motion.div>
              ))}
              {state.queue.length === 0 && <span className="text-sm font-black text-white/20 italic tracking-widest uppercase">System Idle</span>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ── DFS Stack Animation ── */
const DFS_NODES = BFS_NODES;
const DFS_EDGES = BFS_EDGES;

function DFSAnimation() {
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const generateSteps = () => {
    const steps: any[] = [];
    const vis: number[] = [];
    const stk: number[] = [];
    const backtracked: number[] = [];

    const dfsRecur = (node: number) => {
      vis.push(node);
      stk.push(node);
      
      steps.push({
        visited: [...vis],
        stack: [...stk],
        backtrack: [...backtracked],
        currentNode: node,
        msg: `Visiting node ${DFS_NODES[node].label}. Pushed to stack.`
      });

      const neighbors = DFS_EDGES
        .filter((e) => e[0] === node || e[1] === node)
        .map((e) => (e[0] === node ? e[1] : e[0]))
        .filter((n) => !vis.includes(n));

      for (const next of neighbors) {
        dfsRecur(next);
      }

      stk.pop();
      backtracked.push(node);
      steps.push({
        visited: [...vis],
        stack: [...stk],
        backtrack: [...backtracked],
        currentNode: node,
        msg: `Backtracking from ${DFS_NODES[node].label} after exploring its branch.`
      });
    };

    dfsRecur(0);
    steps.push({
      visited: [...vis],
      stack: [],
      backtrack: [...backtracked],
      currentNode: null,
      msg: 'DFS Deep Traversal Complete!'
    });
    return steps;
  };

  const play = async () => {
    if (running && paused) {
      setPaused(false);
      refPaused.current = false;
      return;
    }
    const steps = generateSteps();
    setHistory(steps);
    setRunning(true);
    refRunning.current = true;
    setPaused(false);
    refPaused.current = false;

    for (let i = 0; i < steps.length; i++) {
        if (!refRunning.current) break;
        while (refPaused.current && refRunning.current) {
          await new Promise(r => setTimeout(r, 100));
        }
        if (!refRunning.current) break;
        setCurrentStep(i);
        await new Promise(r => setTimeout(r, 800));
    }
    setRunning(false);
    refRunning.current = false;
  };

  const pause = () => {
    setPaused(true);
    refPaused.current = true;
  };

  const reset = () => {
    setRunning(false);
    refRunning.current = false;
    setPaused(false);
    refPaused.current = false;
    setCurrentStep(-1);
    setHistory([]);
  };

  const next = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (history.length === 0) {
      const steps = generateSteps();
      setHistory(steps);
      setCurrentStep(0);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const state = currentStep >= 0 ? history[currentStep] : {
    visited: [],
    stack: [],
    backtrack: [],
    currentNode: null,
    msg: 'Idle. Press Play or Next to start.'
  };

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>DFS — Recursive Stack Debugger</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Recursive Stack-Based Path Search</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> Play</button>
          )}
        </div>
      </div>

      <svg viewBox="0 0 780 330" className="w-full" style={{ height: '300px' }}>
        {DFS_EDGES.map(([a, b], i) => {
          const na = DFS_NODES[a], nb = DFS_NODES[b];
          const highlighted = state.currentNode === a || state.currentNode === b;
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={highlighted ? 'rgba(255,179,67,0.55)' : 'rgba(255,255,255,0.1)'} strokeWidth={highlighted ? 2.5 : 1.5} />;
        })}
        {DFS_NODES.map((n) => {
          const isVisited = state.visited.includes(n.id);
          const inStack = state.stack.includes(n.id);
          const isCurrent = state.currentNode === n.id;
          const isBacktrack = state.backtrack.includes(n.id) && !inStack;
          
          const fill = isCurrent ? 'rgba(255,152,32,0.24)' : inStack ? 'rgba(255,179,67,0.18)' : isVisited ? 'rgba(143,211,255,0.12)' : 'rgba(255,255,255,0.03)';
          const stroke = isCurrent ? '#ff9820' : inStack ? '#ffb343' : isBacktrack ? '#ef4444' : isVisited ? '#8fd3ff' : 'rgba(255,255,255,0.15)';
          const textColor = isCurrent ? '#ff9820' : inStack ? '#ffb343' : isBacktrack ? '#ef4444' : isVisited ? '#8fd3ff' : 'rgba(255,255,255,0.4)';
          
          return (
            <g key={n.id}>
              <motion.circle cx={n.x} cy={n.y} r={24} fill={fill} stroke={stroke} strokeWidth={isVisited || inStack || isCurrent ? 3.5 : 2} animate={isCurrent ? { scale: [1, 1.15, 1] } : {}} />
              <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={textColor} fontFamily="var(--font-display)">{n.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-8 flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-[28px] p-6 lg:p-8">
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-2">Debugger Output</div>
          <div className="text-[15px] font-bold text-[#ffb343] leading-relaxed min-h-[48px]">{state.msg}</div>

          <div className="mt-6 border-t pt-6 border-white/5">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-3">Traversal Sequence</div>
            <div className="flex flex-wrap gap-2">
              {state.visited.map((id: number, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black text-white border border-white/10" style={{ background: 'rgba(143,211,255,0.08)' }}>
                    {DFS_NODES[id].label}
                  </div>
                  {idx < state.visited.length - 1 && <span className="text-white/20 select-none">→</span>}
                </div>
              ))}
              {state.visited.length === 0 && <span className="text-xs text-white/10 italic">No nodes visited yet</span>}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[260px] space-y-4">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em]">Recursion Stack</div>
          <div className="flex flex-wrap gap-2 text-[14px] font-bold text-[#8fd3ff]">
            {state.stack.map((id: number) => DFS_NODES[id].label).join(' → ') || <span className="text-white/20 italic font-medium">Stack Clear</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── A* Grid Animation ── */
type Cell = { r: number; c: number; type: 'start' | 'end' | 'wall' | 'open' | 'closed' | 'path' | 'empty'; f: number; g: number; h: number };
const GRID_ROWS = 7, GRID_COLS = 12;
const START = { r: 3, c: 0 }, END = { r: 3, c: 11 };
const WALLS = [[1,2],[2,2],[3,2],[4,2],[5,2],[3,5],[3,6],[3,7],[1,8],[2,8],[3,8],[4,8],[5,8]];
function initGrid(): Cell[][] {
  return Array.from({ length: GRID_ROWS }, (_, r) => Array.from({ length: GRID_COLS }, (_, c): Cell => {
    const isWall = WALLS.some(([wr, wc]) => wr === r && wc === c);
    const isStart = r === START.r && c === START.c;
    const isEnd = r === END.r && c === END.c;
    return { r, c, type: isStart ? 'start' : isEnd ? 'end' : isWall ? 'wall' : 'empty', f: 0, g: 0, h: 0 };
  }));
}

function AStarAnimation() {
  const [grid, setGrid] = useState<Cell[][]>(initGrid);
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState<'start' | 'end' | 'wall' | 'erase' | null>(null);

  const handleMouseDown = (r: number, c: number) => {
    if (running || currentStep >= 0) return;
    setIsMouseDown(true);
    const cellType = grid[r][c].type;
    if (cellType === 'start') setDragMode('start');
    else if (cellType === 'end') setDragMode('end');
    else if (cellType === 'wall') { setDragMode('erase'); updateCell(r, c, 'empty'); }
    else { setDragMode('wall'); updateCell(r, c, 'wall'); }
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (!isMouseDown || running || currentStep >= 0 || !dragMode) return;
    const cellType = grid[r][c].type;
    if ((cellType === 'start' && dragMode !== 'start') || (cellType === 'end' && dragMode !== 'end')) return;
    if (dragMode === 'start') moveSpecial(r, c, 'start');
    else if (dragMode === 'end') moveSpecial(r, c, 'end');
    else if (dragMode === 'wall') updateCell(r, c, 'wall');
    else if (dragMode === 'erase') updateCell(r, c, 'empty');
  };

  const handleMouseUp = () => { setIsMouseDown(false); setDragMode(null); };

  const updateCell = (r: number, c: number, type: 'wall' | 'empty') => {
    setGrid(prev => {
      const next = prev.map(row => row.map(cell => ({ ...cell })));
      if (next[r][c].type !== 'start' && next[r][c].type !== 'end') next[r][c].type = type;
      return next;
    });
  };

  const moveSpecial = (r: number, c: number, type: 'start' | 'end') => {
    setGrid(prev => {
      const next = prev.map(row => row.map(cell => ({ ...cell })));
      for (let i = 0; i < prev.length; i++) for (let j = 0; j < prev[0].length; j++) if (next[i][j].type === type) next[i][j].type = 'empty';
      next[r][c].type = type;
      return next;
    });
  };

  const reset = () => {
    setRunning(false); refRunning.current = false; setPaused(false); refPaused.current = false; setCurrentStep(-1); setHistory([]);
    setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, f: 0, g: 0, h: 0, type: ['open', 'closed', 'path'].includes(cell.type) ? 'empty' : cell.type }))));
  };

  const clearWalls = () => {
    reset();
    setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, f: 0, g: 0, h: 0, type: cell.type === 'start' ? 'start' : cell.type === 'end' ? 'end' : 'empty' }))));
  };

  const manhattan = (r1: number, c1: number, r2: number, c2: number) => Math.abs(r1 - r2) + Math.abs(c1 - c2);

  const generateSteps = () => {
    const steps: any[] = [];
    const currentGrid = grid.map(row => row.map(cell => ({ ...cell, f: 0, g: 0, h: 0, type: ['open', 'closed', 'path'].includes(cell.type) ? 'empty' : cell.type })));
    let startP = { r: 0, c: 0 }, endP = { r: 0, c: 0 };
    currentGrid.forEach(row => row.forEach(c => { if (c.type === 'start') startP = { r: c.r, c: c.c }; if (c.type === 'end') endP = { r: c.r, c: c.c }; }));

    type SNode = { r: number; c: number; g: number; h: number; f: number; parent: SNode | null };
    const open: SNode[] = [{ r: startP.r, c: startP.c, g: 0, h: manhattan(startP.r, startP.c, endP.r, endP.c), f: 0, parent: null }];
    open[0].f = open[0].h;
    const closed = new Set<string>();
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    let found: SNode | null = null;

    steps.push({ grid: currentGrid.map(r => r.map(c => ({...c}))), msg: 'Search initialized at root S.', openSize: 1, closedSize: 0 });

    while (open.length > 0) {
      open.sort((a, b) => a.f - b.f || a.h - b.h);
      const cur = open.shift()!;
      if (cur.r === endP.r && cur.c === endP.c) { found = cur; break; }
      closed.add(`${cur.r},${cur.c}`);
      if (currentGrid[cur.r][cur.c].type !== 'start') currentGrid[cur.r][cur.c].type = 'closed';

      steps.push({ grid: currentGrid.map(r => r.map(c => ({...c}))), msg: `Expanding cell [${cur.r}, ${cur.c}], f=${cur.f}.`, openSize: open.length, closedSize: closed.size });

      for (const [dr, dc] of dirs) {
        const nr = cur.r + dr, nc = cur.c + dc;
        if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS || closed.has(`${nr},${nc}`) || currentGrid[nr][nc].type === 'wall') continue;
        const g = cur.g + 1, h = manhattan(nr, nc, endP.r, endP.c), f = g + h;
        const existing = open.find(n => n.r === nr && n.c === nc);
        if (!existing || f < existing.f) {
          if (existing) { existing.g = g; existing.h = h; existing.f = f; existing.parent = cur; }
          else { open.push({ r: nr, c: nc, g, h, f, parent: cur }); if (currentGrid[nr][nc].type === 'empty') currentGrid[nr][nc].type = 'open'; }
          currentGrid[nr][nc].f = f; currentGrid[nr][nc].g = g; currentGrid[nr][nc].h = h;
        }
      }
    }
    if (found) {
      let currN: SNode | null = found;
      while (currN) {
        if (currentGrid[currN.r][currN.c].type !== 'start' && currentGrid[currN.r][currN.c].type !== 'end') currentGrid[currN.r][currN.c].type = 'path';
        currN = currN.parent;
        steps.push({ grid: currentGrid.map(r => r.map(c => ({...c}))), msg: 'Backtracking best path...', openSize: open.length, closedSize: closed.size });
      }
      steps.push({ grid: currentGrid.map(r => r.map(c => ({...c}))), msg: 'Final Optimal path Found!', openSize: open.length, closedSize: closed.size });
    } else {
       steps.push({ grid: currentGrid.map(r => r.map(c => ({...c}))), msg: 'Path blocked by walls.', openSize: 0, closedSize: closed.size });
    }
    return steps;
  };

  const play = async () => {
    if (running && paused) { setPaused(false); refPaused.current = false; return; }
    const steps = generateSteps(); setHistory(steps); setRunning(true); refRunning.current = true; setPaused(false); refPaused.current = false;
    for (let i = 0; i < steps.length; i++) {
        if (!refRunning.current) break;
        while (refPaused.current && refRunning.current) await new Promise(r => setTimeout(r, 100));
        if (!refRunning.current) break;
        setCurrentStep(i); await new Promise(r => setTimeout(r, 60));
    }
    setRunning(false); refRunning.current = false;
  };

  const pause = () => { setPaused(true); refPaused.current = true; };
  const next = () => {
    if (currentStep < history.length - 1) setCurrentStep(currentStep + 1);
    else if (history.length === 0) { const steps = generateSteps(); setHistory(steps); setCurrentStep(0); }
  };
  const prev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const state = currentStep >= 0 ? history[currentStep] : { grid, msg: 'Idle — Create level or Play.', openSize: 0, closedSize: 0 };

  return (
    <div className="rounded-[30px] p-6 lg:p-10" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-10 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>A* Search — Visual Execution Stream</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Interactive Heuristic Grid Pathfinding</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={clearWalls} className="px-4 py-2 rounded-xl text-[13px] font-bold text-white/45 hover:text-white/80 transition-colors">Clear Walls</button>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>
      <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)` }}>
        {state.grid.map((row: Cell[], r: number) => (
          <div key={r} className="flex gap-2">
            {row.map((cell: Cell, c: number) => {
              const isActive = (state.msg.match(/\[(\d+),\s*(\d+)\]/) || [])[1] === String(r) && (state.msg.match(/\[(\d+),\s*(\d+)\]/) || [])[2] === String(c);
              const isSpecial = cell.type === 'start' || cell.type === 'end';
              return (
                <motion.div key={c} onMouseDown={() => handleMouseDown(r, c)} onMouseEnter={() => handleMouseEnter(r, c)}
                    className="flex-1 rounded-xl flex flex-col items-center justify-center border overflow-hidden relative select-none"
                    style={{ height: '42px', background: cell.type==='start'?'#ffb343':cell.type==='end'?'#ef4444':cell.type==='wall'?'rgba(255,255,255,0.12)':cell.type==='path'?'#34d399':cell.type==='open'?'rgba(255,179,67,0.15)':cell.type==='closed'?'rgba(143,211,255,0.08)':'rgba(255,255,255,0.02)', borderColor: isActive ? '#ff9820' : 'rgba(255,255,255,0.06)' }}
                    animate={isActive ? { scale: 1.1, zIndex: 10 } : { scale: 1 }}>
                    <span className={`text-[12px] font-black ${isSpecial ? 'text-black' : 'text-white'}`}>
                        {cell.type==='start'?'S':cell.type==='end'?'E':''}
                    </span>
                    {!isSpecial && cell.f > 0 && <span className="text-[8px] font-bold text-white/40 absolute bottom-1">f:{cell.f}</span>}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-[28px] p-8">
        <div className="flex-1">
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Solver Logic Stream</div>
          <div className="text-[20px] font-black text-[#ffb343] leading-tight min-h-[60px] drop-shadow-sm">{state.msg}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 pr-4">
           <div>
             <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em]">Open Frontier</div>
             <div className="text-2xl font-black text-white">{state.openSize}</div>
           </div>
           <div>
             <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em]">Closed List</div>
             <div className="text-2xl font-black text-white">{state.closedSize}</div>
           </div>
        </div>
      </div>
    </div>
  );
}


function NQueensAnimation() {
  const clampSize = (value: number) => Math.max(4, Math.min(8, value));
  const createBoard = (n: number) => Array(n).fill(-1);

  const [size, setSize] = useState(4);
  const [sizeInput, setSizeInput] = useState('4');
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const reset = (nextSize = size) => {
    setRunning(false);
    refRunning.current = false;
    setPaused(false);
    refPaused.current = false;
    setCurrentStep(-1);
    setHistory([]);
  };

  const isSafe = (state: number[], row: number, col: number) => {
    for (let prevRow = 0; prevRow < row; prevRow++) {
      const prevCol = state[prevRow];
      if (prevCol === col) return false;
      if (Math.abs(prevCol - col) === Math.abs(prevRow - row)) return false;
    }
    return true;
  };

  const generateSteps = (n: number) => {
    const steps: any[] = [];
    const board = createBoard(n);

    const place = (row: number): boolean => {
      if (row === n) return true;

      for (let col = 0; col < n; col++) {
        steps.push({
          board: [...board],
          checking: { row, col },
          conflict: null,
          backtracking: false,
          msg: `Testing Row ${row + 1}, Col ${col + 1}...`
        });

        if (!isSafe(board, row, col)) {
          steps.push({
            board: [...board],
            checking: { row, col },
            conflict: { row, col },
            backtracking: false,
            msg: `Conflict detected at [${row + 1}, ${col + 1}].`
          });
          continue;
        }

        board[row] = col;
        steps.push({
          board: [...board],
          checking: null,
          conflict: null,
          backtracking: false,
          msg: `Safe! Placed Queen at [${row + 1}, ${col + 1}].`
        });

        if (place(row + 1)) return true;

        steps.push({
          board: [...board],
          checking: { row, col },
          conflict: null,
          backtracking: true,
          msg: `Dead end reached. Backtracking from [${row + 1}, ${col + 1}]...`
        });
        board[row] = -1;
      }
      return false;
    };

    const solved = place(0);
    steps.push({
      board: [...board],
      checking: null,
      conflict: null,
      backtracking: false,
      msg: solved ? 'Solution Found!' : 'No Solution Exists for this N.'
    });
    return steps;
  };

  const solve = async () => {
    if (running && paused) {
      setPaused(false);
      refPaused.current = false;
      return;
    }
    const n = clampSize(Number(sizeInput) || 4);
    setSize(n);
    const steps = generateSteps(n);
    setHistory(steps);
    setRunning(true);
    refRunning.current = true;
    setPaused(false);
    refPaused.current = false;

    for (let i = 0; i < steps.length; i++) {
        if (!refRunning.current) break;
        while (refPaused.current && refRunning.current) {
          await new Promise(r => setTimeout(r, 100));
        }
        if (!refRunning.current) break;
        setCurrentStep(i);
        await new Promise(r => setTimeout(r, 400));
    }
    setRunning(false);
    refRunning.current = false;
  };

  const pause = () => {
    setPaused(true);
    refPaused.current = true;
  };

  const next = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (history.length === 0) {
      const n = clampSize(Number(sizeInput) || 4);
      const steps = generateSteps(n);
      setHistory(steps);
      setCurrentStep(0);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const state = currentStep >= 0 ? history[currentStep] : {
    board: createBoard(size),
    checking: null,
    conflict: null,
    backtracking: false,
    msg: 'Idle. Press Solve or Next to start.'
  };

  const cellTextClass = size <= 4 ? 'text-2xl' : size <= 6 ? 'text-xl' : 'text-lg';
  const crownSize = size <= 4 ? 24 : size <= 6 ? 20 : 18;

  return (
    <div className="rounded-[30px] p-6 lg:p-10" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="mb-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>N-Queens — Interactive Backtracking Engine</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Visualizing Search-Space Pruning</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-1.5" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">N Value</span>
            <input
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value.replace(/[^\d]/g, '').slice(0, 1))}
              className="w-8 bg-transparent text-center text-sm font-black text-white outline-none"
              disabled={running}
            />
          </div>
          <div className="flex items-center gap-1 mx-2">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={() => reset()} className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-[13px] font-bold text-white/80" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={solve} className="flex items-center gap-1.5 rounded-xl px-5 py-2 text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> {paused ? 'Resume' : 'Solve'}</button>
          )}
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="flex justify-center items-center">
          <div className="grid w-full gap-2 transition-all p-4 rounded-3xl bg-black/40 border border-white/5 shadow-2xl" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, maxWidth: '420px' }}>
            {Array.from({ length: size }, (_, r) =>
              Array.from({ length: size }, (_, c) => {
                const isLight = (r + c) % 2 === 0;
                const hasQueen = state.board[r] === c;
                const isChecking = state.checking?.row === r && state.checking?.col === c;
                const isConflict = state.conflict?.row === r && state.conflict?.col === c;

                return (
                  <motion.div
                    key={`${r}-${c}`}
                    className={`flex aspect-square items-center justify-center rounded-xl font-black ${cellTextClass} relative overflow-hidden`}
                    style={{
                      background: hasQueen ? '#ff9820' : isConflict ? 'rgba(239,68,68,0.3)' : isChecking ? 'rgba(143,211,255,0.15)' : isLight ? 'rgba(255,255,255,0.06)' : 'rgba(255,179,67,0.03)',
                      border: `1px solid ${hasQueen ? '#ffbf5f' : isConflict ? '#ef4444' : isChecking ? '#8fd3ff' : 'rgba(255,255,255,0.08)'}`,
                      color: hasQueen ? '#000' : 'rgba(255,255,255,0.1)',
                    }}
                    animate={hasQueen ? { scale: [1, 1.1, 1] } : isConflict ? { rotate: [0, -3, 3, 0] } : {}}
                  >
                    {hasQueen ? <Crown size={crownSize} /> : isConflict ? '✕' : ''}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="rounded-[28px] border p-8" style={{ borderColor: 'rgba(255,255,255,0.08)', background: state.backtracking ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.02)' }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">Solver Activity</div>
            <div className="mt-4 text-[16px] font-bold text-[#ffb343] leading-relaxed min-h-[64px]">{state.msg}</div>
          </div>
          
          <div className="rounded-[28px] border p-8" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">Current Constraint Cache</div>
            <div className="mt-5 space-y-3">
              {state.board.map((col: number, row: number) => (
                <div key={row} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/40 tracking-wider">ROW {row + 1}</span>
                  <div className="h-px flex-1 mx-4 bg-white/5"></div>
                  <span className={`text-sm font-black ${col >= 0 ? 'text-[#ffb343]' : 'text-white/10'}`}>
                    {col >= 0 ? `COL ${col + 1}` : 'WAITING'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MST Prim's Animation ── */
type MSTNode = { id: number; x: number; y: number; label: string };
type MSTEdge = { from: number; to: number; weight: number; id: number };

const MST_NODES: MSTNode[] = [
  { id: 0, x: 100, y: 150, label: 'S' },
  { id: 1, x: 250, y: 60, label: 'A' },
  { id: 2, x: 250, y: 240, label: 'B' },
  { id: 3, x: 500, y: 60, label: 'C' },
  { id: 4, x: 500, y: 240, label: 'D' },
  { id: 5, x: 650, y: 150, label: 'E' },
];

const MST_EDGES: MSTEdge[] = [
  { id: 0, from: 0, to: 1, weight: 4 },
  { id: 1, from: 0, to: 2, weight: 2 },
  { id: 2, from: 1, to: 2, weight: 5 },
  { id: 3, from: 1, to: 3, weight: 10 },
  { id: 4, from: 2, to: 3, weight: 3 },
  { id: 5, from: 2, to: 4, weight: 8 },
  { id: 6, from: 3, to: 4, weight: 7 },
  { id: 7, from: 3, to: 5, weight: 11 },
  { id: 8, from: 4, to: 5, weight: 6 },
];

function PrimAnimation() {
  const [edges, setEdges] = useState(MST_EDGES);
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const generateSteps = () => {
    const steps: any[] = [];
    const vis: number[] = [0];
    const mist: number[] = [];
    
    steps.push({
      visited: [...vis],
      mstEdges: [...mist],
      candidateEdges: [],
      currentNode: 0,
      currentEdge: null,
      msg: 'Starting at Seed Node S.'
    });

    while (vis.length < MST_NODES.length) {
      const candidates = edges.filter(e => 
        (vis.includes(e.from) && !vis.includes(e.to)) || 
        (vis.includes(e.to) && !vis.includes(e.from))
      );
      
      if (candidates.length === 0) break;

      steps.push({
        visited: [...vis],
        mstEdges: [...mist],
        candidateEdges: candidates.map(e => e.id),
        currentNode: null,
        currentEdge: null,
        msg: 'Checking cheapest frontier edges...'
      });

      const best = [...candidates].sort((a, b) => a.weight - b.weight)[0];
      
      steps.push({
        visited: [...vis],
        mstEdges: [...mist],
        candidateEdges: candidates.map(e => e.id),
        currentNode: null,
        currentEdge: best.id,
        msg: `Cheapest edge found: ${MST_NODES[best.from].label}-${MST_NODES[best.to].label} (Weight ${best.weight}).`
      });

      mist.push(best.id);
      const nextNode = vis.includes(best.from) ? best.to : best.from;
      vis.push(nextNode);

      steps.push({
        visited: [...vis],
        mstEdges: [...mist],
        candidateEdges: [],
        currentNode: nextNode,
        currentEdge: null,
        msg: `Added Node ${MST_NODES[nextNode].label} to the Minimum Spanning Tree.`
      });
    }

    steps.push({
      visited: [...vis],
      mstEdges: [...mist],
      candidateEdges: [],
      currentNode: null,
      currentEdge: null,
      msg: 'Prim\'s Complete! The Minimum Spanning Tree is now fully connected.'
    });

    return steps;
  };

  const play = async () => {
    if (running && paused) {
      setPaused(false);
      refPaused.current = false;
      return;
    }
    const steps = generateSteps();
    setHistory(steps);
    setRunning(true);
    refRunning.current = true;
    setPaused(false);
    refPaused.current = false;

    for (let i = 0; i < steps.length; i++) {
      if (!refRunning.current) break;
      while (refPaused.current && refRunning.current) {
        await new Promise(r => setTimeout(r, 100));
      }
      if (!refRunning.current) break;
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 800));
    }
    setRunning(false);
    refRunning.current = false;
  };

  const pause = () => {
    setPaused(true);
    refPaused.current = true;
  };

  const reset = () => {
    setRunning(false);
    refRunning.current = false;
    setPaused(false);
    refPaused.current = false;
    setCurrentStep(-1);
    setHistory([]);
  };

  const next = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (history.length === 0) {
      const steps = generateSteps();
      setHistory(steps);
      setCurrentStep(0);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateWeight = (id: number, val: string) => {
    const weight = parseInt(val) || 0;
    setEdges(prev => prev.map(e => e.id === id ? { ...e, weight } : e));
    reset();
  };

  const state = currentStep >= 0 ? history[currentStep] : {
    visited: [],
    mstEdges: [],
    candidateEdges: [],
    currentNode: null,
    currentEdge: null,
    msg: 'Idle. Press Play or Next to step through.'
  };

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>Prim's Algorithm — Greedy MST Growth</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Frontier-Based Spanning Tree Debugger</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="relative">
          <svg viewBox="0 0 750 300" className="w-full" style={{ height: '320px' }}>
            {edges.map((e) => {
              const na = MST_NODES[e.from], nb = MST_NODES[e.to];
              const isMST = state.mstEdges.includes(e.id);
              const isCandidate = state.candidateEdges.includes(e.id);
              const isCurrent = state.currentEdge === e.id;
              
              return (
                <g key={e.id}>
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} 
                    stroke={isCurrent ? '#ff9820' : isMST ? '#06d6c7' : isCandidate ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'} 
                    strokeWidth={isMST || isCurrent ? 3.5 : isCandidate ? 2 : 1.5} 
                    strokeDasharray={isCandidate && !isMST && !isCurrent ? '5 3' : 'none'} />
                  <foreignObject x={(na.x + nb.x) / 2 - 20} y={(na.y + nb.y) / 2 - 15} width={40} height={30}>
                    <input 
                      type="text" 
                      value={e.weight} 
                      onChange={(ev) => updateWeight(e.id, ev.target.value)}
                      className="w-full bg-black/80 border border-white/10 rounded-md text-[10px] font-bold text-center text-white/70 focus:border-[#ffb343] focus:text-white outline-none transition-all"
                    />
                  </foreignObject>
                </g>
              );
            })}
            {MST_NODES.map((n) => {
              const isVisited = state.visited.includes(n.id);
              const isCurrent = state.currentNode === n.id;
              const fill = isCurrent ? 'rgba(255,152,32,0.24)' : isVisited ? 'rgba(6,214,199,0.2)' : 'rgba(255,255,255,0.02)';
              const stroke = isCurrent ? '#ff9820' : isVisited ? '#06d6c7' : 'rgba(255,255,255,0.15)';
              const textColor = isCurrent ? '#ff9820' : isVisited ? '#06d6c7' : 'rgba(255,255,255,0.45)';
              return (
                <g key={n.id}>
                  <motion.circle cx={n.x} cy={n.y} r={22} fill={fill} stroke={stroke} strokeWidth={isVisited || isCurrent ? 3 : 1.5} animate={isCurrent ? { scale: [1, 1.15, 1], boxShadow: ['0 0 0px #ff9820', '0 0 20px #ff9820', '0 0 0px #ff9820'] } : {}} />
                  <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="14" fontWeight="black" fill={textColor}>{n.label}</text>
                </g>
              );
            })}
          </svg>
          <div className="absolute top-0 right-0 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Click weights to edit
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border bg-white/5 p-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Solver Analytics</div>
            <div className="text-[20px] font-black text-[#ffb343] leading-tight min-h-[70px] drop-shadow-sm">{state.msg}</div>
          </div>
          <div className="rounded-2xl border bg-white/5 p-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-3">Legend</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ background: '#06d6c7' }} /><span className="text-xs font-bold text-white/60">Included in MST</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full border border-white/30 border-dashed" /><span className="text-xs font-bold text-white/60">Candidate Edge</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ background: '#ff9820' }} /><span className="text-xs font-bold text-white/60">Active Element</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MST Kruskal's Animation ── */
function KruskalAnimation() {
  const [edges, setEdges] = useState(MST_EDGES);
  const [history, setHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const generateSteps = () => {
    const steps: any[] = [];
    const sortedEdges = [...edges].sort((a,b) => a.weight - b.weight);
    const parents = MST_NODES.map(n => n.id);
    const find = (i: number, p: number[]): number => {
      if (p[i] === i) return i;
      return find(p[i], p);
    };

    const mist: number[] = [];
    const rej: number[] = [];

    steps.push({
      mstEdges: [],
      checkedEdge: null,
      rejectedEdges: [],
      msg: 'Idle. Sorted edges by weight. Ready to begin.'
    });

    for (const edge of sortedEdges) {
      steps.push({
        mstEdges: [...mist],
        checkedEdge: edge.id,
        rejectedEdges: [...rej],
        msg: `Evaluating edge ${MST_NODES[edge.from].label}-${MST_NODES[edge.to].label} (Weight ${edge.weight}).`
      });

      const rootA = find(edge.from, parents);
      const rootB = find(edge.to, parents);

      if (rootA !== rootB) {
        parents[rootA] = rootB;
        mist.push(edge.id);
        steps.push({
          mstEdges: [...mist],
          checkedEdge: edge.id,
          rejectedEdges: [...rej],
          msg: `Accepted! No cycle formed. Added to Minimum Spanning Tree.`
        });
      } else {
        rej.push(edge.id);
        steps.push({
          mstEdges: [...mist],
          checkedEdge: edge.id,
          rejectedEdges: [...rej],
          msg: `REJECTED! Adding this edge would form a cycle.`
        });
      }
    }

    steps.push({
      mstEdges: [...mist],
      checkedEdge: null,
      rejectedEdges: [...rej],
      msg: 'Kruskal\'s Complete! Minimum Spanning Forest built from global greedy choices.'
    });

    return steps;
  };

  const play = async () => {
    if (running && paused) {
      setPaused(false);
      refPaused.current = false;
      return;
    }
    const steps = generateSteps();
    setHistory(steps);
    setRunning(true);
    refRunning.current = true;
    setPaused(false);
    refPaused.current = false;

    for (let i = 0; i < steps.length; i++) {
        if (!refRunning.current) break;
        while (refPaused.current && refRunning.current) {
          await new Promise(r => setTimeout(r, 100));
        }
        if (!refRunning.current) break;
        setCurrentStep(i);
        await new Promise(r => setTimeout(r, 1000));
    }
    setRunning(false);
    refRunning.current = false;
  };

  const pause = () => {
    setPaused(true);
    refPaused.current = true;
  };

  const reset = () => {
    setRunning(false);
    refRunning.current = false;
    setPaused(false);
    refPaused.current = false;
    setCurrentStep(-1);
    setHistory([]);
  };

  const next = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (history.length === 0) {
      const steps = generateSteps();
      setHistory(steps);
      setCurrentStep(0);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateWeight = (id: number, val: string) => {
    const weight = parseInt(val) || 0;
    setEdges(prev => prev.map(e => e.id === id ? { ...e, weight } : e));
    reset();
  };

  const state = currentStep >= 0 ? history[currentStep] : {
    mstEdges: [],
    checkedEdge: null,
    rejectedEdges: [],
    msg: 'Idle. Press Play or Next to start.'
  };

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, rgba(20,20,18,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>Kruskal's Algorithm — Deep Edge Analysis</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Global Greedy Choice Debugger</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={currentStep <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {currentStep + 1}</span>
            <button onClick={next} disabled={currentStep >= history.length - 1 && history.length > 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 transition-colors hover:bg-white/10 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><RotateCcw size={14} /> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
            <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)', boxShadow: '0 8px 16px rgba(255,152,32,0.25)' }}><Play size={14} /> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="relative">
          <svg viewBox="0 0 750 300" className="w-full" style={{ height: '320px' }}>
            {edges.map((e) => {
              const na = MST_NODES[e.from], nb = MST_NODES[e.to];
              const isMST = state.mstEdges.includes(e.id);
              const isRejected = state.rejectedEdges.includes(e.id);
              const isChecking = state.checkedEdge === e.id;
              
              return (
                <g key={e.id}>
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} 
                    stroke={isChecking ? '#ffb343' : isMST ? '#06d6c7' : isRejected ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.08)'} 
                    strokeWidth={isMST || isChecking ? 3.5 : 1.5} 
                    strokeDasharray={isRejected ? '4 4' : 'none'} />
                  <foreignObject x={(na.x + nb.x) / 2 - 20} y={(na.y + nb.y) / 2 - 15} width={40} height={30}>
                    <input 
                      type="text" 
                      value={e.weight} 
                      onChange={(ev) => updateWeight(e.id, ev.target.value)}
                      className="w-full bg-black/80 border border-white/10 rounded-md text-[10px] font-bold text-center text-white/70 focus:border-[#ffb343] focus:text-white outline-none transition-all"
                    />
                  </foreignObject>
                  {isRejected && <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 - 20} textAnchor="middle" fontSize="14" fill="#ef4444">✕</text>}
                </g>
              );
            })}
            {MST_NODES.map((n) => {
              const inMST = state.mstEdges.some((eid: number) => edges.find((ed: MSTEdge)=>ed.id===eid)?.from === n.id || edges.find((ed: MSTEdge)=>ed.id===eid)?.to === n.id);
              const fill = inMST ? 'rgba(6,214,199,0.12)' : 'rgba(255,255,255,0.03)';
              const stroke = inMST ? '#06d6c7' : 'rgba(255,255,255,0.15)';
              const textColor = inMST ? '#06d6c7' : 'rgba(255,255,255,0.35)';
              return (
                <g key={n.id}>
                  <motion.circle cx={n.x} cy={n.y} r={24} fill={fill} stroke={stroke} strokeWidth={inMST ? 3.5 : 2} />
                  <text x={n.x} y={n.y + 7} textAnchor="middle" fontSize="17" fontWeight="900" fill={textColor} fontFamily="var(--font-display)">{n.label}</text>
                </g>
              );
            })}
          </svg>
          <div className="absolute top-0 right-0 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Sorted processing queue
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border bg-white/5 p-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Greedy Execution Log</div>
            <div className="text-[20px] font-black text-[#ffb343] leading-tight min-h-[70px] drop-shadow-sm">{state.msg}</div>
          </div>
          <div className="rounded-2xl border bg-white/5 p-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-3">Legend</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ background: '#06d6c7' }} /><span className="text-xs font-bold text-white/60">Final MST Edge</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full border border-red-500/40 border-dashed" /><span className="text-xs font-bold text-white/60">Cycle (Rejected)</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ background: '#ffb343' }} /><span className="text-xs font-bold text-white/60">Being Checked</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 0/1 Knapsack DP Table ── */
function Knapsack01Animation() {
  const ITEMS=[{name:'Gem',w:1,v:6},{name:'Gold',w:2,v:10},{name:'Ruby',w:3,v:12},{name:'Crown',w:5,v:15}];
  const W=6,n=ITEMS.length;
  const dp:number[][]=Array.from({length:n+1},()=>Array(W+1).fill(0));
  const chosen:boolean[][]=Array.from({length:n+1},()=>Array(W+1).fill(false));
  for(let i=1;i<=n;i++)for(let w=0;w<=W;w++){if(ITEMS[i-1].w<=w){const wi=ITEMS[i-1].v+dp[i-1][w-ITEMS[i-1].w];if(wi>dp[i-1][w]){dp[i][w]=wi;chosen[i][w]=true;}else dp[i][w]=dp[i-1][w];}else dp[i][w]=dp[i-1][w];}
  const total=(n+1)*(W+1);

  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const play = async () => {
    if (running && paused) { setPaused(false); refPaused.current = false; return; }
    setRunning(true); refRunning.current = true; setPaused(false); refPaused.current = false;
    let start = step < 0 || step >= total - 1 ? 0 : step + 1;
    for (let s = start; s < total; s++) {
      if (!refRunning.current) break;
      while (refPaused.current && refRunning.current) await new Promise(r => setTimeout(r, 100));
      if (!refRunning.current) break;
      setStep(s);
      await new Promise(r => setTimeout(r, 200));
    }
    setRunning(false); refRunning.current = false;
  };
  const pause = () => { setPaused(true); refPaused.current = true; };
  const reset = () => { setRunning(false); refRunning.current = false; setPaused(false); refPaused.current = false; setStep(-1); };
  const prev = () => { if (step > 0) setStep(step - 1); };
  const next = () => { if (step < total - 1) setStep(step + 1); else if (step === -1) setStep(0); };
  useEffect(() => () => { refRunning.current = false; }, []);

  const sel:number[]=[];if(step>=total-1){let i=n,w=W;while(i>0&&w>0){if(chosen[i][w]){sel.push(i-1);w-=ITEMS[i-1].w;}i--;}}

  const curI = step >= 0 ? Math.floor(step / (W + 1)) : -1;
  const curW = step >= 0 ? step % (W + 1) : -1;
  let dep1 = -1, dep2 = -1;
  if (curI > 0 && curW >= 0) {
    dep1 = (curI - 1) * (W + 1) + curW;
    if (ITEMS[curI - 1].w <= curW) dep2 = (curI - 1) * (W + 1) + (curW - ITEMS[curI - 1].w);
  }

  const isDone = step >= total - 1;

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{background:'linear-gradient(180deg,rgba(20,20,18,0.96),rgba(10,10,9,0.98))',border:'1px solid rgba(255,255,255,0.06)',boxShadow:'0 30px 60px rgba(0,0,0,0.5)'}}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{borderColor:'rgba(255,255,255,0.07)'}}>
        <div>
          <span className="text-base font-bold text-white tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>0/1 Knapsack — DP Builder</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mt-1 text-white/40">Capacity W=6 · 4 Items</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={step <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {Math.max(0, step + 1)}</span>
            <button onClick={next} disabled={step >= total - 1} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 border hover:bg-white/10 transition-colors" style={{borderColor:'rgba(255,255,255,0.1)'}}><RotateCcw size={14}/> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
             <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{background:'linear-gradient(180deg,#ffbf5f,#ff9820)',boxShadow:'0 8px 16px rgba(255,152,32,0.25)'}}><Play size={14}/> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-xs font-mono">
            <thead>
              <tr>
                <th className="p-3 text-white/30 text-sm">w →</th>
                {Array.from({length:W+1},(_,w)=>(<th key={w} className="p-3 text-[#ffb343] border-b text-sm font-black" style={{borderColor:'rgba(255,255,255,0.05)'}}>{w}</th>))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length:n+1},(_,i)=>(
                <tr key={i}>
                  <td className="p-4 text-white/50 font-black border-r text-right pr-6 text-sm whitespace-nowrap" style={{borderColor:'rgba(255,255,255,0.05)'}}>{i===0?'∅':ITEMS[i-1].name}</td>
                  {Array.from({length:W+1},(_,w)=>{
                    const idx=i*(W+1)+w; const rev=idx<=step; const isCur=idx===step;
                    const isSel=isDone&&i>0&&chosen[i][w];
                    const isDep = rev && !isCur && (idx === dep1 || idx === dep2);
                    return(
                      <td key={w} className="p-1.5">
                        <motion.div className="w-14 h-12 rounded-xl flex items-center justify-center font-black text-[16px] mx-auto border transition-all" 
                          style={{
                            background:isCur?'rgba(255,179,67,0.3)':isSel?'rgba(6,214,199,0.25)':isDep?'rgba(255,179,67,0.12)':rev?'rgba(255,255,255,0.04)':'transparent',
                            borderColor:isCur?'#ffb343':isSel?'#06d6c7':isDep?'rgba(255,179,67,0.5)':rev?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.02)',
                            color:isCur?'#ffb343':isSel?'#06d6c7':isDep?'#ffd27f':rev?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.05)'
                          }}
                          animate={isCur?{scale:1.2, zIndex:10, boxShadow:'0 0 20px rgba(255,179,67,0.3)'}:{scale:1, zIndex:1}}
                        >
                          {rev?dp[i][w]:''}
                        </motion.div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[13px] font-bold text-white/40 justify-center">
            <span className="flex items-center gap-2"><div className="w-4 h-4 rounded shadow-lg" style={{background:'rgba(255,179,67,0.5)'}}/> Active Cell</span>
            <span className="flex items-center gap-2"><div className="w-4 h-4 rounded border-2 border-dashed border-[#ffb343]/50" style={{background:'rgba(255,179,67,0.15)'}}/> Dependencies</span>
            <span className="flex items-center gap-2"><div className="w-4 h-4 rounded border-2 border-[#06d6c7]" style={{background:'rgba(6,214,199,0.3)'}}/> Selected Items</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 mb-2 text-center">
             {ITEMS.map((it,i)=>(
               <div key={i} className="rounded-2xl border-2 p-4 transition-all" style={{borderColor:sel.includes(i)?'#06d6c7':curI===i+1?'#ffb343':'rgba(255,255,255,0.08)',background:sel.includes(i)?'rgba(6,214,199,0.1)':curI===i+1?'rgba(255,179,67,0.1)':'rgba(255,255,255,0.02)', transform: curI===i+1?'scale(1.05)':''}}>
                 <div className="text-[12px] uppercase tracking-[0.2em] font-black mb-1" style={{color: sel.includes(i)?'#06d6c7':curI===i+1?'#ffb343':'rgba(255,255,255,0.3)'}}>{it.name}</div>
                 <div className="font-black text-lg text-white">w={it.w} | v={it.v}</div>
               </div>
             ))}
          </div>

          <div className="rounded-2xl border bg-white/5 p-6 mt-auto shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
             <div className="text-[12px] font-black text-[#ffb343] uppercase tracking-[0.2em] mb-4">Algorithm Insight</div>
             <div className="text-[16px] font-bold text-white/90 leading-relaxed min-h-[90px]">
               {isDone ? 
                  `Optimal total value = ${dp[n][W]} with items: ${sel.map(i=>ITEMS[i].name).join(', ')}`
                : step < 0 ? 
                  'Press Play or Next to step through the DP initialization and building process.'
                : curI === 0 ? 
                  `Base case: dp[0][${curW}] = 0 (No items considered yet)`
                : curW === 0 ? 
                  `Base case: dp[${curI}][0] = 0 (Capacity is zero)`
                : (
                   <>
                     Evaluating <span className="text-[#ffb343] font-black">{ITEMS[curI-1].name}</span>.<br/>
                     {ITEMS[curI-1].w <= curW ? (
                        <>Take: {ITEMS[curI-1].v} + prev[{curW-ITEMS[curI-1].w}]: <span className="text-[#06d6c7] font-black">{ITEMS[curI-1].v + dp[curI-1][curW-ITEMS[curI-1].w]}</span><br/>Skip: prev[{curW}]: <span className="text-white/60 font-black">{dp[curI-1][curW]}</span></>
                     ) : (
                        <>Item too heavy ({ITEMS[curI-1].w}kg). Copying previous value: <span className="text-white font-black">{dp[curI-1][curW]}</span></>
                     )}
                   </>
                )
               }
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Fractional Knapsack Greedy Fill ── */
function FractionalKnapsackAnimation() {
  const ITEMS=[{name:'Oil',w:10,v:60,ratio:6.0,color:'#ffb343'},{name:'Steel',w:20,v:100,ratio:5.0,color:'#8fd3ff'},{name:'Rice',w:30,v:120,ratio:4.0,color:'#06d6c7'},{name:'Wood',w:15,v:45,ratio:3.0,color:'#c084fc'}];
  const CAP=50;
  type FKStep={msg:string;filled:number;taken:{name:string;frac:number;w:number;v:number;color:string}[];active:string};
  
  const steps:FKStep[]=(()=>{
    const sorted=[...ITEMS].sort((a,b)=>b.ratio-a.ratio);
    const res:FKStep[]=[];
    let rem=CAP;
    const taken:{name:string;frac:number;w:number;v:number;color:string}[]=[];
    res.push({msg:`Sorted items by value-to-weight ratio (v/w descending).`,filled:0,taken:[],active:''});
    for(const it of sorted){
      if(rem<=0)break;
      if(it.w<=rem){
        taken.push({name:it.name,frac:1,w:it.w,v:it.v,color:it.color});
        rem-=it.w;
        res.push({msg:`Take ALL of ${it.name} (+${it.v} val). ${rem}kg remaining.`,filled:(CAP-rem)/CAP*100,taken:[...taken],active:it.name});
      }else{
        const f=rem/it.w;
        taken.push({name:it.name,frac:f,w:rem,v:f*it.v,color:it.color});
        res.push({msg:`Knapsack fills! Take ${Math.round(f*100)}% of ${it.name} (+${Math.round(f*it.v*10)/10} val).`,filled:100,taken:[...taken],active:it.name});
        rem=0;
      }
    }
    res.push({msg:`Complete! Knapsack optimally packed using Greedy approach.`,filled:100,taken:[...taken],active:''});
    return res;
  })();

  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const play = async () => {
    if (running && paused) { setPaused(false); refPaused.current = false; return; }
    setRunning(true); refRunning.current = true; setPaused(false); refPaused.current = false;
    let start = step === steps.length - 1 ? 0 : step;
    for (let s = start; s < steps.length; s++) {
      if (!refRunning.current) break;
      while (refPaused.current && refRunning.current) await new Promise(r => setTimeout(r, 100));
      if (!refRunning.current) break;
      setStep(s);
      await new Promise(r => setTimeout(r, 1800));
    }
    setRunning(false); refRunning.current = false;
  };

  const pause = () => { setPaused(true); refPaused.current = true; };
  const reset = () => { setRunning(false); refRunning.current = false; setPaused(false); refPaused.current = false; setStep(0); };
  const prev = () => { if (step > 0) setStep(step - 1); };
  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  useEffect(() => () => { refRunning.current = false; }, []);
  
  const cur=steps[step];

  return (
    <div className="rounded-[30px] p-6 lg:p-8" style={{background:'linear-gradient(180deg,rgba(20,20,18,0.96),rgba(10,10,9,0.98))',border:'1px solid rgba(255,255,255,0.06)',boxShadow:'0 30px 60px rgba(0,0,0,0.5)'}}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8 border-b pb-6" style={{borderColor:'rgba(255,255,255,0.07)'}}>
        <div>
          <span className="text-base font-bold text-white tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>Fractional Knapsack — Greedy Debugger</span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mt-1 text-white/40">Capacity = 50 kg</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={step <= 0} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronLeft size={18} /></button>
            <span className="text-[11px] font-bold text-white/40 w-12 text-center uppercase tracking-tighter">Step {step + 1}</span>
            <button onClick={next} disabled={step >= steps.length - 1} className="p-2 text-white/60 hover:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 border hover:bg-white/10 transition-colors" style={{borderColor:'rgba(255,255,255,0.1)'}}><RotateCcw size={14}/> Reset</button>
          {running && !paused ? (
            <button onClick={pause} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-white transition-transform hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}><PauseCircle size={14} /> Pause</button>
          ) : (
             <button onClick={play} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black transition-transform hover:scale-105" style={{background:'linear-gradient(180deg,#ffbf5f,#ff9820)',boxShadow:'0 8px 16px rgba(255,152,32,0.25)'}}><Play size={14}/> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10 mb-8">
        <div>
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Market Inventory</div>
          <div className="grid grid-cols-2 gap-4">
             {ITEMS.map(it=>{
                const isA=cur.active===it.name;
                const tk=cur.taken.find(t=>t.name===it.name);
                return(
                  <div key={it.name} className="relative rounded-3xl border-2 p-5 text-center overflow-hidden transition-all shadow-xl" style={{borderColor:isA?it.color:tk?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.08)',background:isA?`${it.color}15`:tk?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.02)',transform:isA?'scale(1.05) translateY(-4px)':'scale(1)'}}>
                    {tk && tk.frac === 1 && <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center backdrop-blur-md"><span className="text-2xl font-black uppercase tracking-tighter" style={{color:it.color}}>OUT OF STOCK</span></div>}
                    <div className="text-lg font-black uppercase tracking-tight mb-1" style={{color:it.color}}>{it.name}</div>
                    <div className="text-sm font-bold text-white/60 mb-2">{it.w}kg · Value ${it.v}</div>
                    <div className="inline-block px-3 py-1 rounded-full text-[12px] font-black" style={{background:isA?`${it.color}30`:'rgba(255,255,255,0.1)',color:isA?it.color:'rgba(255,255,255,0.8)'}}>{it.ratio.toFixed(1)} v/w</div>
                    {tk && tk.frac > 0 && tk.frac < 1 && <div className="text-[12px] mt-2 font-black" style={{color:it.color}}>PARCELLY TAKEN ({Math.round(tk.frac*100)}%)</div>}
                  </div>
                );
             })}
          </div>
        </div>

        <div className="flex flex-col">
           <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex justify-between items-end">
              <span>Knapsack Capacity Utilization</span>
              <span className="text-white text-xl font-black tracking-tighter">{Math.round(cur.filled/100 * CAP)} <span className="text-white/40 text-sm italic">/ {CAP} kg</span></span>
           </div>
           
           <div className="w-full h-32 rounded-3xl flex items-center overflow-hidden border-2 p-2 mb-8 bg-black/60 shadow-inner" style={{borderColor:'rgba(255,255,255,0.1)'}}>
             <AnimatePresence>
                {cur.taken.length === 0 && <span className="text-sm text-white/20 font-black w-full text-center uppercase tracking-[0.3em]">Vault Empty</span>}
                {cur.taken.map((t, idx) => (
                  <motion.div
                    key={t.name + idx}
                    initial={{ width: 0, opacity: 0, scaleX: 0 }}
                    animate={{ width: `${(t.w / CAP) * 100}%`, opacity: 1, scaleX: 1 }}
                    className="h-full rounded-2xl flex flex-col items-center justify-center ml-1 border-2 relative overflow-hidden group shrink-0 origin-left"
                    style={{ background: `${t.color}25`, borderColor: `${t.color}80` }}
                  >
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 40px)'}} />
                    <span className="text-sm font-black relative z-10 drop-shadow-md" style={{color: t.color}}>{t.name}</span>
                    <span className="text-[11px] font-black text-white relative z-10">{t.w}kg</span>
                  </motion.div>
                ))}
             </AnimatePresence>
           </div>
           
           <div className="mt-auto">
             <div className="text-[12px] font-black text-[#ffb343] uppercase tracking-[0.2em] mb-4">Greedy Step Analysis</div>
             <div className="flex flex-col justify-center text-[18px] font-bold text-white leading-tight p-6 mb-6 rounded-3xl border-2 shadow-2xl min-h-[100px]" style={{background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.08)'}}>
                <span className="drop-shadow-sm">{cur.msg}</span>
             </div>
             <div className="flex gap-4 p-5 rounded-2xl border-2 border-white/10 bg-gradient-to-r from-white/5 to-transparent justify-between items-center shadow-xl">
                <div>
                   <div className="text-[11px] font-black text-white/40 uppercase tracking-widest">Calculated Profit</div>
                   <div className="text-white/60 text-xs font-bold font-mono">Total sum of fractional values</div>
                </div>
                <div className="text-[#06d6c7] text-4xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(6,214,199,0.3)]">${Math.round(cur.taken.reduce((s,t)=>s+t.v, 0)*10)/10}</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ── LCS DP Grid ── */
function LCSAnimation() {
  const X=['A','G','G','T','A','B'], Y=['G','X','T','X','A','Y','B'];
  const m=X.length, n=Y.length;
  const dp:number[][]=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){if(X[i-1]===Y[j-1])dp[i][j]=dp[i-1][j-1]+1;else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);}
  // backtrack LCS string
  const lcsStr=(()=>{let s='',i=m,j=n;while(i>0&&j>0){if(X[i-1]===Y[j-1]){s=X[i-1]+s;i--;j--;}else if(dp[i-1][j]>dp[i][j-1])i--;else j--;}return s;})();
  // backtrack path cells
  const lcsCells=new Set<string>();
  let ci_x=m,ci_y=n;
  while(ci_x>0&&ci_y>0){if(X[ci_x-1]===Y[ci_y-1]){lcsCells.add(`${ci_x},${ci_y}`);ci_x--;ci_y--;}else if(dp[ci_x-1][ci_y]>dp[ci_x][ci_y-1])ci_x--;else ci_y--;}
  const total=(m+1)*(n+1);
  const [step,setStep]=useState(-1);const [run,setRun]=useState(false);const ref=useRef(false);
  const play=async()=>{ref.current=true;setRun(true);for(let s=0;s<total;s++){if(!ref.current)break;setStep(s);await new Promise(r=>setTimeout(r,80));}setRun(false);};
  const reset=()=>{ref.current=false;setRun(false);setStep(-1);};
  useEffect(()=>()=>{ref.current=false;},[]);
  const ci=(i:number,j:number)=>i*(n+1)+j;
  const done=step>=total-1;
  return(
    <div className="rounded-[30px] p-6 lg:p-8" style={{background:'linear-gradient(180deg,rgba(20,20,18,0.96),rgba(10,10,9,0.98))',border:'1px solid rgba(255,255,255,0.06)'}}>
      <div className="flex items-center justify-between mb-6 border-b pb-5" style={{borderColor:'rgba(255,255,255,0.07)'}}>
        <div><span className="text-base font-bold text-white">LCS — DP Table + String Reconstructor</span><p className="text-[11px] font-semibold uppercase tracking-[0.2em] mt-1 text-white/40">X=AGGTAB · Y=GXTXAYB</p></div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 border hover:bg-white/10" style={{borderColor:'rgba(255,255,255,0.1)'}}><RotateCcw size={14}/> Reset</button>
          <button onClick={play} disabled={run} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black disabled:opacity-50" style={{background:'linear-gradient(180deg,#ffbf5f,#ff9820)'}}><Play size={14}/> Play</button>
        </div>
      </div>
      <div className="overflow-x-auto mb-10">
        <table className="border-collapse text-center text-xs font-mono mx-auto">
          <thead><tr><th className="w-12 h-12 text-white/30 text-sm font-black">i\j</th><th className="w-12 h-12 text-white/30 text-sm font-black">∅</th>{Y.map((c,j)=><th key={j} className="w-12 h-12 font-black text-xl" style={{color:'#8fd3ff'}}>{c}</th>)}</tr></thead>
          <tbody>{Array.from({length:m+1},(_,i)=>(<tr key={i}><td className="w-12 h-12 font-black text-xl" style={{color:'#ffb343'}}>{i===0?'∅':X[i-1]}</td>{Array.from({length:n+1},(_,j)=>{const idx=ci(i,j);const rev=idx<=step;const isCur=idx===step;const isLCS=done&&lcsCells.has(`${i},${j}`);const match=i>0&&j>0&&X[i-1]===Y[j-1]&&dp[i][j]>0&&rev;return(<td key={j} className="p-1"><motion.div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-[18px] border transition-all" style={{background:isLCS?'rgba(250,200,50,0.4)':isCur?'rgba(255,179,67,0.3)':match?'rgba(6,214,199,0.25)':rev?'rgba(255,255,255,0.06)':'transparent',borderColor:isLCS?'#facc15':isCur?'#ffb343':match?'#06d6c7':'rgba(255,255,255,0.07)',color:isLCS?'#facc15':isCur?'#ffb343':match?'#06d6c7':rev?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.1)',transform:isCur?'scale(1.2)':'scale(1)',boxShadow:isCur?'0 0 20px rgba(255,179,67,0.2)':''}} animate={isCur?{zIndex:10}:{zIndex:1}}>{rev?dp[i][j]:''}</motion.div></td>);})}</tr>))}</tbody>
        </table>
      </div>
      {done&&(
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="rounded-3xl border-2 p-8 mb-8 shadow-2xl" style={{background:'linear-gradient(135deg,rgba(250,204,21,0.1),rgba(6,214,199,0.1))',borderColor:'rgba(250,204,21,0.3)'}}>
          <div className="text-[14px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 text-center">String Reconstructor Analysis</div>
          <div className="flex flex-wrap gap-3 mb-6 justify-center">{lcsStr.split('').map((c,i)=>(<motion.div key={i} initial={{scale:0,y:20}} animate={{scale:1,y:0}} transition={{delay:i*0.1}} className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-2 shadow-lg" style={{background:'rgba(250,204,21,0.2)',borderColor:'rgba(250,204,21,0.5)',color:'#facc15'}}>{c}</motion.div>))}</div>
          <div className="text-2xl font-black text-center" style={{color:'#06d6c7'}}>LCS Result: "{lcsStr}" — Length {dp[m][n]}</div>
          <div className="text-[12px] font-bold text-white/30 mt-4 text-center tracking-widest uppercase">★ Backtracking through high-value cells completed</div>
        </motion.div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-10 text-[13px] font-black uppercase tracking-widest text-white/40">
        <span className="flex items-center gap-3"><span className="w-4 h-4 rounded shadow-lg" style={{background:'#06d6c7'}}/> Character Match</span>
        <span className="flex items-center gap-3"><span className="w-4 h-4 rounded shadow-lg" style={{background:'#facc15'}}/> Optimal Path</span>
        <span className="flex items-center gap-3"><span className="w-4 h-4 rounded shadow-lg" style={{background:'#ffb343'}}/> Active Iteration</span>
      </div>
    </div>
  );
}

/* ── OBST Interactive ── */
function OBSTAnimation() {
  const keys=['k1','k2','k3','k4'],n=4;
  const p=[0,0.15,0.10,0.05,0.10],q=[0.05,0.10,0.05,0.05,0.05];
  const e:number[][]=Array.from({length:n+2},()=>Array(n+2).fill(0));
  const w:number[][]=Array.from({length:n+2},()=>Array(n+2).fill(0));
  const root:number[][]=Array.from({length:n+2},()=>Array(n+2).fill(0));
  for(let i=1;i<=n+1;i++){e[i][i-1]=q[i-1];w[i][i-1]=q[i-1];}
  for(let l=1;l<=n;l++)for(let i=1;i<=n-l+1;i++){const j=i+l-1;e[i][j]=Infinity;w[i][j]=w[i][j-1]+p[j]+q[j];for(let r=i;r<=j;r++){const t=e[i][r-1]+e[r+1][j]+w[i][j];if(t<e[i][j]){e[i][j]=Math.round(t*100)/100;root[i][j]=r;}}}
  // build tree layout for final OBST
  type TNode={key:string;x:number;y:number;left?:TNode;right?:TNode};
  const buildTree=(i:number,j:number,x:number,y:number,spread:number):TNode|null=>{if(j<i)return null;const r=root[i][j];const node:TNode={key:`k${r}`,x,y};node.left=buildTree(i,r-1,x-spread,y+70,spread/2)??undefined;node.right=buildTree(r+1,j,x+spread,y+70,spread/2)??undefined;return node;};
  const tree=buildTree(1,4,300,50,100);
  const collectNodes=(t:TNode|null|undefined,acc:{node:TNode;parent:TNode|null}[],parent:TNode|null)=>{if(!t)return;acc.push({node:t,parent});collectNodes(t.left,acc,t);collectNodes(t.right,acc,t);};
  const treeNodes:{node:TNode;parent:TNode|null}[]=[];if(tree)collectNodes(tree,treeNodes,null);
  const steps=[
    {ij:'1,1',showTree:false,msg:'k1 alone (length 1 subproblem). Cost = e[1][1] = '+e[1][1]+'. p[k1]=0.15, q[d0]=0.05'},
    {ij:'2,2',showTree:false,msg:'k2 alone. Cost = e[2][2] = '+e[2][2]+'. Frequently accessed keys have higher cost when deep.'},
    {ij:'3,3',showTree:false,msg:'k3 alone. Cost = e[3][3] = '+e[3][3]+'.'},
    {ij:'4,4',showTree:false,msg:'k4 alone. Cost = e[4][4] = '+e[4][4]+'.'},
    {ij:'1,2',showTree:false,msg:'k1–k2 subproblem: try k1 as root → cost '+Math.round((e[1][0]+e[2][2]+w[1][2])*100)/100+', try k2 → cost '+Math.round((e[1][1]+e[3][2]+w[1][2])*100)/100+'. Optimal root = k'+root[1][2]+' (cost '+e[1][2]+')'},
    {ij:'2,3',showTree:false,msg:'k2–k3 subproblem. Optimal root = k'+root[2][3]+' (cost '+e[2][3]+')'},
    {ij:'3,4',showTree:false,msg:'k3–k4 subproblem. Optimal root = k'+root[3][4]+' (cost '+e[3][4]+')'},
    {ij:'1,3',showTree:false,msg:'k1–k3: try all 3 as root, pick minimum. Optimal root = k'+root[1][3]+' (cost '+e[1][3]+')'},
    {ij:'2,4',showTree:false,msg:'k2–k4: Optimal root = k'+root[2][4]+' (cost '+e[2][4]+')'},
    {ij:'1,4',showTree:true,msg:'Full tree k1–k4 solved! Root = k'+root[1][4]+', total expected cost = '+e[1][4]+'. See the optimal BST on the right →'},
  ];
  const [step,setStep]=useState(-1);const [run,setRun]=useState(false);const ref=useRef(false);
  const play=async()=>{ref.current=true;setRun(true);for(let s=0;s<steps.length;s++){if(!ref.current)break;setStep(s);await new Promise(r=>setTimeout(r,1400));}setRun(false);};
  const reset=()=>{ref.current=false;setRun(false);setStep(-1);};
  useEffect(()=>()=>{ref.current=false;},[]);
  const revSet=new Set(steps.slice(0,step+1).map(s=>s.ij));
  const cur=step>=0?steps[step]:null;
  return(
    <div className="rounded-[30px] p-6 lg:p-8" style={{background:'linear-gradient(180deg,rgba(20,20,18,0.96),rgba(10,10,9,0.98))',border:'1px solid rgba(255,255,255,0.06)'}}>
      <div className="flex items-center justify-between mb-6 border-b pb-5" style={{borderColor:'rgba(255,255,255,0.07)'}}>
        <div><span className="text-base font-bold text-white">OBST — Interactive DP + Tree Visualizer</span><p className="text-[11px] font-semibold uppercase tracking-[0.2em] mt-1 text-white/40">4 Keys · Find BST minimizing expected search cost</p></div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 border hover:bg-white/10" style={{borderColor:'rgba(255,255,255,0.1)'}}><RotateCcw size={14}/> Reset</button>
          <button onClick={play} disabled={run} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black disabled:opacity-50" style={{background:'linear-gradient(180deg,#ffbf5f,#ff9820)'}}><Play size={14}/> Play</button>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">{keys.map((k,i)=>(<div key={k} className="rounded-2xl border-2 p-5 text-center transition-all bg-white/[0.02] shadow-xl" style={{borderColor:'rgba(255,255,255,0.08)'}}><div className="text-sm font-black text-[#ffb343] uppercase tracking-widest mb-1">{k}</div><div className="text-[12px] font-bold text-white/60">Search Prob p={p[i+1]}</div><div className="text-[12px] font-bold text-white/30 italic">Dummy Prob q={q[i]}</div></div>))}</div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="overflow-x-auto">
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">e[i][j] — Cost Accumulation Matrix</div>
          <table className="border-collapse text-center text-xs font-mono w-full">
            <thead><tr><th className="p-3 text-white/30 text-[10px] uppercase">i\j</th>{[0,1,2,3,4].map(j=><th key={j} className="p-3 w-20 text-[#ffb343] font-black text-sm">j={j}</th>)}</tr></thead>
            <tbody>{[1,2,3,4].map(i=>(<tr key={i}><td className="p-3 text-white/50 font-black border-r border-white/5 pr-4 text-sm">i={i}</td>{[0,1,2,3,4].map(j=>{const key=`${i},${j}`;const isRev=revSet.has(key);const isCur=cur?.ij===key;const valid=(j>=i-1)&&j<=n;if(!valid)return<td key={j}><div className="w-20 h-14 flex items-center justify-center text-white/5 text-[10px] uppercase tracking-tighter">void</div></td>;return(<td key={j} className="p-1.5"><motion.div className="w-20 h-14 rounded-2xl flex items-center justify-center font-black text-[15px] border-2 transition-all shadow-lg" style={{background:isCur?'rgba(255,179,67,0.3)':isRev?'rgba(6,214,199,0.15)':'rgba(255,255,255,0.03)',borderColor:isCur?'#ffb343':isRev?'rgba(6,214,199,0.5)':'rgba(255,255,255,0.07)',color:isCur?'#ffb343':isRev?'#06d6c7':'rgba(255,255,255,0.15)'}} animate={isCur?{scale:1.1, zIndex:10, boxShadow:'0 0 20px rgba(255,179,67,0.2)'}:{scale:1, zIndex:1}}>{isRev&&j>=i-1?e[i][j]:''}</motion.div></td>);})}</tr>))}</tbody>
          </table>
          {cur&&(<div className="mt-6 text-[14px] font-black text-[#ffb343] uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/10 text-center">Calculated Optimal Root = k{cur.ij!=='1,4'?'k'+root[parseInt(cur.ij)][parseInt(cur.ij.split(',')[1])]:'k'+root[1][4]}</div>)}
        </div>
        <div>
          <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 text-center">Optimal Tree Topology</div>
          <div className="bg-black/20 rounded-[40px] border border-white/5 p-8 flex items-center justify-center relative shadow-inner overflow-hidden" style={{height:'350px'}}>
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
             <svg viewBox="0 0 600 280" className="w-full relative z-10 overflow-visible">
               {cur?.showTree?(<>
                 {treeNodes.filter(({parent})=>parent).map(({node,parent},i)=>(<motion.line key={i} initial={{pathLength:0}} animate={{pathLength:1}} x1={parent!.x*2} y1={parent!.y+24} x2={node.x*2} y2={node.y-24} stroke="rgba(255,179,67,0.5)" strokeWidth={3} strokeDasharray="8 8"/>))}
                 {treeNodes.map(({node},i)=>(<g key={i}><motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:i*0.12, type:'spring'}} cx={node.x*2} cy={node.y} r={28} fill={node===treeNodes[0].node?'rgba(255,179,67,0.25)':'rgba(6,214,199,0.18)'} stroke={node===treeNodes[0].node?'#ffb343':'#06d6c7'} strokeWidth={3} shadow="0 0 20px rgba(0,0,0,0.5)"/><text x={node.x*2} y={node.y+10} textAnchor="middle" fontSize="18" fontWeight="900" fill={node===treeNodes[0].node?'#ffb343':'#06d6c7'} fontFamily="var(--font-display)">{node.key}</text></g>))}
               </>):(<text x={300} y={140} textAnchor="middle" fontSize="14" fontStyle="italic" fill="rgba(255,255,255,0.15)" weight="900" className="uppercase tracking-[0.3em]">Processing Subproblems...</text>)}
             </svg>
          </div>
          {cur?.showTree&&<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-xl font-black mt-6 text-center text-[#ffb343] drop-shadow-md">★ Minimum Search Cost = {e[1][4]}</motion.div>}
        </div>
      </div>
      <AnimatePresence mode="wait">{cur?(<motion.div key={step} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-10 rounded-[24px] border-2 p-8 shadow-2xl relative overflow-hidden" style={{background:cur.showTree?'rgba(6,214,199,0.08)':'rgba(255,179,67,0.08)',borderColor:cur.showTree?'rgba(6,214,199,0.4)':'rgba(255,179,67,0.4)',color:cur.showTree?'#06d6c7':'#ffb343'}}><div className="absolute top-0 left-0 w-2 h-full bg-current opacity-20"/><div className="text-[12px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Step {step+1} of {steps.length}</div><div className="text-xl font-black leading-tight tracking-tight">{cur.msg}</div></motion.div>):(<div className="mt-10 rounded-2xl border-2 border-white/5 p-8 text-center bg-white/[0.01] shadow-inner"><div className="text-lg font-black text-white/20 uppercase tracking-[0.5em]">System Ready • Idle</div></div>)}</AnimatePresence>
    </div>
  );
}

/* ── Hamiltonian Cycle ── */
function HamiltonianCycleAnimation() {
  const NODES=[{id:0,x:300,y:70,c:'#ffb343'},{id:1,x:530,y:200,c:'#8fd3ff'},{id:2,x:440,y:390,c:'#06d6c7'},{id:3,x:160,y:390,c:'#c084fc'},{id:4,x:70,y:200,c:'#ff7eb3'}];
  const ADJ=[[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,1],[1,0,1,0,1],[0,1,1,1,0]];
  const STEPS=[
    {path:[0],status:'exploring',msg:'Initialize: Starting at the anchor node (Node 0).'},
    {path:[0,1],status:'exploring',msg:'Forward: Node 1 is adjacent to 0 and unvisited. Appending to path.'},
    {path:[0,1,2],status:'exploring',msg:'Forward: Node 2 is adjacent to 1 and unvisited. Extending search.'},
    {path:[0,1,2,3],status:'exploring',msg:'Forward: Node 3 is adjacent to 2 and unvisited. Nearing completion...'},
    {path:[0,1,2,3,4],status:'checking',msg:'Evaluation: All nodes visited! checking if Node 4 links back to start (Node 0).'},
    {path:[0,1,2,3,4,0],status:'found',msg:'Success! Edge 4→0 exists. Hamiltonian Cycle established!'},
  ];

  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const refRunning = useRef(false);
  const refPaused = useRef(false);

  const total = STEPS.length;

  const play = async () => {
    if (running && paused) { setPaused(false); refPaused.current = false; return; }
    setRunning(true); refRunning.current = true; setPaused(false); refPaused.current = false;
    let start = step < 0 || step === total - 1 ? 0 : step + 1;
    for (let s = start; s < total; s++) {
      if (!refRunning.current) break;
      while (refPaused.current && refRunning.current) await new Promise(r => setTimeout(r, 100));
      if (!refRunning.current) break;
      setStep(s);
      await new Promise(r => setTimeout(r, 1500));
    }
    setRunning(false); refRunning.current = false;
  };

  const pause = () => { setPaused(true); refPaused.current = true; };
  const reset = () => { setRunning(false); refRunning.current = false; setPaused(false); refPaused.current = false; setStep(-1); };
  const prev = () => { if (step > 0) setStep(step - 1); };
  const next = () => { if (step < total - 1) setStep(step + 1); else if (step === -1) setStep(0); };
  useEffect(() => () => { refRunning.current = false; }, []);

  const cur=step>=0?STEPS[step]:null;
  const pSet=new Set(cur?.path??[]);
  const eSet=new Set<string>();
  if(cur)for(let i=0;i<cur.path.length-1;i++){const a=cur.path[i],b=cur.path[i+1];eSet.add(`${Math.min(a,b)}-${Math.max(a,b)}`);}

  return(
    <div className="rounded-[40px] p-8 lg:p-12 shadow-2xl relative overflow-hidden" style={{background:'linear-gradient(165deg,rgba(25,25,23,0.98),rgba(15,15,14,1))',border:'1px solid rgba(255,255,255,0.07)'}}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb343]/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 mb-10 border-b border-white/5 pb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white tracking-tightest leading-none mb-2">Backtracking: Hamiltonian Cycle</h3>
          <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#ffb343] opacity-60">Pathfinding Debugger • Graph Theory</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button onClick={prev} disabled={step <= 0} className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-all"><ChevronLeft size={22} /></button>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <span className="text-[13px] font-black text-white/40 w-16 text-center uppercase tracking-tighter">Step {Math.max(0, step+1)}</span>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <button onClick={next} disabled={step >= total - 1} className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-all"><ChevronRight size={22} /></button>
          </div>
          <button onClick={reset} className="px-5 py-3 rounded-2xl text-[14px] font-black text-white transition-all hover:bg-white/10 border border-white/10 uppercase tracking-widest"><RotateCcw size={16} className="inline mr-2" /> Reset</button>
          {running && !paused ? (
             <button onClick={pause} className="px-6 py-3 rounded-2xl text-[14px] font-black text-white transition-all bg-white/10 border border-white/20 uppercase tracking-widest shadow-lg"><Pause size={16} className="inline mr-2" /> Pause</button>
          ) : (
             <button onClick={play} className="px-8 py-3 rounded-2xl text-[14px] font-black text-black transition-all bg-[#ffb343] hover:bg-[#ffc670] uppercase tracking-widest shadow-[0_0_30px_rgba(255,179,67,0.3)]"><Play size={16} className="inline mr-2" /> {paused ? 'Resume' : 'Play'}</button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
        <div className="relative aspect-square max-w-[500px] mx-auto w-full">
           <svg viewBox="0 0 600 480" className="w-full h-full drop-shadow-2xl overflow-visible">
              <defs>
                 <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffb343"/><stop offset="100%" stopColor="#06d6c7"/></linearGradient>
              </defs>
              {NODES.map((a,ai)=>NODES.map((b,bi)=>{
                 if(bi<=ai||!ADJ[ai][bi])return null;
                 const key=`${Math.min(ai,bi)}-${Math.max(ai,bi)}`;
                 const inP=eSet.has(key);
                 const found=cur?.status==='found'&&inP;
                 return (
                   <motion.line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} initial={{opacity:0.05}} animate={{opacity:found?1:inP?0.8:0.05, strokeWidth:found?5:inP?4:1.5, stroke:found?'url(#edgeGradient)':inP?'#ffb343':'rgba(255,255,255,0.2)'}} />
                 );
              }))}
              {NODES.map((n, i)=>{
                 const inP=pSet.has(n.id);
                 const isCur=cur && cur.path[cur.path.length-1]===n.id && cur.status!=='found';
                 const isStart=n.id===0;
                 return (
                   <g key={n.id}>
                      <motion.circle cx={n.x} cy={n.y} initial={{r:24}} animate={{r:inP?32:24, fill:inP?`${n.c}25`:'rgba(255,255,255,0.03)', stroke:inP?n.c:'rgba(255,255,255,0.1)', strokeWidth:inP?4:2}} transition={{type:'spring', stiffness:300, damping:20}} />
                      {isCur && <motion.circle cx={n.x} cy={n.y} initial={{r:32}} animate={{r:[32,48,32], opacity:[0.5,0,0.5]}} transition={{repeat:Infinity, duration:1.5}} fill="none" stroke={n.c} strokeWidth={2} />}
                      <text x={n.x} y={n.y+8} textAnchor="middle" fontSize="20" fontWeight="900" fill={inP?'#fff':'rgba(255,255,255,0.2)'} fontFamily="var(--font-display)">{n.id}</text>
                      {isStart && <text x={n.x} y={n.y-45} textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffb343" className="uppercase tracking-[0.2em]">Start</text>}
                   </g>
                 );
              })}
           </svg>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
           <div>
              <div className="text-[12px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Adjacency Configuration</div>
              <div className="bg-black/40 rounded-3xl p-6 border border-white/10 shadow-inner grid grid-cols-6 gap-2">
                 <div className="w-8 h-8"/> {[0,1,2,3,4].map(i=><div key={i} className="w-8 h-8 flex items-center justify-center text-[11px] font-black text-[#ffb343]">{i}</div>)}
                 {ADJ.map((row, i)=>(
                    <Fragment key={i}>
                       <div className="w-8 h-8 flex items-center justify-center text-[11px] font-black text-[#ffb343]">{i}</div>
                       {row.map((val, j)=>(
                          <div key={j} className="w-8 h-8 flex items-center justify-center text-[12px] font-black rounded-lg border transition-all" style={{background:val?'rgba(255,179,67,0.05)':'rgba(255,255,255,0.02)', borderColor:val?'rgba(255,179,67,0.2)':'rgba(255,255,255,0.03)', color:val?'#ffb343':'rgba(255,255,255,0.1)'}}>{val}</div>
                       ))}
                    </Fragment>
                 ))}
              </div>
           </div>

           <div className="mt-auto">
              <div className="text-[12px] font-black text-[#ffb343] uppercase tracking-[0.2em] mb-4">Interactive Status</div>
              <div className="bg-white/5 rounded-[32px] border border-white/10 p-8 shadow-2xl relative overflow-hidden min-h-[160px] flex flex-col justify-center">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb343]" />
                 <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} className="flex flex-col gap-4">
                       <span className="text-sm font-black text-[#ffb34340] uppercase tracking-widest">{cur?.status ? cur.status : 'Ready to start'}</span>
                       <h4 className="text-2xl font-black text-white tracking-tight leading-tight">{cur ? cur.msg : 'Launch the backtracking simulation to find a Hamiltonian Cycle.'}</h4>
                       {cur && <div className="text-sm font-mono text-white/50 tracking-tighter mt-2 font-black">ACTIVE PATH: <span className="text-[#ffb343]">{cur.path.join(' → ')}</span></div>}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ── Huffman Coding ── */
type HNode={char?:string;freq:number;left?:HNode;right?:HNode;x?:number;y?:number};
function HuffmanAnimation() {
  const CHARS=[{char:'F',freq:5,color:'#86efac'},{char:'E',freq:9,color:'#f87171'},{char:'C',freq:12,color:'#06d6c7'},{char:'B',freq:13,color:'#8fd3ff'},{char:'D',freq:16,color:'#c084fc'},{char:'A',freq:45,color:'#ffb343'}];
  // Reconstruct tree steps
  const makeLeaf=(c:string,f:number)=>({char:c,freq:f});
  const t_F=makeLeaf('F',5), t_E=makeLeaf('E',9);
  const t_FE={freq:14,left:t_F,right:t_E};
  const t_C=makeLeaf('C',12), t_B=makeLeaf('B',13);
  const t_CB={freq:25,left:t_C,right:t_B};
  const t_D=makeLeaf('D',16);
  const t_FED={freq:30,left:t_FE,right:t_D};
  const t_CBFED={freq:55,left:t_CB,right:t_FED};
  const t_A=makeLeaf('A',45);
  const t_Root={freq:100,left:t_A,right:t_CBFED};
  
  const stepTrees=[
    null,
    t_FE,
    t_CB,
    t_FED,
    t_CBFED,
    t_Root
  ];

  const steps=[
    {msg:'Initial: All chars as leaf nodes in min-heap sorted by frequency.',heap:['F(5)','E(9)','C(12)','B(13)','D(16)','A(45)'],merged:[] as string[],codes:{} as Record<string,string>},
    {msg:'Merge F(5)+E(9) → node(14). Re-insert into min-heap.',heap:['C(12)','B(13)','node(14)','D(16)','A(45)'],merged:['F + E → node(14)'],codes:{}},
    {msg:'Merge C(12)+B(13) → node(25). Re-insert.',heap:['node(14)','D(16)','node(25)','A(45)'],merged:['F + E → node(14)','C + B → node(25)'],codes:{}},
    {msg:'Merge node(14)+D(16) → node(30). Re-insert.',heap:['node(25)','node(30)','A(45)'],merged:['F + E → node(14)','C + B → node(25)','node(14) + D → node(30)'],codes:{}},
    {msg:'Merge node(25)+node(30) → node(55). Re-insert.',heap:['A(45)','node(55)'],merged:['F+E→14','C+B→25','14+D→30','node(25)+node(30)→node(55)'],codes:{}},
    {msg:'Merge A(45)+node(55) → root(100). Tree complete! Codes assigned.',heap:['root(100)'],merged:['F+E→14','C+B→25','14+D→30','node(25)+node(30)→node(55)','A+node(55)→root(100)'],codes:{A:'0',B:'100',C:'101',D:'111',E:'1101',F:'1100'}},
  ];

  const assignPositions=(n:HNode|undefined,x:number,y:number,dx:number)=>{
    if(!n) return;
    n.x=x; n.y=y;
    assignPositions(n.left,x-dx,y+50,dx/1.8);
    assignPositions(n.right,x+dx,y+50,dx/1.8);
  };
  assignPositions(t_Root,300,30,120);

  const collectEdgesAndNodes=(n:HNode|undefined,edges:any[],nodes:any[])=>{
    if(!n)return;
    nodes.push(n);
    if(n.left){edges.push({from:n,to:n.left,label:'0'});collectEdgesAndNodes(n.left,edges,nodes);}
    if(n.right){edges.push({from:n,to:n.right,label:'1'});collectEdgesAndNodes(n.right,edges,nodes);}
  };
  
  const [step,setStep]=useState(-1);const [run,setRun]=useState(false);const ref=useRef(false);
  const play=async()=>{ref.current=true;setRun(true);for(let s=0;s<steps.length;s++){if(!ref.current)break;setStep(s);await new Promise(r=>setTimeout(r,1400));}setRun(false);};
  const reset=()=>{ref.current=false;setRun(false);setStep(-1);};
  useEffect(()=>()=>{ref.current=false;},[]);
  const cur=step>=0?steps[step]:steps[0];
  const treeToDraw=step>=0?stepTrees[step]:null;
  let edges:any[]=[], nodes:any[]=[];
  if(step===5){
    collectEdgesAndNodes(t_Root,edges,nodes);
  } else if(treeToDraw) {
     // draw subtrees
     for(let s=1; s<=step; s++){
       if(s==1) collectEdgesAndNodes(t_FE,edges,nodes);
       if(s==2) collectEdgesAndNodes(t_CB,edges,nodes);
       if(s==3) {
          edges=[]; nodes=[];
          collectEdgesAndNodes(t_FED,edges,nodes);
          collectEdgesAndNodes(t_CB,edges,nodes);
       }
       if(s==4) {
          edges=[]; nodes=[];
          collectEdgesAndNodes(t_CBFED,edges,nodes);
       }
     }
  }

  return(
    <div className="rounded-[30px] p-6 lg:p-8" style={{background:'linear-gradient(180deg,rgba(20,20,18,0.96),rgba(10,10,9,0.98))',border:'1px solid rgba(255,255,255,0.06)'}}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b pb-6" style={{borderColor:'rgba(255,255,255,0.05)'}}>
        <div>
          <span className="text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>Huffman Coding — Visual Tree Builder</span>
          <p className="text-[13px] font-black uppercase tracking-[0.3em] mt-2 text-white/40">Min-Heap Greedy Merge analysis</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white/80 border hover:bg-white/10" style={{borderColor:'rgba(255,255,255,0.1)'}}><RotateCcw size={14}/> Reset</button>
          <button onClick={play} disabled={run} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-bold text-black disabled:opacity-50" style={{background:'linear-gradient(180deg,#ffbf5f,#ff9820)'}}><Play size={14}/> Play</button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div>
           <div className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Construction Canvas</div>
           <div className="bg-black/40 rounded-[40px] border-2 border-white/5 p-8 shadow-inner overflow-hidden flex items-center justify-center relative" style={{borderColor:'rgba(255,255,255,0.05)', height:'380px'}}>
             <div className="absolute inset-0 bg-gradient-to-tr from-[#ffb343]/5 to-transparent pointer-events-none" />
             <svg viewBox="0 0 600 320" className="w-full relative z-10 overflow-visible">
              {edges.map((e,i)=>(<g key={i}><motion.line initial={{pathLength:0}} animate={{pathLength:1}} x1={e.from.x} y1={e.from.y+20} x2={e.to.x} y2={e.to.y-20} stroke="rgba(255,179,67,0.4)" strokeWidth={3} strokeDasharray="5 5"/><text x={(e.from.x+e.to.x)/2 - 12} y={(e.from.y+e.to.y)/2} fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="900" className="font-mono">{e.label}</text></g>))}
              {nodes.map((n,i)=>(<g key={i}><motion.circle initial={{scale:0}} animate={{scale:1}} cx={n.x} cy={n.y} r={22} fill={n.char?'rgba(6,214,199,0.2)':'rgba(255,179,67,0.2)'} stroke={n.char?'#06d6c7':'#ffb343'} strokeWidth={3} shadow="0 10px 30px rgba(0,0,0,0.5)"/><text x={n.x} y={n.y+6} textAnchor="middle" fontSize="16" fontWeight="900" fill="white" fontFamily="var(--font-display)">{n.char||n.freq}</text></g>))}
              {step<1&&<text x={300} y={160} textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="18" className="uppercase tracking-[0.4em] font-black">Waiting for Data...</text>}
             </svg>
           </div>
        </div>
        
        <div className="flex flex-col gap-8">
           <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
              <div className="text-[12px] font-black text-[#ffb343] uppercase tracking-[0.2em] mb-4">Min-Heap State</div>
              <div className="flex flex-wrap gap-3">
                 {cur.heap.map((node,i)=>(
                    <motion.div key={`${step}-${i}`} initial={{scale:0,x:-10}} animate={{scale:1,x:0}} className="rounded-2xl px-4 py-2 text-[14px] font-black border-2 shadow-lg font-mono" style={{background:i<2&&step<5?'rgba(255,152,32,0.15)':'rgba(255,255,255,0.03)',borderColor:i<2&&step<5?'rgba(255,152,32,0.4)':'rgba(255,255,255,0.1)',color:i<2&&step<5?'#ff9820':'rgba(255,255,255,0.8)'}}>
                       {node}
                    </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex-1">
              <div className="text-[12px] font-black text-[#06d6c7] uppercase tracking-[0.2em] mb-4">Merge Logs</div>
              <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                 {cur.merged.length > 0 ? cur.merged.map((m,i)=>(
                    <div key={i} className="text-[13px] font-black rounded-xl px-4 py-2 border border-[#06d6c720]" style={{background:'rgba(6,214,199,0.06)',color:'#06d6c7'}}>
                       {m}
                    </div>
                 )) : <div className="text-[11px] font-bold text-white/20 italic">No merges detected</div>}
              </div>
           </div>

           {step===5&&Object.keys(cur.codes).length>0 && (
              <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="bg-white/5 rounded-3xl p-6 border-2 border-[#06d6c740] shadow-[0_0_30px_rgba(6,214,199,0.1)]">
                 <div className="text-[12px] font-black text-[#06d6c7] uppercase tracking-[0.2em] mb-4">Binary Encoding Map</div>
                 <div className="grid grid-cols-2 gap-3">
                    {CHARS.map(c=>(<div key={c.char} className="text-sm font-black border-2 rounded-2xl px-4 py-2 flex justify-between items-center transition-all bg-black/20" style={{borderColor:`${c.color}40`,color:c.color, boxShadow:`inset 0 0 10px ${c.color}10`}}><span>{c.char}</span><span className="text-white text-lg font-mono tracking-tighter">{cur.codes[c.char]}</span></div>))}
                 </div>
              </motion.div>
           )}
        </div>
      </div>
      
      <AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-10 rounded-[24px] border-2 p-8 shadow-2xl relative overflow-hidden" style={{background:step===5?'rgba(6,214,199,0.08)':'rgba(255,179,67,0.08)',borderColor:step===5?'rgba(6,214,199,0.4)':'rgba(255,179,67,0.4)',color:step===5?'#06d6c7':'#ffb343'}}><div className="absolute top-0 left-0 w-2 h-full bg-current opacity-20"/><div className="text-[12px] font-black uppercase tracking-widest opacity-40 mb-2 tracking-[0.3em]">Step {step>=0?step+1:0}/{steps.length}</div><div className="text-xl font-black leading-tight tracking-tight">{cur.msg}</div></motion.div></AnimatePresence>
    </div>
  );
}

function AnimationForAlgorithm({ algorithm }: { algorithm: string }) {
  const content = ALGORITHM_CONTENT[algorithm as keyof typeof ALGORITHM_CONTENT];
  
  return (
    <div className="space-y-12">
      <div className="min-h-[600px] rounded-[40px] border border-white/5 bg-white/[0.01] p-1 shadow-2xl relative overflow-hidden">
        {algorithm.toLowerCase() === 'alphabeta' && <AlphaBetaAnimation />}
        {algorithm.toLowerCase() === 'bfs' && <BFSAnimation />}
        {algorithm.toLowerCase() === 'dfs' && <DFSAnimation />}
        {algorithm.toLowerCase() === 'astar' && <AStarAnimation />}
        {algorithm.toLowerCase() === 'nqueens' && <NQueensAnimation />}
        {algorithm.toLowerCase() === 'prim' && <PrimAnimation />}
        {algorithm.toLowerCase() === 'kruskal' && <KruskalAnimation />}
        {algorithm.toLowerCase() === 'knapsack01' && <Knapsack01Animation />}
        {algorithm.toLowerCase() === 'fractionalknapsack' && <FractionalKnapsackAnimation />}
        {algorithm.toLowerCase() === 'lcs' && <LCSAnimation />}
        {algorithm.toLowerCase() === 'obst' && <OBSTAnimation />}
        {algorithm.toLowerCase() === 'hamiltoniancycle' && <HamiltonianCycleAnimation />}
        {algorithm.toLowerCase() === 'huffman' && <HuffmanAnimation />}
      </div>
    </div>
  );
}

function Flashcard({ index, front, back, isFlipped, onToggle }: { index: number; front: string; back: string; isFlipped: boolean; onToggle: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.05 }} 
      className="[perspective:1000px]"
    >
      <motion.div 
        onClick={onToggle} 
        className="cursor-pointer min-h-[280px] rounded-[32px] p-10 flex items-center justify-center relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ 
          background: isFlipped ? 'linear-gradient(180deg, rgba(48,34,12,0.98), rgba(20,15,10,0.99))' : 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', 
          border: `1px solid ${isFlipped ? 'rgba(255,179,67,0.36)' : 'rgba(255,255,255,0.08)'}`,
        }}
        whileHover={{ y: -5 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 p-10 flex flex-col items-center justify-center [backface-visibility:hidden] z-10" style={{ transform: 'rotateY(0deg)' }}>
          <p className="text-[10px] font-black text-white/20 mb-6 uppercase tracking-[0.4em]">Neural Flashcard {index + 1}</p>
          <p className="font-bold text-white text-xl text-center leading-relaxed">
            {front}
          </p>
          <div className="mt-8 text-[10px] font-bold text-[#ffb343]/40 uppercase tracking-widest italic">Click to Reveal</div>
        </div>

        {/* Back Side (Answer) */}
        <div className="absolute inset-0 p-10 flex flex-col items-center justify-center [backface-visibility:hidden] z-20" style={{ transform: 'rotateY(180deg)' }}>
          <div className="flex flex-col items-center">
             <p className="text-[10px] font-black text-[#ffb343] mb-6 uppercase tracking-[0.4em]">Neural Answer</p>
             <p className="font-bold text-white text-lg text-center leading-relaxed max-w-[90%]">
               {back}
             </p>
             <div className="mt-8 text-[10px] font-bold text-white/20 uppercase tracking-widest italic font-mono">Tap to Flip Back</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ContentPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');
  const [algorithm, setAlgorithm] = useState('');
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (params && params.algorithm) {
      const algorithmParam = Array.isArray(params.algorithm) ? params.algorithm[0] : params.algorithm;
      const paramLower = algorithmParam?.toLowerCase() || '';
      const actualKey = Object.keys(ALGORITHM_CONTENT).find(k => k.toLowerCase() === paramLower);
      setAlgorithm(actualKey || paramLower);
    }
    setIsLoading(false);
  }, [params]);

  const content = ALGORITHM_CONTENT[algorithm as keyof typeof ALGORITHM_CONTENT];
  if (isLoading || !algorithm || !content) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0b0b09 0%, #070706 100%)' }}><motion.div animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2, repeat: Infinity }} className="rounded-3xl border px-8 py-6 text-white text-xl font-semibold" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(17,17,15,0.92)' }}>Loading content...</motion.div></div>;
  }

  const tabs = [
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'pseudocode', label: 'Pseudocode', icon: Code2 },
    { id: 'flashcards', label: 'Flashcards', icon: Brain },
    { id: 'animations', label: 'Animations', icon: Sparkles },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle2 },
    { id: 'important', label: 'Important', icon: Zap },
    { id: 'realworld', label: 'Real World', icon: Globe },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0b0b09 0%, #070706 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ width: '760px', height: '760px', background: 'radial-gradient(circle, rgba(255,179,67,0.12) 0%, transparent 68%)', top: '-180px', right: '-120px', filter: 'blur(18px)' }} />
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at 50% 20%, rgba(0,0,0,1) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 z-50 mix-blend-overlay opacity-[0.09]"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><filter id="noiseApp"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseApp)" /></svg></div>
      </div>
      <motion.div className="relative z-10 sticky top-0" style={{ background: 'rgba(10,10,9,0.78)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}><div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4"><div className="flex items-center gap-4 min-w-0"><Button variant="ghost" size="icon" onClick={() => router.push('/')} className="rounded-2xl border hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}><ArrowLeft className="w-5 h-5 text-white/65" /></Button><div className="min-w-0 pb-1"><div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ffb343]" style={{ fontFamily: 'var(--font-display)' }}>{content.category}</div><h1 className="mt-1 text-3xl font-extrabold tracking-[-0.05em] text-white md:text-5xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{content.name}</h1></div></div></div></motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-10 flex w-full justify-center"><TabsList className="relative flex min-w-max items-center justify-between gap-2.5 rounded-full p-3 mx-auto" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>{tabs.map((tab) => { const Icon = tab.icon; const isActive = activeTab === tab.id; return <TabsTrigger key={tab.id} value={tab.id} className="relative z-10 flex min-w-[160px] flex-1 items-center justify-center gap-3 rounded-full px-6 py-4 text-[14px] font-extrabold uppercase tracking-[0.2em]" style={{ color: isActive ? '#000' : 'rgba(255,255,255,0.5)' }}>{isActive && <motion.div layoutId="active-tab-indicator" className="absolute inset-0 -z-10 rounded-full" style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9820)' }} />}<Icon className="h-5 w-5" /><span className="hidden sm:inline">{tab.label}</span></TabsTrigger>; })}</TabsList></div>
          <TabsContent value="summary" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="rounded-[30px] p-8 border-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h2 className="text-3xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Core Methodology</h2>
                <p className="text-lg text-white/80 leading-relaxed font-bold">{content.summary.overview}</p>
              </Card>

              <Card className="rounded-[30px] p-8 border-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h2 className="text-2xl font-semibold text-white mb-5 tracking-[-0.04em]" style={{ fontFamily: 'var(--font-display)' }}>Key Characteristics</h2>
                <ul className="space-y-3">
                  {content.summary.keyPoints.map((point, i) => (
                    <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                      <span className="text-base mt-0.5 font-bold" style={{ color: '#06d6c7' }}>→</span>
                      <span className="text-base text-gray-200 leading-relaxed font-medium">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {[{ label: 'Time Complexity', value: content.complexity.time, color: '#ffb343' }, { label: 'Space Complexity', value: content.complexity.space, color: '#f3ead7' }].map((item) => (
                  <Card key={item.label} className="rounded-[28px] p-6 border-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', border: `1px solid ${item.color === '#ffb343' ? 'rgba(255,179,67,0.24)' : 'rgba(255,255,255,0.12)'}` }}>
                    <h3 className="text-base font-bold text-white/55 mb-3 uppercase tracking-[0.14em]">{item.label}</h3>
                    <p className="text-xl font-black font-mono" style={{ color: item.color }}>{item.value}</p>
                  </Card>
                ))}
              </div>

              <Card className="rounded-[30px] p-8 border-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h2 className="text-2xl font-semibold text-white mb-5 tracking-[-0.04em]" style={{ fontFamily: 'var(--font-display)' }}>Important Concepts</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {content.importantContent.map((item, i) => (
                    <motion.div key={i} className="rounded-[24px] border p-5" style={{ borderColor: 'rgba(255,255,255,0.08)', background: i === 0 ? 'linear-gradient(180deg, rgba(43,31,12,0.96), rgba(15,12,8,0.98))' : 'rgba(255,255,255,0.02)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb343]">{item.title}</div>
                      <p className="mt-3 text-sm leading-7 text-white/68">{item.content}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="pseudocode" className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[30px] p-1 border-0" style={{ background: 'rgba(255,179,67,0.06)', border: '1px solid rgba(255,179,67,0.15)' }}>
              <div className="rounded-[28px] overflow-hidden bg-[#0a0a09] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-[#ffb343]" />
                  <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Conceptual Pseudocode</h2>
                </div>
                <pre className="text-lg text-white font-black leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto bg-white/5 p-8 rounded-3xl border-2" style={{ borderColor: 'rgba(255,179,67,0.2)', boxShadow: 'inset 0 0 40px rgba(255,179,67,0.05)' }}>
                  {content.pseudocode}
                </pre>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="flashcards" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.flashcards.map((card: any, i: number) => (
                <Flashcard 
                  key={i} 
                  front={card.question} 
                  back={card.answer} 
                  index={i} 
                  isFlipped={flippedIndex === i}
                  onToggle={() => setFlippedIndex(flippedIndex === i ? null : i)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="animations" className="space-y-6"><AnimationForAlgorithm algorithm={algorithm} /></TabsContent>
          <TabsContent value="quiz" className="space-y-6">{content.quiz.map((question, i) => <QuizQuestion key={i} question={question} index={i} />)}</TabsContent>
          <TabsContent value="important" className="space-y-4">{content.importantContent.map((item, i) => <Card key={i} className="rounded-[28px] p-6 border-0" style={{ background: 'linear-gradient(180deg, rgba(33,28,18,0.96), rgba(12,11,9,0.98))', border: '1px solid rgba(255,179,67,0.24)' }}><h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Zap className="w-5 h-5" style={{ color: '#eab308' }} />{item.title}</h3><p className="text-base text-white/72 leading-relaxed font-medium">{item.content}</p></Card>)}</TabsContent>

          <TabsContent value="realworld" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Header */}
              <div className="rounded-[30px] p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(22,22,19,0.96) 0%, rgba(30,20,10,0.98) 100%)', border: '1px solid rgba(255,179,67,0.2)' }}>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #ffb343 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,179,67,0.15)', border: '1px solid rgba(255,179,67,0.3)' }}>
                      <Globe className="w-5 h-5" style={{ color: '#ffb343' }} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Data Analysis &amp; Algorithms — Subject Connection</span>
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>Real World Applications</h2>
                  <p className="text-white/60 text-base font-medium leading-relaxed max-w-3xl">Discover how <span className="text-[#ffb343] font-bold">{content.name}</span> powers real industry systems — from tech giants to medical research. These are the applications you\'ll encounter in your career.</p>
                </div>
              </div>

              {/* Application Cards Grid */}
              {(content as any).realWorldApplications && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {(content as any).realWorldApplications.map((app: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group relative rounded-[28px] p-6 flex flex-col gap-4 overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, rgba(22,22,19,0.97), rgba(10,10,9,0.98))',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                      }}
                      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5)', borderColor: 'rgba(255,179,67,0.25)' }}
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px]" style={{ background: 'radial-gradient(ellipse at top left, rgba(255,179,67,0.06) 0%, transparent 60%)' }} />

                      {/* Card number + icon */}
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {app.icon}
                        </div>
                        <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em] mt-1">#{String(i + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Industry badge */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]" style={{ background: 'rgba(255,179,67,0.12)', color: '#ffb343', border: '1px solid rgba(255,179,67,0.25)' }}>
                          {app.industry}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-white leading-tight tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {app.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/55 leading-relaxed font-medium flex-1">
                        {app.description}
                      </p>

                      {/* Impact divider */}
                      <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: '#06d6c7' }}>📊 Impact</div>
                        <p className="text-sm font-bold leading-relaxed" style={{ color: 'rgba(6,214,199,0.85)' }}>
                          {app.impact}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Subject Connection Banner */}
              <div className="rounded-[28px] p-8" style={{ background: 'linear-gradient(135deg, rgba(6,214,199,0.08), rgba(255,179,67,0.08))', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">🎓</div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Data Analysis &amp; Algorithms — Subject Link</h4>
                    <p className="text-white/60 text-sm leading-relaxed font-medium">
                      In your <span className="text-[#ffb343] font-bold">Data Analysis and Algorithms</span> course, {content.name} exemplifies key principles: 
                      <span className="text-white/80 font-semibold"> time-space complexity trade-offs</span>, 
                      <span className="text-white/80 font-semibold"> optimal substructure</span>, and 
                      <span className="text-white/80 font-semibold"> algorithm design paradigms</span>. 
                      The applications above are direct case studies of how theoretical algorithm analysis translates to measurable, billion-dollar real-world impact.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}



function QuizQuestion({ question, index }: { question: any; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected !== null ? selected === question.correctAnswer : null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
      <Card className="rounded-[30px] p-8 md:p-10 border-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(10,10,9,0.98))', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-8 leading-snug tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{question.question}</h3>
        <div className="space-y-4 mb-8">
          {question.options.map((option: string, i: number) => {
            const isSelectedAnswer = selected === i;
            const isCorrectAnswer = i === question.correctAnswer;

            let border = 'rgba(255,255,255,0.12)';
            let bg = 'rgba(255,255,255,0.03)';
            let textClass = 'text-white/70';

            if (selected !== null) {
              if (isCorrectAnswer) {
                border = 'rgba(34,197,94,0.8)';
                bg = 'rgba(34,197,94,0.15)';
                textClass = 'text-green-50';
              } else if (isSelectedAnswer) {
                border = 'rgba(239,68,68,0.8)';
                bg = 'rgba(239,68,68,0.15)';
                textClass = 'text-red-50';
              }
            }

            return (
              <motion.button
                key={i}
                onClick={() => setSelected(i)}
                disabled={selected !== null}
                className={`w-full text-left p-5 rounded-2xl transition-all font-semibold ${textClass} disabled:cursor-default`}
                style={{ background: bg, border: `1.5px solid ${border}` }}
                whileHover={selected === null ? { x: 6, background: 'rgba(255,255,255,0.06)' } : {}}
              >
                <span className="inline-flex items-center gap-4 w-full">
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background: 'rgba(255,179,67,0.12)', border: '1px solid rgba(255,179,67,0.28)', color: '#ffb343' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-base font-bold tracking-tight">{option}</span>
                  {selected !== null && isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />}
                  {selected !== null && isSelectedAnswer && !isCorrectAnswer && <span className="text-xl font-black text-red-400 flex-shrink-0">✕</span>}
                </span>
              </motion.button>
            );
          })}
        </div>
        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 md:p-6 rounded-2xl border" style={{ background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', borderColor: isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)' }}>
            <p className={`font-black text-lg tracking-wide uppercase ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</p>
            {question.explanation && <p className="text-base text-white/80 mt-3 leading-relaxed font-semibold">{question.explanation}</p>}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}


