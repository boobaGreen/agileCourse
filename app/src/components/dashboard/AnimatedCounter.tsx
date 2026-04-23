import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 })
  const displayValue = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{displayValue}</motion.span>
}
