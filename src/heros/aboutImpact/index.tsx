// src/heros/AboutHero.tsx

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'

import type { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText' // Point important !
import Link from 'next/link'
import Image from 'next/image'

// Le composant reçoit l'objet 'hero' complet
export const AboutHero: React.FC<Page['hero']> = (props) => {
  const { mainTitle, subtitle, portraitImage, contentTitle, contentBody, cvFile, links } = props

  // Type Guards pour les uploads
  const image = typeof portraitImage === 'object' ? portraitImage : null
  const cv = typeof cvFile === 'object' ? cvFile : null

  return (
    <section className="pt-32 pb-20 section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-hero text-primary mb-6">{mainTitle}</h1>
          <p className="body-large text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {image?.url && (
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={image.url}
                  alt={image.alt || 'Portrait de Nancy Nkenla'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/20 rounded-lg -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/20 rounded-lg -z-10" />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="heading-section text-primary">{contentTitle}</h2>

            {/* Affichage du contenu Rich Text */}
            {contentBody && (
              <div className="prose dark:prose-invert max-w-none">
                <RichText data={contentBody} enableGutter={false} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Bouton pour le CV */}
              {cv?.url && (
                <Button variant="default" size="lg" asChild>
                  <a href={cv.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                    <Download className="w-5 h-5" />
                    Télécharger mon CV
                  </a>
                </Button>
              )}

              {/* Bouton "Me contacter" depuis le linkGroup */}
              {links && links.length > 0 && links[0].link.url && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={links[0].link.url} className="gap-2">
                    <Mail className="w-5 h-5" />
                    {links[0].link.label}
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
