import { useEffect, useState } from 'react'

type ViewportSize = {
  width: number
  height: number
}

const fallbackSize: ViewportSize = {
  width: 1200,
  height: 800,
}

function getViewportSize(): ViewportSize {
  if (typeof window === 'undefined') {
    return fallbackSize
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() => getViewportSize())

  useEffect(() => {
    const handleResize = () => {
      setSize(getViewportSize())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
