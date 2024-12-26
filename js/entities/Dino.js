import { CANVAS_CONFIG, DINO_CONFIG } from '../config.js'

export class Dino {
  constructor() {
    this.reset()
    this.image = wx.createImage()
    this.image.src = 'images/dino.png'
    // 初始化重力感应
    wx.startAccelerometer({
      interval: 'game'
    })
  }

  reset() {
    this.x = CANVAS_CONFIG.width / 2 - DINO_CONFIG.width / 2
    this.y = CANVAS_CONFIG.height - 100
    this.width = DINO_CONFIG.width
    this.height = DINO_CONFIG.height
    this.speedY = 0
    this.speedX = 0
    this.direction = 1
    this.totalHeight = 0
    this.isDead = false
    this.isJumping = false
    this.hasLandedOnPlatform = false
  }

  update() {
    // 更新重力感应数据
    wx.onAccelerometerChange(res => {
      // 将 -res.x 改为 res.x 来修正方向，并增加移动速度系数
      this.speedX = res.x * DINO_CONFIG.moveSpeed * 1.5
      // 根据移动方向设置朝向
      this.direction = this.speedX < 0 ? -1 : 1
    })

    this.speedY += DINO_CONFIG.gravity
    this.y += this.speedY
    this.x += this.speedX

    if (this.speedY < 0) {
      this.totalHeight -= this.speedY
    }

    // 从边界穿越到另一侧
    if (this.x + this.width < 0) {
      this.x = CANVAS_CONFIG.width
    }
    if (this.x > CANVAS_CONFIG.width) {
      this.x = -this.width
    }

    // 检查是否落地
    if (this.y + this.height > CANVAS_CONFIG.height) {
      this.y = CANVAS_CONFIG.height - this.height
      this.speedY = DINO_CONFIG.jumpForce
      this.isJumping = true
      // 只有在跳上过平台后落地才会死亡
      if (this.hasLandedOnPlatform) {
        this.isDead = true
      }
    }
  }

  draw(ctx) {
    ctx.save()
    if (this.direction === 1) {
      ctx.translate(this.x + this.width, this.y)
      ctx.scale(-1, 1)
      ctx.drawImage(this.image, 0, 0, this.width, this.height)
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    ctx.restore()
  }
}