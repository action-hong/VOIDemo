const es = e => document.querySelector(e)

// 点
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()
  }
}

// 图形
class Shape {
  constructor(points) {
    this.points = points
    this.isDrag = false
    this._reset()
  }

  draw (ctx) {
    let fp = this.points[0]
    ctx.beginPath()
    this.points.forEach((val, index) => {
      let x = val.x + this.translateX
      let y = val.y + this.translateY
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.fill()
  }

  setBasePoint (x, y) {
    this.baseX = x
    this.baseY = y
  }

  translate (x, y) {
    this.translateX = x - this.baseX
    this.translateY = y - this.baseY
  }

  goNewPosition () {
    let realXTranslate = 0
    let realYtranslate = 0

    // 先移动到整点
    let p = this.points[0]
    let x = p.x + this.translateX
    let y = p.y + this.translateY

    x = x - x % 20
    y = y - y % 20

    this.translateX = x - p.x
    this.translateY = y - p.y

    this.points.forEach(v => {
      let x = v.x + this.translateX
      let y = v.y + this.translateY

      // 不考虑图形大于整个canvas的情况
      if (x < 20) {
        this.translateX = 20 - v.x
      }

      if (x > 380) {
        this.translateX = 380 - vx
      }

      if (y < 20) {
        this.translateY = 20 - v.y
      }

      if (v > 380) {
        this.translateY = 380 - v.y
      }
    })

    this.points.forEach(v => {
      v.x = v.x + this.translateX
      v.y = v.y + this.translateY
    })
    // 
    this._reset()
  }

  _reset () {
    this.baseX = 0
    this.baseY = 0
    this.translateX = 0
    this.translateY = 0
  }

  // 是否在该形状内
  // point
  isInShape (x, y) {
    let vs = this.points.map(v => [v.x, v.y])
    return pointInPolygon(x, y, vs)
  }
}

window.onload = () => {
  let game = new Game(30, {}, g => {
    let scene = new Scene(g)
    g.runWithScene(scene)
  })
}