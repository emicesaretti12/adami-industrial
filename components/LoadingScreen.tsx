'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#080C14] flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#2B6CB0]/50" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#2B6CB0]/50" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#2B6CB0]/50" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#2B6CB0]/50" />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 bg-[#2B6CB0] flex items-center justify-center mb-6"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(43, 108, 176, 0.3)',
                  '0 0 60px rgba(43, 108, 176, 0.8)',
                  '0 0 20px rgba(43, 108, 176, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-['Barlow_Condensed'] font-black text-3xl">A</span>
            </motion.div>

            <div className="font-['Barlow_Condensed'] font-black text-4xl tracking-[0.2em] text-white mb-1">
              ADAMI
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] tracking-[0.4em] text-[#2B6CB0] uppercase mb-12">
              Industrial
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-[#2B6CB0]/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#2B6CB0]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="font-['JetBrains_Mono'] text-[10px] text-[#8B9AB0] mt-3">
              {Math.min(Math.floor(progress), 100)}%
            </div>
          </motion.div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2B6CB0]/40 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
