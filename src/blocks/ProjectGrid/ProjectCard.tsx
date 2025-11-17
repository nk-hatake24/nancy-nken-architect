// src/components/blocks/ProjectCard.tsx

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link' // Correction : Utiliser next/link
import Image from 'next/image' // Correction : Utiliser next/image pour l'optimisation
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/payload-types' // Importer les types générés

interface ProjectCardProps {
  project: Project // On passe l'objet projet complet, c'est plus propre
  index: number
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // On s'assure que l'image est bien un objet et non un simple ID
  const image = typeof project.mainImage === 'object' ? project.mainImage : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg hover-lift"
    >
      {/* Correction : href avec le slug du projet */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || project.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-noir-urbain/90 via-noir-urbain/60 to-transparent" />

          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div>
              <div className="flex items-center gap-3 mb-3 text-vert-sauge text-sm font-medium">
                <span>{project.type}</span>
                <span className="w-1 h-1 bg-vert-sauge rounded-full" />
                <span>{new Date(project.year).getFullYear()}</span>
              </div>

              <h3 className="heading-card text-ivoire-brume mb-2">{project.title}</h3>

              <p className="body-regular text-ivoire-brume/80 mb-4">{project.location}</p>

              <div className="flex items-center gap-2 text-secondary font-medium group-hover:gap-4 transition-all duration-300">
                <span>Voir le projet</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
