// 游戏配置
export const CANVAS_CONFIG = {
  get width() {
    return wx.getSystemInfoSync().windowWidth
  },
  get height() {
    return wx.getSystemInfoSync().windowHeight
  }
}

export const DINO_CONFIG = {
  width: 50,
  height: 50,
  gravity: 0.5,
  jumpForce: -15,
  moveSpeed: 5
}

export const PLATFORM_CONFIG = {
  width: 70,
  height: 15,
  gap: 120,
  radius: 8
}

export const BUTTON_CONFIG = {
  width: 60,
  height: 60,
  padding: 20,
  get y() {
    return CANVAS_CONFIG.height - 80
  }
}

export const RESTART_BUTTON_CONFIG = {
  width: 120,
  height: 40,
  get x() {
    return CANVAS_CONFIG.width / 2 - 60
  },
  get y() {
    return CANVAS_CONFIG.height / 2 + 80
  }
} 