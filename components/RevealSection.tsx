'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  once?: boolean
}

export default function RevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}
