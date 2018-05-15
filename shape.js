const es = e => document.querySelector(e)

// 返回离x最近的 能被20整取的数
const roundTo20 = x => {
  let tmp = x % 20
  if (tmp > 10) {
    return x + (20 - tmp)
  }
  return x - tmp
}

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
    this.isDraging = false
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
    this.isDraging = true
  }

  translate (x, y) {
    this.translateX = x - this.baseX
    this.translateY = y - this.baseY

    // 检查, 如果有点超出范围了
    if (this.points.map(v => [v.x + this.translateX, v.y + this.translateY])
                    .some(v => Math.min(v[0], v[1]) < 0 || Math.max(v[0], v[1]) > 400)) {
                      this.goNewPosition()
                    }
  }

  goNewPosition () {
    if (!this.isDraging) {
      return
    }

    let realTranslateX = 0
    let realTranslateY = 0

    // 先移动到整点
    let p = this.points[0]
    let x = p.x + this.translateX
    let y = p.y + this.translateY

    x = roundTo20(x)
    y = roundTo20(y)

    realTranslateX = x - p.x
    realTranslateY = y - p.y

    this.points.forEach(v => {
      let x = v.x + realTranslateX
      let y = v.y + realTranslateY

      // 不考虑图形大于整个canvas的情况
      if (x < 20) {
        realTranslateX = 20 - v.x
      }

      if (x > 380) {
        realTranslateX = 380 - v.x
      }

      if (y < 20) {
        realTranslateY = 20 - v.y
      }

      if (y > 380) {
        realTranslateY = 380 - v.y
      }
    })

    this.points.forEach(v => {
      v.x = v.x + realTranslateX
      v.y = v.y + realTranslateY
    })
    // 
    this._reset()
  }

  _reset () {
    this.baseX = 0
    this.baseY = 0
    this.translateX = 0
    this.translateY = 0
    this.isDraging = false
  }

  // 是否在该形状内
  // point
  isInShape (x, y) {
    let vs = this.points.map(v => [v.x, v.y])
    return pointInPolygon(x, y, vs)
  }
}
