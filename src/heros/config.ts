// src/fields/hero.ts or wherever your hero field is defined

import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        // ADDED: Your new custom hero type
        {
          label: 'Architect Hero',
          value: 'architectHero',
        },
        {
          label: 'About Hero',
          value: 'aboutHero',
        },
      ],
      required: true,
    },

    // --- Fields for Standard Hero Types ---
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      // MODIFIED: Hide this field if our new hero is selected
      admin: {
        condition: (_, { type } = {}) => type !== 'architectHero',
      },
    },

    // --- Fields for Architect Hero Type ---
    {
      name: 'title',
      label: 'Titre principal',
      type: 'text',
      // ADDED: Only show this field for the Architect Hero
      admin: {
        condition: (_, { type } = {}) => type === 'architectHero',
      },
    },
    {
      name: 'tagline',
      label: 'Slogan / Sous-titre',
      type: 'textarea',
      // ADDED: Only show this field for the Architect Hero
      admin: {
        condition: (_, { type } = {}) => type === 'architectHero',
      },
    },

    // --- Common Fields ---
    linkGroup({
      overrides: {
        maxRows: 2,
      },
      appearances: ['primary', 'outline', 'secondary', 'link', 'ghost', 'destructive', 'default'],
    }),
    {
      name: 'media',
      label: 'Media (Pour High/Medium Impact)',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    // ADDED: A specific media field for your new hero's background
    {
      name: 'backgroundImage',
      label: 'Image de fond (Pour Architect Hero)',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type }) => type === 'architectHero',
      },
    },
    {
      name: 'mainTitle',
      label: 'Titre principal (Ex: À propos de moi)',
      type: 'text',
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
    {
      name: 'subtitle',
      label: 'Sous-titre',
      type: 'textarea',
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
    {
      name: 'portraitImage',
      label: 'Image portrait',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
    {
      name: 'contentTitle',
      label: 'Titre du contenu (Ex: Nancy Nkenla)',
      type: 'text',
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
    {
      name: 'contentBody',
      label: 'Corps du contenu',
      type: 'richText', // Un RichText est plus flexible pour les paragraphes
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
    // Le `linkGroup` existant sera utilisé pour les boutons (ex: "Me contacter")
    // Il apparaîtra automatiquement si on ne lui met pas de condition restrictive

    // AJOUTÉ : Un champ pour le fichier CV
    {
      name: 'cvFile',
      label: 'Fichier CV (PDF)',
      type: 'upload',
      relationTo: 'media', // Assurez-vous que votre collection 'media' accepte les PDFs
      admin: {
        condition: (_, { type }) => type === 'aboutHero',
      },
    },
  ],
  label: false,
}
