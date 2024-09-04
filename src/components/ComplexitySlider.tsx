import React from 'react'

import { Slider } from './ui/Slider'

interface ComplexitySliderProps {
  complexity: number
  setComplexity: (value: number) => void
  mazeSize: number
}

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
