import { createCanvas } from './utils/canvas.js'
import { GameManager } from './managers/GameManager.js'
import { InputManager } from './managers/InputManager.js'

// 初始化游戏
const ctx = createCanvas()
const gameManager = new GameManager(ctx)
const inputManager = new InputManager(gameManager)

// 游戏主循环
function gameLoop() {
  gameManager.update()
  gameManager.draw()
  requestAnimationFrame(gameLoop)
}

// 开始游戏
gameLoop()
