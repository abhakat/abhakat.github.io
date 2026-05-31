import { useEffect, useRef } from 'react'
import { useViewportSize } from '../hooks/useViewportSize'

type Cloud = {
  x: number
  y: number
  speed: number
  scale: number
  alpha: number
}

type Signal = {
  x: number
  y: number
  length: number
  speed: number
  color: string
}

const CLOUD_SPRITE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAOCAQAAAD6HOaKAAAAU0lEQVR4XrWSsQkAQAgD3X9El/ELixQpJHCfdApnUCtXz7o49sgagaGPaq4rIwAP9s/C7R7UX3inJ0BDb6qWDC7ScOR/QWjRlFizuPwLtTLj+qkH6DjD2wLtikUAAAAASUVORK5CYII='

const signalColors = ['#2f6fed', '#1c9f88', '#f05d3f']

function createClouds(width: number, height: number): Cloud[] {
  const count = Math.max(7, Math.round(width / 170))

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: 34 + Math.random() * Math.max(140, height * 0.42),
    speed: 8 + Math.random() * 16,
    scale: 1.2 + Math.random() * 1.8,
    alpha: 0.12 + Math.random() * 0.18,
  }))
}

function createSignals(width: number, height: number): Signal[] {
  return signalColors.map((color, index) => ({
    x: Math.random() * width,
    y: height * (0.2 + index * 0.18),
    length: 80 + Math.random() * 120,
    speed: 18 + index * 8,
    color,
  }))
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { width, height } = useViewportSize()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(width * devicePixelRatio)
    canvas.height = Math.floor(height * devicePixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cloudImage = new Image()
    const clouds = createClouds(width, height)
    const signals = createSignals(width, height)
    let animationFrame = 0
    let previousTime = performance.now()

    cloudImage.src = CLOUD_SPRITE

    const drawGrid = () => {
      context.strokeStyle = 'rgba(18, 22, 28, 0.06)'
      context.lineWidth = 1

      for (let y = 72; y < height; y += 86) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }
    }

    const drawSignals = () => {
      signals.forEach((signal) => {
        context.save()
        context.globalAlpha = 0.45
        context.strokeStyle = signal.color
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(signal.x, signal.y)
        context.lineTo(signal.x + signal.length, signal.y)
        context.stroke()
        context.restore()
      })
    }

    const drawClouds = () => {
      clouds.forEach((cloud) => {
        context.save()
        context.globalAlpha = cloud.alpha
        context.filter = 'grayscale(1) contrast(1.3)'
        context.drawImage(cloudImage, cloud.x, cloud.y, 46 * cloud.scale, 14 * cloud.scale)
        context.restore()
      })
    }

    const update = (deltaSeconds: number) => {
      clouds.forEach((cloud) => {
        cloud.x -= cloud.speed * deltaSeconds

        if (cloud.x < -120) {
          cloud.x = width + Math.random() * 140
          cloud.y = 34 + Math.random() * Math.max(140, height * 0.42)
        }
      })

      signals.forEach((signal) => {
        signal.x += signal.speed * deltaSeconds

        if (signal.x > width + 40) {
          signal.x = -signal.length - 40
        }
      })
    }

    const render = (time: number) => {
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.08)
      previousTime = time

      if (!prefersReducedMotion) {
        update(deltaSeconds)
      }

      context.clearRect(0, 0, width, height)
      drawGrid()
      drawSignals()
      drawClouds()

      animationFrame = window.requestAnimationFrame(render)
    }

    cloudImage.onload = () => {
      render(performance.now())
    }

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [height, width])

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
}
