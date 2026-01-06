'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Loader2, CheckCircle2, AlertCircle, Shield, Zap, Sparkles } from 'lucide-react'
import { useState, useRef, FormEvent } from 'react'
import { Navbar } from '@/components/Navbar'
import { Background } from '@/components/Background'
import { CliDemo } from '@/components/CliDemo'

const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const typingEffect = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 1.2
    }
  }
}

const typingChar = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, ease: "easeOut" as const }
  }
}

// Letter animation for headline
const letterAnimation = {
  initial: { opacity: 0, y: 50, rotateX: -90 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.03,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
}

// Shimmer animation for gradient text
const shimmer = {
  animate: {
    backgroundPosition: ['200% 50%', '-200% 50%'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear" as const
    }
  }
}

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)

  const headlineText1 = "Deploy faster"
  const headlineText2 = "with"

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully joined the waitlist!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to connect. Please try again.')
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden bg-[#000103] selection:bg-emerald-500 selection:text-black font-sans antialiased flex flex-col">
      <Background />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="inline-flex mt-[50px] items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold tracking-[0.15em] uppercase text-emerald-400 mb-8 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:border-emerald-500/40 transition-colors cursor-pointer group backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles size={12} className="text-emerald-400" />
          </motion.div>
          Early Access Open
          <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* Headline with letter animation */}
        <div className="mb-6 perspective-[1000px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-white font-sans">
            {/* First line - letter by letter */}
            <span className="block overflow-hidden">
              {headlineText1.split("").map((char, i) => (
                <motion.span
                  key={`h1-${i}`}
                  custom={i}
                  variants={letterAnimation}
                  initial="initial"
                  animate="animate"
                  className="inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>

            {/* Second line - gradient with shimmer */}
            <span className="relative inline-block mt-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute -inset-4 bg-emerald-500/25 blur-[60px] rounded-full"
              />
              <motion.span
                variants={shimmer}
                animate="animate"
                className="relative inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #fff 0%, #34d399 25%, #fff 50%, #34d399 75%, #fff 100%)',
                  backgroundSize: '400% 100%',
                }}
              >
                {headlineText2.split("").map((char, i) => (
                  <motion.span
                    key={`h2-${i}`}
                    custom={i + headlineText1.length}
                    variants={letterAnimation}
                    initial="initial"
                    animate="animate"
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>

              {/* Logo Image */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{
                  delay: (headlineText1.length + headlineText2.length) * 0.03 + 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] as const
                }}
                className="inline-block ml-3 align-middle relative -top-1"
              >
                <img
                  src="/schemerr-logo2.png"
                  alt="Schemerr"
                  className="h-16 w-auto object-contain"
                />
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Subtext with typing effect */}
        <motion.p
          variants={typingEffect}
          initial="initial"
          animate="animate"
          className="text-base md:text-lg text-slate-400 mb-[-20px] max-w-xl leading-relaxed"
        >
          {"The ultimate AI-assisted deployment tool for high-performance teams. ".split(" ").map((word, wordIndex, arr) => (
            <span key={`w1-${wordIndex}`} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span key={`t1-${wordIndex}-${charIndex}`} variants={typingChar} className="inline-block">
                  {char}
                </motion.span>
              ))}
              {wordIndex < arr.length - 1 && <motion.span variants={typingChar} className="inline-block">&nbsp;</motion.span>}
            </span>
          ))}
          {"One configuration,".split(" ").map((word, wordIndex, arr) => (
            <span key={`w2-${wordIndex}`} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span key={`t2-${wordIndex}-${charIndex}`} variants={typingChar} className="inline-block text-white font-medium">
                  {char}
                </motion.span>
              ))}
              {wordIndex < arr.length - 1 && <motion.span variants={typingChar} className="inline-block text-white font-medium">&nbsp;</motion.span>}
            </span>
          ))}
          <motion.span variants={typingChar} className="inline-block">&nbsp;</motion.span>
          {"one command and one dashboard.".split(" ").map((word, wordIndex, arr) => (
            <span key={`w3-${wordIndex}`} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span key={`t3-${wordIndex}-${charIndex}`} variants={typingChar} className="inline-block">
                  {char}
                </motion.span>
              ))}
              {wordIndex < arr.length - 1 && <motion.span variants={typingChar} className="inline-block">&nbsp;</motion.span>}
            </span>
          ))}
        </motion.p>

        {/* CLI Demo */}
        <CliDemo />
        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full mt-[40px] max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative group/form">
            {/* Form Outer Glow */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 rounded-2xl blur-xl group-hover/form:opacity-50"
            />

            <div className="relative flex flex-col sm:flex-row gap-2 p-1.5 bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Animated border shimmer */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              />

              <div className="flex-1 flex items-center px-4 py-2">
                {/* <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Zap size={18} className="text-emerald-500/60 mr-3 shrink-0" />
                </motion.div> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-sm font-medium outline-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-emerald-500 text-black font-bold text-sm rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {/* Button shine effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Joining...</>
                ) : (
                  <>
                    Get Early Access
                    <ChevronRight size={14} />
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border backdrop-blur-sm ${status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                >
                  {status === 'success' ? <CheckCircle2 size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Waitlist Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.4, ease: "backOut" }}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-[#000103] flex items-center justify-center text-[9px] font-bold text-black"
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xs text-slate-400"
            >
              <motion.span
                className="text-white font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                2,847+
              </motion.span>{" "}
              developers waiting
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="text-[10px] text-slate-500 mt-5 font-medium tracking-wide uppercase flex items-center justify-center gap-2"
          >
            <Shield size={12} className="text-emerald-500/50" />
            No spam. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}