// src/blocks/Values/index.tsx

'use client' // Le block entier a besoin de JS pour les animations

import React from 'react'
import { motion } from 'framer-motion'
import type { Page } from '@/payload-types'

// Extraire le type de notre block spécifique depuis le type Page généré
type ValuesBlockPropsBase = Extract<Page['layout'][0], { blockType: 'values' }>

type ValuesBlockProps = ValuesBlockPropsBase & {
  values?: {
    id: string
    valueTitle?: string
    valueDescription?: string
  }[]
}

export const ValuesBlock: React.FC<ValuesBlockProps> = ({
  backgroundColor,
  title,
  description,
  values,
}) => {
  // On détermine la classe de fond en fonction du choix dans Payload
  const bgColorClass = backgroundColor === 'stone' ? 'bg-gris-pierre/30' : 'bg-transparent'

  return (
    <section className={`section-padding ${bgColorClass}`}>
      <div className="container-custom">
        {/* En-tête de la section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="heading-section text-primary mb-4">{title}</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Grille des valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values?.map((value, index) => (
            <motion.div
              key={value.id} // Utiliser l'ID fourni par Payload, c'est plus robuste
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg shadow-lg hover-lift"
            >
              <h3 className="heading-card text-primary mb-4">{value.valueTitle}</h3>
              <p className="body-regular text-muted-foreground">{value.valueDescription}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
