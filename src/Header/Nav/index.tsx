'use client'

import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

import { motion } from 'framer-motion'

export const HeaderNav: React.FC<{
  data: HeaderType
  onClickLink?: () => void
}> = ({ data, onClickLink }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      {navItems.map(({ link }, i) => {
        const isActive = link?.url === pathname

        return (
          <div
            key={i}
            className="relative group cursor-pointer"
            onClick={onClickLink} // ferme menu mobile
          >
            {/* CMSLink sans onClick */}
            <CMSLink
              {...link}
              appearance="link"
              className={`font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            />

            {/* Underline animée */}
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
