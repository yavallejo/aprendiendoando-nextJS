'use client'

import { useSmoothScroll, useScrollAnimations } from '@/lib/gsap-config'

export function GSAPProvider({ children }) {
  useSmoothScroll()
  useScrollAnimations()

  return <>{children}</>
}
