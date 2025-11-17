// src/app/(frontend)/contact/page.tsx

// Ce fichier est maintenant un pur Server Component.
// Il ne s'occupe que des données.

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Form as FormFromPayload } from '@/payload-types'
import type { Form as FormForBuilder } from '@payloadcms/plugin-form-builder/types'

// On importe notre nouveau composant client !
import { ContactView } from './Component.client'

// La fonction de récupération de données ne change pas.
async function getContactForm(slug: string): Promise<FormFromPayload | null> {
  const payload = await getPayloadHMR({ config })
  try {
    const formResult = await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: slug,
        },
      },
      depth: 1,
    })
    return formResult.docs?.[0] || null
  } catch (error) {
    console.error(`Erreur lors de la récupération du formulaire "${slug}":`, error)
    return null
  }
}

// Le composant de page, maintenant très simple.
const ContactPage = async () => {
  const formFromDb = await getContactForm('Contact Form')

  if (!formFromDb) {
    return notFound()
  }

  const normalizedForm = {
    ...formFromDb,
    confirmationType: formFromDb.confirmationType || 'message',
    emails: formFromDb.emails || [],
  }
  const formForComponent = normalizedForm as FormForBuilder

  // On retourne simplement le composant client en lui passant les données.
  return <ContactView form={formForComponent} />
}

export default ContactPage

// ...use `lang` safely here...
