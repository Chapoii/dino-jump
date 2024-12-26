import { CANVAS_CONFIG, PLATFORM_CONFIG, DINO_CONFIG } from '../config.js'
import { Dino } from '../entities/Dino.js'
import { Platform } from '../entities/Platform.js'
import { drawUI } from '../utils/canvas.js'

export class GameManager {
  constructor(ctx) {
    this.ctx = ctx
    this.dino = new Dino()
    this.platforms = []
    this.initPlatforms()
    this.initAudio()
  }

  initPlatforms() {
    this.platforms = []
    for (let i = CANVAS_CONFIG.height - 200; i > 0; i -= PLATFORM_CONFIG.gap) {
      this.platforms.push(new Platform(i))
    }
  }

  initAudio() {
    this.bgm = wx.createInnerAudioContext()
    this.bgm.src = 'audio/bgm.ogg'
    this.bgm.loop = true
    this.bgm.onCanplay(() => this.bgm.play())
  }

  reset() {
    this.dino.reset()
    this.initPlatforms()
  }

  checkCollisions() {
    this.platforms.forEach(platform => {
      if (this.checkCollision(this.dino, platform)) {
        this.dino.y = platform.y - this.dino.height
        this.dino.speedY = DINO_CONFIG.jumpForce
        this.dino.isJumping = true
        this.dino.hasLandedOnPlatform = true
      }
    })
  }

  checkCollision(dino, platform) {
    return dino.x + dino.width > platform.x &&
           dino.x < platform.x + platform.width &&
           dino.y + dino.height >= platform.y &&
           dino.y + dino.height <= platform.y + platform.height &&
           dino.speedY > 0
  }

  update() {
    if (this.dino.isDead) return

    this.dino.update()
    this.checkCollisions()
    this.updatePlatforms()
  }

  updatePlatforms() {
    // 保持恐龙在画面中央
    const screenMiddle = CANVAS_CONFIG.height / 2
    if (this.dino.y < screenMiddle) {
      const diff = screenMiddle - this.dino.y
      this.dino.y = screenMiddle
      this.platforms.forEach(platform => {
        platform.y += diff
      })
    }

    // 更新平台
    this.platforms = this.platforms.filter(p => p.y < CANVAS_CONFIG.height)
    while (this.platforms.length < CANVAS_CONFIG.height / PLATFORM_CONFIG.gap) {
      const highestPlatform = Math.min(...this.platforms.map(p => p.y))
      this.platforms.push(new Platform(highestPlatform - PLATFORM_CONFIG.gap))
    }
  }

  draw() {
    // 清空画布
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height)

    // 绘制游戏元素
    this.platforms.forEach(platform => platform.draw(this.ctx))
    this.dino.draw(this.ctx)

    // 绘制UI
    drawUI(this.ctx, this.dino)
  }
} 