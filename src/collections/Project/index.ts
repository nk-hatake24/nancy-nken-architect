// src/collections/Projects.ts

import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'location'],
  },
  access: {
    read: () => true, // Rendre les projets publiquement accessibles
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du projet',
      type: 'text',
      required: true,
    },
    // Le slug sera généré automatiquement à partir du titre
    slugField(),
    {
      name: 'year',
      label: 'Année',
      type: 'date',
      required: true,
    },
    {
      name: 'location',
      label: 'Lieu',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Type de projet (Ex: Résidentiel)',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description courte (pour la liste)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'mainImage',
      label: 'Image principale',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Contenu pour la page de détail
    {
      label: 'Contenu détaillé du projet',
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              name: 'features',
              label: 'Caractéristiques principales',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'details',
              label: 'Détails techniques',
              type: 'group',
              fields: [
                { name: 'client', type: 'text' },
                { name: 'surface', type: 'text' },
                { name: 'duration', label: 'Durée', type: 'text' },
                { name: 'status', label: 'Statut', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Galerie',
          fields: [
            {
              name: 'gallery',
              label: 'Images de la galerie',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
