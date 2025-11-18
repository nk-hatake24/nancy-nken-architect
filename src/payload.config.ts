// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
// import { cloudinaryStorage } from 'payload-cloudinary';

import { s3Storage } from '@payloadcms/storage-s3'
import { Projects } from './collections/Project'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const FRONTEND_URL = process.env.PAYLOAD_PUBLIC_FRONTEND_URL

const emailAdapter = nodemailerAdapter({
  defaultFromAddress: process.env.DEFAULT_ADDRESS || '',
  defaultFromName: 'nancynken',
  // Nodemailer transportOptions
  transportOptions: {
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
})

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },

    user: Users.slug,
    livePreview: {
      url: ({ data, collectionConfig }) => {
        // Assure-toi que le frontend URL est défini, sinon utilise une URL locale
        const baseUrl = FRONTEND_URL || 'http://localhost:3000'

        // Gère le slug de la page d'accueil et des autres pages
        const slug = data.slug === 'home' ? '' : data.slug

        // Construit l'URL finale
        return `${baseUrl}/${slug}`
      },
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users, Projects],
  cors: [
    FRONTEND_URL,
    'http://localhost:3000', // Garde localhost pour le dev
  ].filter((url): url is string => typeof url === 'string'),
  csrf: [
    FRONTEND_URL,
    'http://localhost:3000', // Garde localhost pour le dev
  ].filter((url): url is string => typeof url === 'string'),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // cloudinaryStorage({
    //   config: {
    //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? (() => { throw new Error('CLOUDINARY_CLOUD_NAME is not defined'); })(),
    //     api_key: process.env.CLOUDINARY_API_KEY ?? (() => { throw new Error('CLOUDINARY_API_KEY is not defined'); })(),
    //     api_secret: process.env.CLOUDINARY_API_SECRET ?? (() => { throw new Error('CLOUDINARY_API_SECRET is not defined'); })()
    //   },
    //   collections: {
    //     'media': true, // Enable for media collection
    //     // Add more collections as needed
    //   },
    //   folder: 'payload-media', // Optional, defaults to 'payload-media'
    // })

    //
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  email: emailAdapter,
})
