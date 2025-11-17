import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

//import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-stone-800 dark:bg-card text-stone-300">
      <div className="container pt-8 gap-4 w-full flex flex-col justify-center items-center">
        <Link href="/" className="group">
          <span className="text-3xl font-bold tracking-[-5px] text-stone-300">NN</span>
        </Link>

        <p className="text-stone-300/60">Architecture moderne avec une identité africaine</p>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-stone-300" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-muted-foreground mt-4 py-4 text-center text-sm text-stone-300/80">
        <p>
          © {new Date().getFullYear()} Mitcode. All rights reserved. <br />
          Made with ❤️ by <span className=" font-semibold">Mitcode</span>.
        </p>
      </div>
    </footer>
  )
}
