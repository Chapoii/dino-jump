import { CANVAS_CONFIG, RESTART_BUTTON_CONFIG } from '../config.js'

export function createCanvas() {
  const canvas = wx.createCanvas()
  return canvas.getContext('2d')
}

export function drawUI(ctx, dino) {
  if (dino.isDead) {
    drawGameOver(ctx, dino)
  } else {
    drawScore(ctx, dino)
  }
}

function drawGameOver(ctx, dino) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height)
  
  ctx.fillStyle = 'white'
  ctx.font = '40px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('游戏结束', CANVAS_CONFIG.width/2, CANVAS_CONFIG.height/2)
  
  ctx.font = '20px Arial'
  ctx.fillText(`总跳跃高度: ${Math.floor(dino.totalHeight)}`, 
               CANVAS_CONFIG.width/2, CANVAS_CONFIG.height/2 + 40)
  
  drawRestartButton(ctx)
}

function drawRestartButton(ctx) {
  const button = RESTART_BUTTON_CONFIG
  ctx.fillStyle = '#4CAF50'
  ctx.fillRect(button.x, button.y, button.width, button.height)
  
  ctx.fillStyle = 'white'
  ctx.font = '20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('重新开始', 
               button.x + button.width/2, 
               button.y + button.height/2 + 7)
}

function drawScore(ctx, dino) {
  ctx.fillStyle = '#000000'
  ctx.font = '20px Arial'
  ctx.textAlign = 'right'
  ctx.fillText(`高度: ${Math.floor(dino.totalHeight)}`, 
               CANVAS_CONFIG.width - 20, 40)
}