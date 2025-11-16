"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue = 0,
  min = 0,
  max = 100,
  resetKey,
  onLock,
  ...props
}) {
  const normalizedDefault = React.useMemo(
    () => (Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
    [defaultValue]
  )

  const [value, setValue] = React.useState(normalizedDefault)
  const [locked, setLocked] = React.useState(false)
  const [justLocked, setJustLocked] = React.useState(false)

  React.useEffect(() => {
    setValue(normalizedDefault)
    setLocked(false)
    setJustLocked(false)
  }, [resetKey, normalizedDefault])

  const handleValueChange = React.useCallback(
    (val) => {
      if (!locked) setValue(val)
    },
    [locked]
  )

  const handleValueCommit = React.useCallback(
    (val) => {
      if (locked) return
      setLocked(true)
      setJustLocked(true)
      if (onLock) onLock(val)

      // stop the animation class after it plays once
      setTimeout(() => setJustLocked(false), 320)
    },
    [locked, onLock]
  )

  return (
    <SliderPrimitive.Root
      value={value}
      min={min}
      max={max}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      disabled={locked}
      className={cn(
        "relative flex w-full items-center select-none touch-none border-2 border-black rounded-full transition-all",
        locked && "border-[#000000] shadow-md",
        justLocked && "animate-lock-root",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full h-3" // was h-1.5
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full transition-transform transition-colors",
            locked ? "bg-[#1c6548]" : "bg-primary",
            justLocked && "animate-lock-range"
          )}
        />
      </SliderPrimitive.Track>

      {value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "block size-7 rounded-full bg-white border shadow-sm transition-all disabled:opacity-100", 
            // was size-4
            locked && "border-[#113d2c] bg-[#FFF6BF]",
            justLocked && "animate-lock-thumb"
          )}
        />
      ))}

    </SliderPrimitive.Root>
  )
}

export { Slider }
