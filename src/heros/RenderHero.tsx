// Your main renderer file, e.g., src/components/RenderHero.tsx

import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
// ADDED: Import your new hero component
import { ArchitectHero } from '@/heros/BackgroundImpact'
import { AboutHero } from './aboutImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  // ADDED: Map the 'architectHero' type to your new component
  architectHero: ArchitectHero,
  aboutHero: AboutHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // This will now correctly render ArchitectHero when type is 'architectHero'
  return <HeroToRender {...props} />
}
