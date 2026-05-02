import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { detectAlgorithmFromUrl, isValidYoutubeUrl } from '@/lib/url-detector';
import { AILoadingScreen } from '@/components/ai-loading-screen';

const STATS = [
  { label: 'Videos Analysed', value: '12K+' },
  { label: 'Concepts Extracted', value: '1.2M+' },
  { label: 'Teams Onboarded', value: '300+' },
];

const FEATURE_PANELS = [
  {
    icon: ShieldCheck,
    title: 'AI-Powered Deep Insight Engine',
    copy: 'Automatically distils hours of dense algorithmic concepts into brilliantly mapped interactive knowledge graphs.',
  },
  {
    icon: Zap,
    title: 'Instant Visual Pattern Recognition',
    copy: 'Transform raw video links into high-fidelity animated data structures and logic trees that you instantly process and permanently retain.',
  },
];

const CYCLING_WORDS = ['Collective', 'Shared', 'Hidden', 'Untapped'];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CYCLING_WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className="inline-block text-[#ffb343]"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
        transition={{ duration: 0.4 }}
      >
        {CYCLING_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
}

function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 10%, rgba(255,176,63,0.18), transparent 30%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 50% 100%, rgba(255,145,0,0.12), transparent 35%), linear-gradient(180deg, #0b0b09 0%, #090908 40%, #070706 100%)',
        }}
      />
      <motion.div
        className="absolute -left-24 top-20 h-80 w-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,170,59,0.18), transparent 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: [0, 40, -10, 0], y: [0, -10, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 top-40 h-96 w-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, -40, 10, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 50% 20%, rgba(0,0,0,1) 0%, transparent 65%)',
        }}
      />

      <div
        className="absolute inset-0 z-50 mix-blend-overlay opacity-[0.09]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}

function OrbitalSculpture() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[450px]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(219,219,223,0.8) 38%, rgba(108,108,115,0.75) 72%, rgba(20,20,20,0.95) 100%)',
          boxShadow: '0 22px 60px rgba(0,0,0,0.55), inset 0 0 35px rgba(255,255,255,0.16)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute inset-[18%] rounded-full border"
          style={{ borderColor: 'rgba(255,255,255,0.22)' }}
        />
      </motion.div>

      {[
        {
          size: 'h-[320px] w-[320px]',
          border: 'rgba(255,179,0,0.96)',
          tilt: 'rotate-[18deg]',
          duration: 10,
          shadow: '0 0 30px rgba(255,171,0,0.28)',
        },
        {
          size: 'h-[290px] w-[190px]',
          border: 'rgba(255,255,255,0.7)',
          tilt: '-rotate-[32deg]',
          duration: 14,
          shadow: '0 0 24px rgba(255,255,255,0.14)',
        },
        {
          size: 'h-[190px] w-[330px]',
          border: 'rgba(255,140,0,0.8)',
          tilt: 'rotate-[62deg]',
          duration: 12,
          shadow: '0 0 26px rgba(255,140,0,0.16)',
        },
      ].map((ring) => (
        <motion.div
          key={ring.tilt}
          className={`absolute left-1/2 top-1/2 ${ring.size} -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] ${ring.tilt}`}
          style={{
            borderColor: ring.border,
            boxShadow: ring.shadow,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.08))',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[300px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,192,76,0), rgba(255,192,76,0.9) 25%, rgba(255,130,0,0.98) 50%, rgba(255,199,99,0.85) 78%, rgba(255,192,76,0))',
          filter: 'blur(2px)',
          transformOrigin: 'center',
          boxShadow: '0 0 40px rgba(255,153,0,0.28)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-[12%] rounded-full border"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function LandingPage() {
  const router = useRouter();
  const analyzeRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ctaActivated, setCtaActivated] = useState(false);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ['start start', 'end start'],
  });
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const handleCta = () => {
    setCtaActivated(true);
    analyzeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => inputRef.current?.focus(), 550);
  };

  const handleLoadContent = async () => {
    if (isProcessing) return;
    setError('');

    if (!url.trim()) {
      setError('Please paste a YouTube URL');
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const algorithm = detectAlgorithmFromUrl(url);
    setIsProcessing(true);
    
    try {
      if (algorithm) {
        await new Promise(r => setTimeout(r, 6500));
        setIsProcessing(false);
        router.push(`/content/${algorithm}?url=${encodeURIComponent(url)}`);
        return;
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url })
      });
      const aiResponse = await res.json();

      if (!res.ok) throw new Error(aiResponse.error || 'AI Synthesis block');

      await new Promise(r => setTimeout(r, 4500));
      setIsProcessing(false);

      const payload = encodeURIComponent(JSON.stringify(aiResponse.data));
      router.push(`/content/custom?data=${payload}&url=${encodeURIComponent(url)}`);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'The AI Engine encountered a core sync error.');
    }
  };

  useEffect(() => {
    setError('');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060606] text-white">
      <AILoadingScreen isVisible={isProcessing} />
      <AmbientBackdrop />

      <main className="relative z-10 px-4 py-4 md:px-8 md:py-8">
        <section ref={shellRef} className="mx-auto max-w-[88rem]">
          <div
            className="rounded-[28px] border p-4 md:p-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(20,20,17,0.86), rgba(10,10,9,0.96)), radial-gradient(circle at top left, rgba(255,178,74,0.12), transparent 26%)',
              borderColor: 'rgba(255,255,255,0.14)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 45px 120px rgba(0,0,0,0.58)',
            }}
          >
            <div className="grid gap-8 px-3 py-5 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-7 lg:py-7 xl:grid-cols-[1.02fr_1fr]">
              <div className="flex flex-col justify-between lg:min-h-[46rem]">
                <div className="max-w-[39rem]">
                  <motion.div
                    className="mb-7"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="max-w-[8.8ch] text-[clamp(2.85rem,7.9vw,5.8rem)] font-black leading-[0.94] tracking-[-0.02em] text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      ScribliX
                    </div>
                    <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.42em] text-white/40">Knowledge Engine</div>
                  </motion.div>

                  <motion.p
                    className="mb-4 text-[13px] font-black uppercase tracking-[0.35em] text-[#ffb343]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                  >
                    Stop Managing Knowledge. Start Using It.
                  </motion.p>

                  <motion.h1
                    className="max-w-[9ch] text-[2.5rem] font-black leading-[0.94] tracking-[-0.035em] text-white md:text-[3.7rem] xl:text-[4.2rem]"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    Unlock
                    <br />
                    <CyclingWord />
                    <br />
                    Wisdom.
                  </motion.h1>

                  <motion.p
                    className="mt-6 max-w-[33rem] text-[1.15rem] font-semibold leading-8 text-white/70"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Your videos know more than you remember.
                  </motion.p>

                  <motion.p
                    className="mt-4 max-w-[35rem] text-[1.1rem] font-medium leading-8 text-white/60"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.28 }}
                  >
                    ScribliX analyses any video and instantly generates interactive visualizations, explanations, flashcards, and quizzes so your team learns faster and retains more.
                  </motion.p>

                  <motion.div
                    className="mt-8 flex flex-wrap items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.36 }}
                  >
                    <button
                      id="cta-analyse"
                      onClick={handleCta}
                      className="inline-flex items-center gap-3 rounded-2xl border border-[#ffbf5f]/50 px-6 py-3 text-base font-extrabold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(180deg, #ffbf5f, #ff9b26)', boxShadow: ctaActivated ? '0 0 0 8px rgba(255,166,39,0.08), 0 22px 44px rgba(255,155,38,0.3)' : '0 18px 30px rgba(255,155,38,0.2)' }}
                    >
                      Analyse a Video
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 grid gap-4 md:grid-cols-3"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.44 }}
                >
                  {STATS.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[20px] border p-5"
                      style={{
                        borderColor: 'rgba(255,255,255,0.08)',
                        background:
                          'linear-gradient(180deg, rgba(31,31,28,0.9), rgba(18,18,16,0.95))',
                      }}
                    >
                      <div className="text-3xl font-semibold tracking-[-0.05em] text-[#ffb343]" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.value}
                      </div>
                      <div className="mt-2 text-[13px] font-bold uppercase tracking-[0.2em] text-white/60">{item.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div style={{ y: artworkY }} className="relative flex items-stretch justify-center">
                <div className="relative w-full min-h-[46rem] rounded-[28px] border p-6 md:p-8" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'linear-gradient(180deg, rgba(17,17,15,0.9), rgba(10,10,9,0.98))' }}>
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[13px] font-bold uppercase tracking-[0.28em] text-white/40">
                    <span>Live Analysis</span>
                    <span>Knowledge Graph</span>
                  </div>
                  <div className="pt-10">
                    <OrbitalSculpture />
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {FEATURE_PANELS.map((panel) => {
                      const Icon = panel.icon;
                      return (
                        <div
                          key={panel.title}
                          className="rounded-[20px] border p-4"
                          style={{
                            borderColor: 'rgba(255,255,255,0.08)',
                            background:
                              'linear-gradient(180deg, rgba(37,37,33,0.92), rgba(18,18,16,0.98))',
                          }}
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffb343]/12">
                            <Icon className="h-5 w-5 text-[#ffb343]" />
                          </div>
                          <div className="text-[19px] font-extrabold text-white leading-tight">{panel.title}</div>
                          <p className="mt-3 text-[16px] font-semibold leading-[1.6] text-white/70">{panel.copy}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={analyzeRef} className="mx-auto mt-12 max-w-7xl">
          <motion.div
            className="overflow-hidden rounded-[28px] border"
            style={{
              borderColor: ctaActivated ? 'rgba(255,179,67,0.34)' : 'rgba(255,255,255,0.1)',
              background:
                'linear-gradient(180deg, rgba(22,22,19,0.96), rgba(9,9,8,0.99)), radial-gradient(circle at top right, rgba(255,170,59,0.1), transparent 26%)',
              boxShadow: ctaActivated ? '0 0 0 1px rgba(255,179,67,0.18), 0 34px 90px rgba(0,0,0,0.45)' : '0 28px 80px rgba(0,0,0,0.38)',
            }}
            animate={{
              scale: ctaActivated ? [1, 1.015, 1] : 1,
              y: ctaActivated ? [0, -4, 0] : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                className="relative overflow-hidden border-b p-8 md:p-12 lg:border-b-0 lg:border-r"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className="absolute -right-12 top-12 h-40 w-40 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,170,59,0.14), transparent 65%)', filter: 'blur(12px)' }}
                />
                <p className="text-[14px] font-bold uppercase tracking-[0.42em] text-[#ffb343]">Analyse Flow</p>
                <h2 className="mt-5 text-4xl font-extrabold leading-[0.94] tracking-[-0.06em] text-white md:text-5xl xl:text-[4.2rem]" style={{ fontFamily: 'var(--font-display)' }}>
                  Paste Your
                  <br />
                  <span className="text-[#ffb343]">Video URL</span>
                </h2>
                <div className="mt-12 space-y-4">
                  {[
                    'Click Analyse a Video',
                    'Paste a supported YouTube link',
                    'Open the full content experience',
                  ].map((step, index) => (
                    <div key={step} className="flex items-center gap-5 rounded-[24px] border px-5 py-5" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-black" style={{ background: index === 0 && ctaActivated ? '#ffb343' : 'rgba(255,255,255,0.12)', color: index === 0 && ctaActivated ? '#111' : 'rgba(255,255,255,0.8)' }}>
                        0{index + 1}
                      </div>
                      <div className="text-[14px] font-bold uppercase tracking-[0.24em] text-white/80">{step}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="p-6 md:p-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.12 }}
              >
                <Card
                  className="rounded-[34px] border p-6 shadow-none md:p-10"
                  style={{
                    borderColor: url.length > 0 || ctaActivated ? 'rgba(255,179,67,0.3)' : 'rgba(255,255,255,0.1)',
                    background:
                      'linear-gradient(180deg, rgba(33,33,29,0.95), rgba(13,13,11,0.98)), radial-gradient(circle at top right, rgba(255,170,59,0.08), transparent 28%)',
                    boxShadow: url.length > 0 || ctaActivated ? '0 0 0 1px rgba(255,179,67,0.1), inset 0 0 60px rgba(255,170,59,0.03)' : 'none',
                  }}
                >
                  <div className="space-y-7">
                    <div>
                      <label className="mb-4 block text-[13px] font-bold uppercase tracking-[0.36em] text-white/60">
                        YouTube URL
                      </label>
                      <Input
                        ref={inputRef}
                        placeholder="https://youtu.be/..."
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          setError('');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleLoadContent()}
                        className="h-24 rounded-[30px] border px-7 text-lg font-semibold tracking-[-0.01em] text-white placeholder:text-white/25 md:h-28 md:text-xl"
                        style={{
                          background: 'rgba(0,0,0,0.28)',
                          borderColor: url.length > 0 ? 'rgba(255,179,67,0.38)' : 'rgba(255,255,255,0.12)',
                          boxShadow: url.length > 0 ? '0 0 0 6px rgba(255,179,67,0.08), inset 0 0 0 1px rgba(255,255,255,0.02)' : 'inset 0 0 0 1px rgba(255,255,255,0.02)',
                        }}
                      />
                    </div>

                    <motion.div
                      className="rounded-[26px] border p-5"
                      style={{
                        borderColor: 'rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                      animate={{
                        opacity: url.length > 0 ? 1 : 0.72,
                        y: url.length > 0 ? [0, -2, 0] : 0,
                      }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className="flex items-center justify-between gap-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-white/38">
                        <span>Paste Detection</span>
                        <span>{url.length > 0 ? 'Link Captured' : 'Waiting'}</span>
                      </div>
                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/6">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #ffb343, #ff8b1f)',
                          }}
                          animate={{ width: url.length > 0 ? '100%' : ctaActivated ? '40%' : '18%' }}
                          transition={{ duration: url.length > 0 ? 0.45 : 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>

                    {error && (
                      <div
                        className="flex items-start gap-3 rounded-2xl border px-4 py-4"
                        style={{
                          borderColor: 'rgba(255,138,101,0.22)',
                          background: 'rgba(120,32,8,0.16)',
                        }}
                      >
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ffb343]" />
                        <p className="text-sm leading-6 text-[#ffd7a6]">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={handleLoadContent}
                      disabled={isProcessing}
                      className="inline-flex h-16 w-full items-center justify-center gap-3 rounded-[26px] text-sm font-bold uppercase tracking-[0.24em] text-black transition hover:scale-[1.01] disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(180deg, #ffbf5f, #ff9820)',
                        boxShadow: '0 20px 32px rgba(255,152,32,0.2)',
                      }}
                    >
                      {isProcessing ? 'AI Engine Processing...' : 'Analyse Video'}
                      {!isProcessing && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="mt-14 rounded-[30px] bg-white/[0.02] border border-white/5 p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center">
                      ScribliX Neural Engine v4.0 Active • AI Synthesis Online
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
