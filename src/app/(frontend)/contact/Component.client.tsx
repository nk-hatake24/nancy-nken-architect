// src/components/ContactView.tsx

'use client' // La directive est ici, car ce composant est interactif

import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'
import type { Form as FormForBuilder } from '@payloadcms/plugin-form-builder/types'
import { FormBlockPersonalised } from '@/blocks/Form/ComponentPersonalised'

// On définit les props que ce composant s'attend à recevoir
type ContactViewProps = {
  form: FormForBuilder
}

// On exporte le composant pour pouvoir l'importer ailleurs
export const ContactView = ({ form }: ContactViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-muted-foreground">
            Une question ? Un projet ? N&apos;hésitez pas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Colonne du formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormBlockPersonalised form={form} enableIntro={false} />
          </motion.div>

          {/* Colonne des liens sociaux */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-8">Suivez-nous</h2>
            <div className="space-y-6">
              {/* ... vos liens sociaux ... */}
              <a
                href="https://www.facebook.com/share/17QxsPYKst/?mibextid=wwXIfr "
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium group-hover:translate-x-2 transition-transform">
                  Facebook
                </span>
              </a>
              <a href="https://instagram.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium group-hover:translate-x-2 transition-transform">
                  Instagram
                </span>
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium group-hover:translate-x-2 transition-transform">
                  LinkedIn
                </span>
              </a>
              <a
                href="mailto:creativeartfamille@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium group-hover:translate-x-2 transition-transform">
                  Email
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
