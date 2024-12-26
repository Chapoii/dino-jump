import { BUTTON_CONFIG, RESTART_BUTTON_CONFIG, DINO_CONFIG, CANVAS_CONFIG } from '../config.js'

export class InputManager {
  constructor(gameManager) {
    this.gameManager = gameManager
    this.initTouchEvents()
  }

  initTouchEvents() {
    wx.onTouchStart((e) => {
      const touch = e.touches[0]
      const dino = this.gameManager.dino
      
      if (dino.isDead) {
        this.handleGameOverTouch(touch)
        return
      }
      
      this.handleGameplayTouch(touch)
    })

    wx.onTouchEnd(() => {
      this.gameManager.dino.speedX = 0
    })
  }

  handleGameOverTouch(touch) {
    if (this.isInsideButton(touch, RESTART_BUTTON_CONFIG)) {
      this.gameManager.reset()
    }
  }

  handleGameplayTouch(touch) {
    const dino = this.gameManager.dino
    const leftButton = {
      x: BUTTON_CONFIG.padding,
      y: BUTTON_CONFIG.y,
      width: BUTTON_CONFIG.width,
      height: BUTTON_CONFIG.height
    }
    
    const rightButton = {
      x: CANVAS_CONFIG.width - BUTTON_CONFIG.width - BUTTON_CONFIG.padding,
      y: BUTTON_CONFIG.y,
      width: BUTTON_CONFIG.width,
      height: BUTTON_CONFIG.height
    }

    if (this.isInsideButton(touch, leftButton)) {
      dino.speedX = -DINO_CONFIG.moveSpeed
      dino.direction = 1
    } else if (this.isInsideButton(touch, rightButton)) {
      dino.speedX = DINO_CONFIG.moveSpeed
      dino.direction = -1
    } else if (!dino.isJumping) {
      dino.speedY = DINO_CONFIG.jumpForce
      dino.isJumping = true
    }
  }

  isInsideButton(touch, button) {
    return touch.clientX >= button.x &&
           touch.clientX <= button.x + button.width &&
           touch.clientY >= button.y &&
           touch.clientY <= button.y + button.height
  }
} 