'use client'

import { useState, useEffect } from 'react'

export default function useViewport() {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWindowResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }

      window.addEventListener('resize', handleWindowResize)
      return () => window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  return { width, height }
}
