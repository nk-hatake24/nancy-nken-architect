// app/projects/[slug]/page.tsx

import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Project } from '@/payload-types'
import { ProjectDetailClient } from './page.client'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  return result.docs?.[0] || null
})

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await queryProjectBySlug({ slug: params.slug })

  if (!project) return notFound()

  return <ProjectDetailClient project={project as Project} />
}

// MEILLEURE PRATIQUE : Générer les métadonnées (titre, description) pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // 1. Récupérer le slug depuis les paramètres de l'URL
  const { slug } = params
  if (!slug) {
    // Si aucun slug n'est fourni, retourner des métadonnées par défaut
    return {
      title: 'Projet Inconnu',
    }
  }

  // 2. **LA CORRECTION CLÉ** : Réutiliser votre fonction cachée `queryProjectBySlug`.
  // Next.js va automatiquement dédupliquer cet appel. Si la page a déjà
  // appelé cette fonction avec le même slug, le résultat sera instantané.
  const project = await queryProjectBySlug({ slug })

  // 3. Gérer le cas où le projet n'est pas trouvé
  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: "Ce projet n'existe pas ou n'est plus disponible.",
    }
  }

  // 4. Construire et retourner les métadonnées dynamiques
  return {
    title: project.title || 'Projet', // Fallback au cas où le titre serait vide
    description: project.description,
    // C'est aussi ici que vous pouvez ajouter des métadonnées pour le partage sur les réseaux sociaux
    openGraph: {
      title: project.title,
      description: project.description || '',
      images: [
        {
          // Assurez-vous que `mainImage` est bien populé (depth: 1 ou plus)
          url: (project.mainImage as any)?.url || '',
        },
      ],
    },
  }
}
