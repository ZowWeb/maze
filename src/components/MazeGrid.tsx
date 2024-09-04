import React from 'react'

interface MazeGridProps {
  maze: number[][]
  path: boolean[][]
  handleCellClick: (row: number, col: number) => void
}

export const MazeGrid: React.FC<MazeGridProps> = ({
  maze,
  path,
  handleCellClick,
}) => {
  const getCellColor = (cell: number, row: number, col: number) => {
    if (cell === 1) return 'bg-gray-800 dark:bg-gray-200'
    if (cell === 2) return 'bg-green-500 dark:bg-green-400'
    if (cell === 3) return 'bg-red-500 dark:bg-red-400'
    if (path[row][col]) return 'bg-blue-500 dark:bg-blue-400'
    return 'bg-white dark:bg-gray-700'
  }

  const cellSize = `${Math.max(4, Math.floor(320 / maze.length))}px`

  return (
    <div className="relative">
      <div className="absolute -left-16 top-0 text-green-600 dark:text-green-400 font-bold">
        Start
      </div>
      <div className="absolute -right-12 bottom-0 text-red-600 dark:text-red-400 font-bold">
        End
      </div>
      <div className="inline-block border-2 border-gray-800 dark:border-gray-200">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`border border-gray-300 dark:border-gray-600 ${
                  cell !== 1 ? 'cursor-pointer' : ''
                } ${getCellColor(cell, rowIndex, colIndex)}`}
                style={{ width: cellSize, height: cellSize }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
