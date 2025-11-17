'use client'

import { motion } from 'framer-motion'

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
      className="fixed inset-0 z-50 bg-background flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center flex gap-4 flex-col"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-tighter"
          initial={{ letterSpacing: '0.5em', opacity: 0 }}
          animate={{ letterSpacing: '0.05em', opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Nancy Nkenla
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-5xl font-semibold tracking-tight"
          initial={{ letterSpacing: '0.5em', opacity: 0 }}
          animate={{ letterSpacing: '0.05em', opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Architecte
        </motion.h2>
        <motion.h2
          className="text-xl md:text-2xl tracking-wide"
          initial={{ letterSpacing: '0.5em', opacity: 0 }}
          animate={{ letterSpacing: '0.05em', opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Onac 480
        </motion.h2>
      </motion.div>
    </motion.div>
  )
}
