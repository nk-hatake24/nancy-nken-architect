// src/blocks/AdvancedProjectsGrid.ts

import { link } from '@/fields/link'
import type { Block } from 'payload'

export const AdvancedProjectsGrid: Block = {
  slug: 'projectsGrid',
  interfaceName: 'ProjectsGridBlock', // Pour les types générés
  labels: {
    singular: 'Grille de Projets',
    plural: 'Grilles de Projets',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre de la section',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'projects',
      label: 'Projets à afficher',
      type: 'relationship',
      relationTo: 'projects', // Assurez-vous que le slug de votre collection de projets est bien 'projects'
      hasMany: true, // Très important : permet de sélectionner plusieurs projets
      required: true,
      minRows: 1,
    },

    {
      name: 'callToAction',
      label: "Bouton d'action (Optionnel)",
      type: 'group',
      fields: [
        // On place votre champ de lien à l'intérieur du groupe
        link({
          appearances: [
            'primary',
            'outline',
            'secondary',
            'link',
            'ghost',
            'destructive',
            'default',
          ],
        }),
      ],
    },
  ],
}
