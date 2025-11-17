// src/heros/ArchitectHero.tsx

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'

// This component will receive the entire 'hero' object from the Page type
export const ArchitectHero: React.FC<Page['hero']> = (props) => {
  // Destructure the fields specific to this hero type
  const { title, tagline, backgroundImage, links } = props

  // Type guard to ensure media is not a string (ID) but a full media object
  const bgImage =
    typeof backgroundImage === 'object' && backgroundImage !== null ? backgroundImage : null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        {bgImage?.url && (
          <Image
            src={bgImage.url}
            alt={bgImage.alt || 'Illustration architecturale'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
        <div className="overlay-dark" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-custom px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-6xl md:text-8xl font-bold mb-6 text-ivoire-brume tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="body-large text-ivoire-brume/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {links?.map(({ link }, i) => {
              // Assuming your linkGroup provides an appearance field
              const isPrimary = link.appearance !== 'secondary'
              return (
                <Button
                  key={i}
                  variant={isPrimary ? 'secondary' : 'outline'}
                  size="lg"
                  asChild
                  className={
                    !isPrimary
                      ? 'bg-transparent border-ivoire-brume text-ivoire-brume hover:bg-ivoire-brume/10'
                      : ''
                  }
                >
                  <Link href={link.url || '#'} className="gap-2">
                    {link.label}
                    {isPrimary && <ArrowRight className="w-5 h-5" />}
                  </Link>
                </Button>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Your scroll indicator can remain here */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-ivoire-brume/50 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-1.5 bg-ivoire-brume rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
