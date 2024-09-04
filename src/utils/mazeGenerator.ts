export function generateMaze(size: number, complexity: number): number[][] {
  const maze: number[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(1))

  function carvePathDFS(x: number, y: number) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]
    directions.sort(() => Math.random() - 0.5)

    maze[y][x] = 0 // Mark current cell as path

    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy
      if (nx >= 0 && nx < size && ny >= 0 && ny < size && maze[ny][nx] === 1) {
        maze[ny][nx] = 0 // Carve path
        carvePathDFS(nx, ny)
      }
    }
  }

  // Start carving from the top-left corner
  carvePathDFS(0, 0)

  // Ensure the bottom-right corner is accessible
  maze[size - 1][size - 1] = 0

  // Add walls based on complexity
  const wallPercentage = complexity / 20 // Higher complexity means more walls
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (
        maze[i][j] === 0 &&
        Math.random() < wallPercentage &&
        !(i === 0 && j === 0) &&
        !(i === size - 1 && j === size - 1)
      ) {
        maze[i][j] = 1
      }
    }
  }

  // Ensure start and end points are open
  maze[0][0] = 0
  maze[size - 1][size - 1] = 0

  return maze
}
