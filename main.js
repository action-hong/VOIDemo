const es = e => document.querySelector(e)

// 每个黑点相距 20
const LEN = 20

// 点
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  drawPoint(ctx) {
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
  }

  drawShape (ctx) {
    let fp = this.points[0]
    ctx.beginPath()
    this.points.forEach((val, index) => {
      let x = val.x
      let y = val.y
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.fill()
  }
}

window.onload = () => {
  const canvas = es('#canvas')
  const ctx    = canvas.getContext('2d')
  
  const width  = canvas.width
  const height = canvas.height
  
  // 所有点
  const POINTS = []

  // 画点
  for (let x = LEN; x < width; x += LEN) {
    for (let y = LEN; y < height; y += LEN) {
      POINTS.push(new Point(x, y))
    }
  }

  POINTS.forEach(v => v.drawPoint(ctx))

  let points = []
  points.push(new Point(40, 40))
  points.push(new Point(40, 60))
  points.push(new Point(40, 80))
  points.push(new Point(60, 80))
  points.push(new Point(80, 80))

  let shape = new Shape(points)
  shape.drawShape(ctx)
}