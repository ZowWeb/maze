import React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface ComplexitySliderProps {
  complexity: number
  setComplexity: (value: number) => void
  mazeSize: number
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center ${className}`}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-400" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-slate-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-100 dark:bg-slate-400 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export const ComplexitySlider: React.FC<ComplexitySliderProps> = ({
  complexity,
  setComplexity,
  mazeSize,
}) => (
  <div className="w-64 mb-4">
    <label className="block text-sm font-medium mb-1 text-slate-900 dark:text-slate-100">
      Maze Complexity: {complexity} (Size: {mazeSize}x{mazeSize})
    </label>
    <Slider
      min={1}
      max={10}
      step={1}
      value={[complexity]}
      onValueChange={(value) => setComplexity(value[0])}
      className="w-full"
    />
  </div>
)
