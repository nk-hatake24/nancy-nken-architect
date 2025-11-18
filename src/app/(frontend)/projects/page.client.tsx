// app/projects/ProjectsPage.client.tsx

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/payload-types'

// Le composant reçoit les projets en props
export const ProjectsPageClient = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-hero text-primary mb-6">Mes Projets</h1>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto">
              Une collection de réalisations architecturales qui célèbrent l&apos;identité africaine
              et l&apos;innovation moderne
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="">
        {projects.map((project, index) => {
          const mainImage = project.mainImage as any // Adapter le typage si nécessaire

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="min-h-screen relative flex items-center"
            >
              {/* Correction : Utiliser le slug pour l'URL */}
              <Link href={`/projects/${project.slug}`} className="block w-full group">
                {/* Background Image optimisée */}
                <div className="absolute inset-0">
                  {mainImage?.url && (
                    <Image
                      src={mainImage.url}
                      alt={mainImage.alt || project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-700 group-hover:scale-95"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-noir-urbain/90 via-noir-urbain/70 to-noir-urbain/50" />
                </div>
                {/* Contenu dynamique */}
                <div className="relative z-10 container-custom px-6 md:px-12 lg:px-20">
                  {/* Project Number */}
                  <div className="font-display text-6xl md:text-8xl font-bold text-secondary/30 mb-4">
                    0{index + 1}
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-vert-sauge text-sm md:text-base font-medium">
                    <span>{project.type}</span>
                    <span className="w-1.5 h-1.5 bg-vert-sauge rounded-full" />
                    <span>{new Date(project.year).getFullYear()}</span>
                    <span className="w-1.5 h-1.5 bg-vert-sauge rounded-full" />
                    <span>{project.location}</span>
                  </div>
                  {/* ... Le reste de votre JSX, en remplaçant les données statiques par `project.title`, `project.year`, etc. ... */}
                  <h2 className="heading-display text-ivoire-brume mb-3">{project.title}</h2>
                  <p className="body-large text-ivoire-brume/80 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-secondary font-medium text-lg group-hover:gap-5 transition-all duration-300">
                    <span>Découvrir le projet</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </section>
    </div>
  )
}
