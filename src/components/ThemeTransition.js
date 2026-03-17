'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { consumeThemeTransitionOrigin } from '@/lib/themeTransitionOrigin'

// Motion design: easing that lands softly at the end (Slow In & Slow Out)
const EASE_CIRCLE = 'power2.out' // more frames near the end = gentle settle at origin
const EASE_RING = 'power2.in'    // ring accelerates away, follow-through

// Timing (heartbeat of animation): primary leads, secondary lags (Follow Through)
const DURATION_ANTICIPATION = 0.04  // brief wind-up before main action
const DURATION_CIRCLE = 0.7       // primary wipe
const DURATION_RING = 0.55        // secondary, slightly shorter
const RING_DELAY = 0.06           // overlap: ring starts after circle has begun

/**
 * Full-page theme transition. Motion design:
 * - Anticipation: tiny hold/expand at origin before the wipe.
 * - Staging: one clear idea—circle from click; ring is secondary.
 * - Follow through: ring lags and trails (stagger + overlapping).
 * - Slow in/out: circle eases into the click point; ring eases out of existence.
 */
export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()
  const overlayRef = useRef(null)
  const ringRef = useRef(null)
  const previousThemeRef = useRef(null)
  const hasInitializedRef = useRef(false)
  const animationRef = useRef(null)
  const originRef = useRef({ x: 0, y: 0 })
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

    const coords = typeof window !== 'undefined' ? consumeThemeTransitionOrigin() : null
    originRef.current = coords
      ? { x: coords.x, y: coords.y }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    setOverlayState({ visible: true, fromTheme })
  }, [themeToUse])

  useEffect(() => {
    if (!overlayState.visible || !overlayRef.current) return

    const overlay = overlayRef.current
    const ring = ringRef.current
    const { x: ox, y: oy } = originRef.current
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setOverlayState({ visible: false, fromTheme: null })
      return
    }

    animationRef.current?.kill()

    const w = window.innerWidth
    const h = window.innerHeight
    const radiusStart = Math.sqrt(Math.max(ox * ox + oy * oy, (w - ox) ** 2 + oy * oy, ox * ox + (h - oy) ** 2, (w - ox) ** 2 + (h - oy) ** 2)) + 80
    const radiusAnticipation = radiusStart * 1.015 // subtle wind-up: slight expand before shrink

    gsap.set(overlay, {
      clipPath: `circle(${radiusStart}px at ${ox}px ${oy}px)`,
      opacity: 1,
    })
    if (ring) {
      gsap.set(ring, {
        left: ox,
        top: oy,
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0.65,
        transformOrigin: '50% 50%',
      })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setOverlayState({ visible: false, fromTheme: null })
        animationRef.current = null
      },
    })

    // Anticipation: brief expand so the wipe feels intentional (wind-up before action)
    tl.to(overlay, {
      clipPath: `circle(${radiusAnticipation}px at ${ox}px ${oy}px)`,
      duration: DURATION_ANTICIPATION,
      ease: 'power2.out',
      overwrite: true,
    }, 0)

    // Primary action: circle shrinks to origin with soft landing (slow in/out)
    tl.to(overlay, {
      clipPath: `circle(0px at ${ox}px ${oy}px)`,
      duration: DURATION_CIRCLE,
      ease: EASE_CIRCLE,
      overwrite: true,
    }, DURATION_ANTICIPATION)

    // Secondary action: ring follows and trails (overlapping, stagger)
    if (ring) {
      tl.to(ring, {
        scale: 2.4,
        opacity: 0,
        duration: DURATION_RING,
        ease: EASE_RING,
      }, DURATION_ANTICIPATION + RING_DELAY)
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
  const ringColor = isFromDark ? 'rgba(34, 211, 238, 0.5)' : 'rgba(6, 182, 212, 0.45)'
  const { x: ox, y: oy } = originRef.current

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: bg,
        clipPath: `circle(150vmax at ${ox}px ${oy}px)`,
      }}
      aria-hidden
    >
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

      <div
        ref={ringRef}
        className="absolute rounded-full border-2 w-[80vmin] h-[80vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ox,
          top: oy,
          borderColor: ringColor,
          boxShadow: `0 0 40px ${ringColor}`,
        }}
      />
    </div>
  )
}
