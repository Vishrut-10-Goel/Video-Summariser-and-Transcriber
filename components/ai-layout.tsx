'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain } from 'lucide-react';

export function AILayout({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#070706] text-white selection:bg-[#ffb343]/30">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#070706]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button 
            onClick={() => router.push('/')}
            className="group flex items-center gap-3 text-sm font-bold text-white/40 transition hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
               <ArrowLeft size={16} />
            </div>
            Back to Hub
          </button>
          
          <div className="flex items-center gap-3">
             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-[0_0_20px_rgba(255,152,32,0.2)]">
                <Brain size={20} className="text-white" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">ScribliX AI Analyst</span>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
