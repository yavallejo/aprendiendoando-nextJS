'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Full-page futuristic transition when switching between light and dark theme.
 * Overlay with old theme color animates away (circular reveal + scan line).
 */
export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()
  const overlayRef = useRef(null)
  const ringRef = useRef(null)
  const scanLineRef = useRef(null)
  const previousThemeRef = useRef(null)
  const hasInitializedRef = useRef(false)
  const animationRef = useRef(null)
  const [overlayState, setOverlayState] = useState({
    visible: false,
    fromTheme: null,
  })

  const themeToUse = resolvedTheme ?? theme

  useEffect(() => {
    if (!themeToUse) return

    if (!hasInitializedRef.current) {
      previousThemeRef.current = themeToUse
      hasInitializedRef.current = true
      return
    }

    if (previousThemeRef.current === themeToUse) return

    const fromTheme = previousThemeRef.current
    previousThemeRef.current = themeToUse

    setOverlayState({ visible: true, fromTheme })
  }, [themeToUse])

  useEffect(() => {
    if (!overlayState.visible || !overlayRef.current) return

    const overlay = overlayRef.current
    const ring = ringRef.current
    const scanLine = scanLineRef.current
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setOverlayState({ visible: false, fromTheme: null })
      return
    }

    animationRef.current?.kill()

    const vmax = Math.max(window.innerWidth, window.innerHeight) / 100
    const radiusStart = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) + 100

    gsap.set(overlay, {
      clipPath: `circle(${radiusStart}px at 50% 50%)`,
      opacity: 1,
    })
    if (ring) {
      gsap.set(ring, { scale: 0, opacity: 0.9, transformOrigin: '50% 50%' })
    }
    if (scanLine) {
      gsap.set(scanLine, { yPercent: -120 })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setOverlayState({ visible: false, fromTheme: null })
        animationRef.current = null
      },
    })

    tl.to(overlay, {
      clipPath: 'circle(0px at 50% 50%)',
      duration: 1,
      ease: 'power2.in',
      overwrite: true,
    }, 0)

    if (ring) {
      tl.to(ring, {
        scale: 3,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.in',
      }, 0)
    }

    if (scanLine) {
      tl.to(scanLine, {
        yPercent: 120,
        duration: 0.55,
        ease: 'none',
      }, 0.05)
    }

    animationRef.current = tl

    return () => {
      tl.kill()
    }
  }, [overlayState.visible, overlayState.fromTheme])

  if (!overlayState.visible || !overlayState.fromTheme) return null

  const isFromDark = overlayState.fromTheme === 'dark'
  const bg = isFromDark ? '#000' : '#fafafa'
  const gridColor = isFromDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'
  const ringColor = isFromDark ? 'rgba(34, 211, 238, 0.6)' : 'rgba(6, 182, 212, 0.5)'
  const scanColor = isFromDark ? 'rgba(34, 211, 238, 0.15)' : 'rgba(6, 182, 212, 0.2)'

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: bg,
        clipPath: 'circle(150vmax at 50% 50%)',
      }}
      aria-hidden
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Expanding ring - centered, transforms from center */}
      <div
        ref={ringRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          width: '80vmin',
          height: '80vmin',
          borderColor: ringColor,
          boxShadow: `0 0 60px ${ringColor}`,
        }}
      />

      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 right-0 h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${scanColor} 20%, ${scanColor} 80%, transparent 100%)`,
          boxShadow: `0 0 20px ${scanColor}`,
        }}
      />
    </div>
  )
}
