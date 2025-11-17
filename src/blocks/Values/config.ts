// src/blocks/Values.ts

import type { Block } from 'payload'

export const Values: Block = {
  slug: 'values',
  interfaceName: 'ValuesBlock', // Nom du type pour TypeScript
  labels: {
    singular: 'Bloc Valeurs',
    plural: 'Blocs Valeurs',
  },
  fields: [
    {
      name: 'backgroundColor',
      label: 'Couleur de fond',
      type: 'select',
      options: [
        { label: 'Défaut (Transparent)', value: 'default' },
        { label: 'Gris Pierre', value: 'stone' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'title',
      label: 'Titre de la section (Ex: Mes Valeurs)',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description de la section',
      type: 'textarea',
    },
    {
      name: 'values',
      label: 'Liste des valeurs',
      type: 'array', // Le champ clé pour les éléments répétables
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [
        // Les champs pour CHAQUE carte de valeur
        {
          name: 'valueTitle',
          label: 'Titre de la valeur (Ex: Innovation)',
          type: 'text',
          required: true,
        },
        {
          name: 'valueDescription',
          label: 'Description de la valeur',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
