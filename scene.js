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
  constructor (game, index = 0) {
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
    this.init()

    this.goLevel(index)
  }

  // 到第几个关卡
  goLevel (index) {
    let level = fetchLevel(index)
    if (level) {
      // 当前关卡
      this.currentLevel = index
      this.initNewLevel(level)
    } else {
      alert('已经是最后一关了')
    }

  }

  initNewLevel (level) {
    this.shapes = level.shapes.map(v => createShape(v))
    this.answer = level.answer
  }

  // 检查过关
  checkWin () {
    // 取第一个点, 与其他所有点的差值与答案相同, 即过关
    let firstP = this.shapes[0].points[0]
    let {x, y} = firstP

    for (let i = 1; i < this.shapes.length; i++) {
      let p = this.shapes[i].points[0]
      let a = this.answer[i - 1]
      if ((x - p.x) === a[0] && (y - p.y) === a[1]) {
        continue
      }
      return
    }

    // 到这里说明答案正确
    alert('恭喜你过关了')
    this.goLevel(this.currentLevel + 1)
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
        this.nextTick(() => this.checkWin())
      }
    }
  }

  draw (ctx) {
    ctx.globalCompositeOperation = 'source-over'
    this.points.forEach(v => v.draw(ctx))
    ctx.save()
    ctx.globalCompositeOperation = 'xor'
    this.shapes.forEach(v => v.draw(ctx))
    ctx.globalCompositeOperation = 'source-over'

    ctx.restore()
  }

  update (ctx) {
    // do nothing
  }

  // 下一帧
  nextTick (func) {
    setTimeout(() => {
      func()
    }, 2000 / window.fps);
  }
}