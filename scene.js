const LEN = 20

class Scene {
  constructor (game) {
    this.game = game
    this.points = []
    this.shapes = []
    this.drawShape = null

    let {width, height} = game.canvas
    for (let x = LEN; x < width; x += LEN) {
      for (let y = LEN; y < height; y += LEN) {
        this.points.push(new Point(x, y))
      }
    }

    let points = []
    points.push(new Point(40, 40))
    points.push(new Point(40, 80))
    points.push(new Point(80, 80))
  
    let shape = new Shape(points)
    this.shapes.push(shape)

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
    this.shapes.forEach(v => v.draw(ctx))
  }

  update (ctx) {
    // do nothing
  }


}