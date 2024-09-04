import { useState, useEffect, useCallback } from 'react'
import { generateMaze } from '../utils/mazeGenerator'

export const useMaze = () => {
  const [maze, setMaze] = useState<number[][]>([])
  const [path, setPath] = useState<boolean[][]>([])
  const [solved, setSolved] = useState(false)
  const [complexity, setComplexity] = useState(5)

  const getMazeSize = useCallback((complexity: number) => {
    return Math.floor(10 + complexity * 2)
  }, [])

  const checkMazeSolvable = useCallback((maze: number[][]): boolean => {
    const size = maze.length
    const visited: boolean[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false))

    const dfs = (x: number, y: number): boolean => {
      if (
        x < 0 ||
        x >= size ||
        y < 0 ||
        y >= size ||
        maze[x][y] === 1 ||
        visited[x][y]
      ) {
        return false
      }
      if (x === size - 1 && y === size - 1) {
        return true
      }
      visited[x][y] = true
      return dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1)
    }

    return dfs(0, 0)
  }, [])

  const initializeMaze = useCallback(() => {
    let newMaze: number[][] = []
    let isSolvable = false
    const mazeSize = getMazeSize(complexity)

    while (!isSolvable) {
      newMaze = generateMaze(mazeSize, complexity)
      newMaze[0][0] = 2 // Set start point
      newMaze[mazeSize - 1][mazeSize - 1] = 3 // Set end point

      isSolvable = checkMazeSolvable(newMaze)
    }

    setMaze(newMaze)
    setPath(
      Array(mazeSize)
        .fill(null)
        .map(() => Array(mazeSize).fill(false)),
    )
    setSolved(false)
  }, [complexity, getMazeSize, checkMazeSolvable])

  useEffect(() => {
    initializeMaze()
  }, [complexity, initializeMaze])

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (maze[row][col] === 1 || solved) return // Don't allow clicking on walls or after solving

      setPath((prevPath) => {
        const newPath = prevPath.map((row) => [...row])
        newPath[row][col] = !newPath[row][col] // Toggle the cell
        return newPath
      })
    },
    [maze, solved],
  )

  const checkSolution = useCallback(() => {
    const mazeSize = maze.length
    const visited: boolean[][] = Array(mazeSize)
      .fill(null)
      .map(() => Array(mazeSize).fill(false))

    const dfs = (x: number, y: number): boolean => {
      if (
        x < 0 ||
        x >= mazeSize ||
        y < 0 ||
        y >= mazeSize ||
        maze[x][y] === 1 ||
        visited[x][y]
      ) {
        return false
      }
      if (x === mazeSize - 1 && y === mazeSize - 1) {
        return true
      }
      visited[x][y] = true
      if (!path[x][y]) return false
      return dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1)
    }

    setSolved(dfs(0, 0))
  }, [maze, path])

  useEffect(() => {
    checkSolution()
  }, [path, checkSolution])

  const solveMaze = useCallback(() => {
    const mazeSize = maze.length
    const queue: [number, number][] = [[0, 0]]
    const visited: boolean[][] = Array(mazeSize)
      .fill(null)
      .map(() => Array(mazeSize).fill(false))
    const parent: ([number, number] | null)[][] = Array(mazeSize)
      .fill(null)
      .map(() => Array(mazeSize).fill(null))

    visited[0][0] = true

    while (queue.length > 0) {
      const [x, y] = queue.shift()!

      if (x === mazeSize - 1 && y === mazeSize - 1) {
        // Reconstruct the path
        const solution: boolean[][] = Array(mazeSize)
          .fill(null)
          .map(() => Array(mazeSize).fill(false))
        let current: [number, number] | null = [x, y]
        while (current !== null) {
          solution[current[0]][current[1]] = true
          current = parent[current[0]][current[1]]
        }
        setPath(solution)
        setSolved(true)
        return
      }

      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]
      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (
          nx >= 0 &&
          nx < mazeSize &&
          ny >= 0 &&
          ny < mazeSize &&
          maze[nx][ny] !== 1 &&
          !visited[nx][ny]
        ) {
          visited[nx][ny] = true
          parent[nx][ny] = [x, y]
          queue.push([nx, ny])
        }
      }
    }

    // If we get here, no solution was found
    console.log('No solution found')
  }, [maze])

  return {
    maze,
    path,
    solved,
    complexity,
    setComplexity,
    handleCellClick,
    initializeMaze,
    solveMaze,
  }
}
