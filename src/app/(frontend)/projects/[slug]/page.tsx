import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Project } from '@/payload-types'
import { ProjectDetailClient } from './page.client'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Static params for SSG or ISR
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    limit: 1000,
    select: { slug: true },
  })

  return projects.docs.map(({ slug }) => ({ slug }))
}

// Normal Next.js param type
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project) return notFound()

  return <ProjectDetailClient project={project as Project} />
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project)
    return {
      title: 'Projet non trouvé',
      description: "Ce projet n'existe pas.",
    }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description || '',
      images: [{ url: (project.mainImage as any)?.url || '' }],
    },
  }
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return result.docs?.[0] || null
})
