// app/projects/page.tsx

import React from 'react'
import { ProjectsPageClient } from './page.client'
import type { Project } from '@/payload-types'
//import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// MEILLEURE PRATIQUE : Le Server Component est asynchrone et gère le fetching

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const project = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      mainImage: true,
      description: true,
      year: true,
      type: true,
      meta: true,
      location: true,
    },
  })
  console.log('projects', project)

  return <ProjectsPageClient projects={project.docs as Project[]} />
}
