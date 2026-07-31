import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for managing a timer
 */
export function useTimer(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive])

  const toggle = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const stop = useCallback(() => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  const reset = useCallback(() => {
    setIsActive(false)
    setSeconds(initialSeconds)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [initialSeconds])

  return {
    seconds,
    isActive,
    toggle,
    stop,
    reset,
    setSeconds,
  }
}
