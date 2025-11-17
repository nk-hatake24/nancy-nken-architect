// src/blocks/ProjectsGrid/index.tsx

import React from 'react'
import type { ProjectsGridBlock } from '@/payload-types' // Importer le type généré pour le block
import { ProjectCard } from '@/blocks/ProjectGrid/ProjectCard' // Importer la carte
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = ProjectsGridBlock

export const ProjectsGrid: React.FC<Props> = ({ title, description, projects, callToAction }) => {
  const linkData = callToAction?.link

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Titre et description optionnels */}
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16">
            {title && <h2 className="heading-section text-primary mb-4">{title}</h2>}
            {description && (
              <p className="body-large text-muted-foreground max-w-3xl mx-auto">{description}</p>
            )}
          </div>
        )}

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            // On vérifie que 'project' est bien un objet complet et non un ID
            if (typeof project === 'object' && project !== null) {
              return <ProjectCard key={project.id} project={project} index={index} />
            }
            return null // Si le projet n'est pas populé, on ne l'affiche pas
          })}
        </div>

        {/* On affiche le bouton uniquement si un label et une URL sont définis */}
        {linkData && linkData.label && linkData.url && (
          <div className="mt-12 md:mt-16 text-center">
            <Button
              // On mappe l'apparence de Payload à la variante du bouton
              variant={linkData.appearance || 'default'}
              size="lg"
              asChild // Permet au bouton de se comporter comme le Link à l'intérieur
            >
              <Link href={linkData.url}>{linkData.label}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
