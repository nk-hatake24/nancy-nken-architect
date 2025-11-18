import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
//import { GeistMono } from 'geist/font/mono'
//import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Montserrat_Alternates } from 'next/font/google'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { LayoutInitializer } from '@/components/LayoutIntializer'
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics'
import { GoogleTagManager } from '@/components/Analytics/GoogleTagManager'

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap', // meilleure performance
  weight: ['400', '500', '600', '700'], // choisis ce dont tu as besoin
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(montserrat.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <GoogleAnalytics />
      </head>
      <body>
        <Providers>
          <GoogleTagManager />
          <LayoutInitializer>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            <Footer />
          </LayoutInitializer>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}
