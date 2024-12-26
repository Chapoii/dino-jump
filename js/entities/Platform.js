import { CANVAS_CONFIG, PLATFORM_CONFIG } from '../config.js'

export class Platform {
  constructor(y) {
    this.width = PLATFORM_CONFIG.width
    this.height = PLATFORM_CONFIG.height
    this.x = Math.random() * (CANVAS_CONFIG.width - this.width)
    this.y = y
  }

  draw(ctx) {
    ctx.fillStyle = '#006400'
    ctx.beginPath()
    const radius = PLATFORM_CONFIG.radius
    ctx.moveTo(this.x + radius, this.y)
    ctx.lineTo(this.x + this.width - radius, this.y)
    ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + radius, radius)
    ctx.lineTo(this.x + this.width, this.y + this.height - radius)
    ctx.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height, radius)
    ctx.lineTo(this.x + radius, this.y + this.height)
    ctx.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - radius, radius)
    ctx.lineTo(this.x, this.y + radius)
    ctx.arcTo(this.x, this.y, this.x + radius, this.y, radius)
    ctx.fill()
  }
} 