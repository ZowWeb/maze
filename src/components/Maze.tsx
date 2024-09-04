import React from 'react'
import { useMaze } from '../hooks/useMaze'
import { MazeGrid } from './MazeGrid'
import { ComplexitySlider } from './ComplexitySlider'

const Maze: React.FC = () => {
  const {
    maze,
    path,
    solved,
    complexity,
    setComplexity,
    handleCellClick,
    initializeMaze,
    solveMaze,
  } = useMaze()

  return (
    <div className="flex flex-col items-center gap-5">
      <ComplexitySlider
        complexity={complexity}
        setComplexity={setComplexity}
        mazeSize={maze.length}
      />
      <MazeGrid maze={maze} path={path} handleCellClick={handleCellClick} />
      {solved && (
        <div className="text-lg font-bold text-green-600 dark:text-green-400">
          Congratulations! You've solved the maze!
        </div>
      )}
      <div className="flex gap-4">
        <button
          className="px-5 py-2 text-base bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
          onClick={initializeMaze}
        >
          Reset Maze
        </button>
        <button
          className="px-5 py-2 text-base bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          onClick={solveMaze}
        >
          Solve Maze
        </button>
      </div>
    </div>
  )
}

export default Maze
