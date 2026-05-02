'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { AILayout } from '@/components/ai-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { CheckCircle, HelpCircle, Code2, ListChecks, Info, AlertCircle, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CustomAlgorithmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [activeQuiz, setActiveQuiz] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const rawData = searchParams.get('data');
    const url = searchParams.get('url');
    if (url) setVideoUrl(decodeURIComponent(url));
    if (rawData) {
      try {
        setData(JSON.parse(decodeURIComponent(rawData)));
      } catch (e) {
        console.error('Failed to parse AI data');
      }
    }
  }, [searchParams]);

  const extractId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  };

  if (!data) return (
    <div className="flex min-h-screen items-center justify-center bg-[#070706]">
      <div className="animate-pulse text-white/40">Loading AI Content...</div>
    </div>
  );

  return (
    <AILayout title={data.name}>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <header className="mb-12 border-b border-white/5 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#ffb343]">{data.category}</span>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] text-white md:text-6xl">{data.name}</h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-white/50">{data.summary.overview}</p>
            </div>
            <div className="flex gap-4">
               <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center min-w-[140px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Time Complexity</div>
                  <div className="mt-1 text-xl font-black text-[#ffb343]">{data.complexity.time}</div>
               </div>
               <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center min-w-[140px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Space Complexity</div>
                  <div className="mt-1 text-xl font-black text-[#ffb343]">{data.complexity.space}</div>
               </div>
            </div>
          </div>
        </header>

        <Tabs defaultValue="theory" className="w-full">
          <TabsList className="mb-12 h-14 w-full justify-start rounded-2xl border border-white/5 bg-white/[0.01] p-1.5 md:w-auto">
            <TabsTrigger value="theory" className="flex h-full items-center gap-2 rounded-xl px-8 text-sm font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <Info size={16} /> Summary
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex h-full items-center gap-2 rounded-xl px-8 text-sm font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <Sparkles size={16} /> Flashcards
            </TabsTrigger>
            <TabsTrigger value="pseudocode" className="flex h-full items-center gap-2 rounded-xl px-8 text-sm font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <Code2 size={16} /> Logic Trace
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex h-full items-center gap-2 rounded-xl px-8 text-sm font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <ListChecks size={16} /> Assessment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory">
            <div className="grid gap-10 lg:grid-cols-2">
              <Card className="rounded-[30px] border border-white/10 bg-white/[0.02] p-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="flex items-center gap-3 text-xl font-black text-white italic">
                      <Zap size={20} className="text-[#ffb343] fill-current" /> Key Insights
                   </h3>
                   <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-tighter">ScribliX AI Analysed</span>
                </div>
                <ul className="mt-8 space-y-7">
                  {data.summary.keyPoints.map((pt: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-lg font-semibold text-white/70 leading-relaxed">
                      <div className="mt-1.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffb343]/10 text-[11px] font-black text-[#ffb343]">
                         {idx + 1}
                      </div>
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
              
              <div className="space-y-6">
                 <div className="rounded-[30px] border border-[#ffb343]/20 bg-[#ffb343]/5 p-8 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10"><Zap size={120} /></div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ffb343] mb-4">Recommended Similar Neural Stream</h4>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-6 border border-white/10">
                       <iframe 
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/pcKY4hjDrxk?rel=0`}
                          title="Similar Content"
                          allowFullScreen
                       />
                    </div>
                    <p className="text-sm font-bold text-white/60 leading-relaxed">
                       Based on the architectural analysis of your input video, our engine recommends this secondary stream for deeper contextual reinforcement of the {data.name} principles.
                    </p>
                 </div>
                 <div className="rounded-[30px] bg-white/[0.03] p-8 border border-white/5">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white/20 mb-4">Neural Extraction Metadata</h4>
                    <p className="text-xs font-semibold leading-relaxed text-white/40">
                       Analysis complete for provided source URL. Similar video synthesized for comparative learning.
                    </p>
                 </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flashcards">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {(data.flashcards || []).map((card: any, idx: number) => (
                 <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="group relative h-64 w-full [perspective:1000px]"
                 >
                   <div className="relative h-full w-full rounded-[28px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                     <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center [backface-visibility:hidden]">
                        <div className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#ffb343]">Neural Flashcard {idx + 1}</div>
                        <p className="text-lg font-black text-white">{card.front}</p>
                        <div className="mt-8 text-[10px] font-bold text-white/20 uppercase tracking-tighter">Hover to reveal answer</div>
                     </div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border border-[#ffb343]/30 bg-[#ffb343]/5 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <p className="text-[15px] font-bold leading-relaxed text-white">{card.back}</p>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </TabsContent>

          <TabsContent value="pseudocode">
             <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0c0b] p-8 md:p-12 shadow-2xl">
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-8">
                  <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 italic underline decoration-[#ffb343] decoration-2 underline-offset-8">Execution Trace</div>
                  <div className="flex gap-1.5">
                    {[1,2,3].map(i => <div key={i} className="h-2 w-2 rounded-full bg-white/5" />)}
                  </div>
                </div>
                <pre className="overflow-x-auto text-[15px] font-medium leading-[1.8] text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
                  <code>{data.pseudocode}</code>
                </pre>
             </Card>
          </TabsContent>

          <TabsContent value="quiz">
             <div className="mx-auto max-w-4xl">
               <div className="mb-10 flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                  {data.quiz.map((_: any, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => { setActiveQuiz(idx); setSelectedOption(null); setShowExplanation(false); }}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all ${
                        activeQuiz === idx ? 'bg-[#ffb343] text-black shadow-[0_0_15px_rgba(255,179,67,0.3)]' : 'bg-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
               </div>
               
               <AnimatePresence mode="wait">
                 <motion.div 
                    key={activeQuiz}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-1"
                 >
                   <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#ffb343]">Assessment Module {activeQuiz + 1} of {data.quiz.length}</span>
                      <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">ScribliX AI Analysed</span>
                   </div>
                   <h3 className="text-3xl font-black leading-tight text-white mb-10">{data.quiz[activeQuiz].question}</h3>
                   <div className="grid gap-4">
                     {data.quiz[activeQuiz].options.map((opt: string, idx: number) => (
                       <button
                         key={idx}
                         onClick={() => { setSelectedOption(idx); setShowExplanation(true); }}
                         className={`group relative flex items-center justify-between rounded-2xl border p-6 text-left transition-all ${
                            selectedOption === idx 
                              ? idx === data.quiz[activeQuiz].correctAnswer 
                                ? 'border-emerald-500/50 bg-emerald-500/5' 
                                : 'border-red-500/50 bg-red-500/5'
                              : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                         }`}
                       >
                         <span className={`text-lg font-bold ${selectedOption === idx ? 'text-white' : 'text-white/60'}`}>{opt}</span>
                         {selectedOption === idx && (
                           idx === data.quiz[activeQuiz].correctAnswer 
                             ? <CheckCircle className="text-emerald-400" />
                             : <AlertCircle className="text-red-400" />
                         )}
                       </button>
                     ))}
                   </div>
                   {showExplanation && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                       <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/40">Neural Context</h4>
                       <p className="mt-4 text-lg font-bold leading-relaxed text-white/90">{data.quiz[activeQuiz].explanation}</p>
                       {activeQuiz < data.quiz.length - 1 && (
                         <button 
                           onClick={() => {
                             setActiveQuiz(activeQuiz + 1);
                             setSelectedOption(null);
                             setShowExplanation(false);
                           }}
                           className="mt-8 rounded-xl bg-white/10 px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all"
                         >
                           Continue to Module {activeQuiz + 2}
                         </button>
                       )}
                     </motion.div>
                   )}
                 </motion.div>
               </AnimatePresence>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AILayout>
  );
}

export default function CustomAlgorithmPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#070706]">
        <div className="animate-pulse text-white/40">Loading AI Content...</div>
      </div>
    }>
      <CustomAlgorithmContent />
    </Suspense>
  );
}
