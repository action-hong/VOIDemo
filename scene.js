const LEN = 20

const shapes = [
  [[40, 40], [40, 80], [80, 80]],
  [[100, 100], [100, 160], [160, 160]],
  [[200, 200], [200, 260], [260, 260], [260, 200]],
]

const createShape = shape => {
  return new Shape(shape.map(v => new Point(v[0], v[1])))
}

class Scene {
  constructor (game) {
    this.game = game
    this.points = []
    this.drawShape = null

    let {width, height} = game.canvas
    for (let x = LEN; x < width; x += LEN) {
      for (let y = LEN; y < height; y += LEN) {
        this.points.push(new Point(x, y))
      }
    }

    this.shapes = shapes.map(v => createShape(v))

    this.init()
  }

  init () {
    let canvas = this.game.canvas

    canvas.onmousedown = event => {
      let x = event.offsetX
      let y = event.offsetY
      console.log(event)
      console.log(x, y)
      this.drawShape = this.shapes.find(val => val.isInShape(x, y))

      if (this.drawShape) {
        // 拖动基准
        this.drawShape.setBasePoint(x, y)
      }
    }
  
    canvas.onmousemove = event => {
      let x = event.offsetX
      let y = event.offsetY
      if (this.drawShape) {
        this.drawShape.translate(x, y)

        if (!this.drawShape.isDraging) {
          this.drawShape = null
        }
      }

    }

    canvas.onmouseup = event => {
      if (this.drawShape) {
        // 归为点上
        this.drawShape.goNewPosition()
        this.drawShape = null
      }
    }
  }

  draw (ctx) {
    this.points.forEach(v => v.draw(ctx))
    ctx.save()
    ctx.globalCompositeOperation = 'xor'
    this.shapes.forEach(v => v.draw(ctx))
    ctx.globalCompositeOperation = 'source-over'
  }

  update (ctx) {
    // do nothing
  }


}