'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './LoadingScreen'

export const LayoutInitializer = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simule un temps de chargement de 2.5 secondes.
    // Vous pouvez ajuster cette durée.
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    // Nettoyer le timer si le composant est démonté prématurément
    return () => clearTimeout(timer)
  }, []) // Le tableau vide [] assure que cet effet ne s'exécute qu'une seule fois.

  return (
    <>
      <AnimatePresence>
        {/* Si isLoading est true, le LoadingScreen est affiché */}
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* 
        Le contenu réel de la page (children) est toujours présent dans le DOM,
        mais il est caché sous le LoadingScreen. 
        Pour une expérience optimale, on pourrait le cacher jusqu'à la fin du chargement.
        Cependant, pour commencer, cette approche est la plus simple et la plus efficace.
      */}
      {children}
    </>
  )
}
