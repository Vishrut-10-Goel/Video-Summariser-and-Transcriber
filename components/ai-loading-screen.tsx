'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Brain, Database, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const LOADING_STEPS = [
  { icon: Loader2, text: 'Fetching Neural Audio Stream...', color: '#a1a1aa' },
  { icon: Brain, text: 'Initialising Transcription Logic...', color: '#60a5fa' },
  { icon: Zap, text: 'Deep Context Summarization...', color: '#fbbf24' },
  { icon: Database, text: 'Extracting Algorithmic Patterns...', color: '#34d399' },
  { icon: Sparkles, text: 'Synthesizing Visual Debugger...', color: '#f472b6' },
  { icon: ShieldCheck, text: 'Finalizing Interactive Graph...', color: '#00f2fe' },
];

export function AILoadingScreen({ isVisible }: { isVisible: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setStep(s => (s + 1) % LOADING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070706] px-6 text-center"
        >
          {/* Ambient Background Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] opacity-30" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Holographic Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
                border: ['1px solid rgba(255,179,67,0.1)', '1px solid rgba(255,179,67,0.4)', '1px solid rgba(255,179,67,0.1)'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-12 flex h-32 w-32 items-center justify-center rounded-3xl bg-white/[0.03]"
            >
              <div className="relative">
                <Brain size={56} className="text-[#ffb343] drop-shadow-[0_0_15px_rgba(255,179,67,0.4)]" />
                <motion.div
                   animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="absolute -top-2 -right-2"
                >
                  <Zap size={24} className="text-amber-300" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              layout
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                ScribliX <span className="text-[#ffb343]">AI Engine</span>
              </h2>
              <div className="mt-8 flex flex-col items-center gap-4">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-4 rounded-2xl border bg-white/[0.02] px-6 py-4 shadow-2xl backdrop-blur-md"
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      {(() => {
                        const Icon = LOADING_STEPS[step].icon;
                        return <Icon className={step === 0 ? 'animate-spin' : ''} style={{ color: LOADING_STEPS[step].color }} size={24} />;
                      })()}
                      <span className="text-lg font-bold tracking-tight text-white/90">
                        {LOADING_STEPS[step].text}
                      </span>
                    </motion.div>
                 </AnimatePresence>
                 
                 {/* Progress Bar Container */}
                 <div className="mt-4 w-64 h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <motion.div
                       animate={{ width: `${((step + 1) / LOADING_STEPS.length) * 100}%` }}
                       className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
                    />
                 </div>
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-white/20">Processing Neural Data</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
