// app/projects/[slug]/ProjectDetail.client.tsx

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link' // Correction
import Image from 'next/image' // Correction
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, MapPin, User, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Project } from '@/payload-types'

export const ProjectDetailClient = ({ project }: { project: Project }) => {
  // Plus besoin de useParams ou Navigate, Next.js gère tout
  const mainImage = project.mainImage as any

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage.url})` }}
          />
          <div className="overlay-dark" />
        </motion.div>

        <div className="relative z-10 container-custom px-6 md:px-12 ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-6 text-ivoire-brume hover:text-secondary hover:bg-transparent"
            >
              <Link href="/projects" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour aux projets
              </Link>
            </Button>

            <div className="flex items-center gap-4 mb-4 text-vert-sauge text-sm md:text-base font-medium">
              <span>{project.type}</span>
              <span className="w-1.5 h-1.5 bg-vert-sauge rounded-full" />
              <span>{new Date(project.year).getFullYear()}</span>
            </div>

            <h1 className="heading-display text-ivoire-brume mb-4">{project.title}</h1>

            <p className="body-large text-ivoire-brume/80 max-w-2xl">{project.location}</p>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="heading-section text-primary mb-6">À propos du projet</h2>
                  <p className="body-large text-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="heading-card text-primary mb-4">Caractéristiques principales</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span className="body-regular text-muted-foreground">{item.feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card p-8 rounded-lg shadow-lg sticky top-28"
              >
                <h3 className="heading-card text-primary mb-6">Détails</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Client</p>
                      <p className="body-regular text-foreground">{project.details?.client}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Square className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Surface</p>
                      <p className="body-regular text-foreground">{project.details?.surface}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Durée</p>
                      <p className="body-regular text-foreground">{project.details?.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Statut</p>
                      <p className="body-regular text-foreground">{project.details?.status}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-gris-pierre/30">
        <div className="container-custom">
          {/* ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery?.map((item, index) => {
              const galleryImage = item.image as any
              return (
                <motion.div key={item.id} /* ... */>
                  <Image
                    src={galleryImage.url}
                    alt={galleryImage.alt || `${project.title} - Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
