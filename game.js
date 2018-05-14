class Game {
  constructor (fps, images, callback) {
    window.fps = fps
    this.images = images
    this.callback = callback

    this.scene = null
    this.actions = {}
    this.keydowns = {}
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('keyup', event => {
      this.keydowns[event.key] = true
    })

    window.addEventListener('keyup', event => {
      this.keydowns[event.key] = false
    })

    this.init()
  }

  update () {
    if (this.scene) {
      this.scene.update(this.ctx)
    } else {
      throw new Error('no scene!!!!!')
    }
  }

  draw () {
    if (this.scene) {
      this.scene.draw(this.ctx)
    } else {
      throw new Error('no scene!!!!!')
    }
  }

  registerAction(key, callback) {
    this.actions[key] = callback
  }

  runloop () {
    const actions = this.actions
    for (const key in actions) {
      if (actions.hasOwnProperty(key)) {
        const action = actions[key]
        if (this.keydowns[key]) {
          action()
        }
      }
    }

    // update
    this.update(this.canvas, this.ctx)

    // clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // darw
    this.draw(this.canvas, this.ctx)

    // next run loop
    setTimeout(() => {
      this.runloop()
    }, 1000 / window.fps);
  }

  runWithScene (scene) {
    this.scene = scene
    setTimeout(() => {
      this.runloop()
    }, 1000 / window.fps);
  }

  replaceScene (scene) {
    this.scene = scene
  }

  _start (scene) {
    this.callback(this)
  }

  async init () {
    let images = this.images
    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const src = images[key]
        images[key] = await loadImage(src)
      }
    }

    this._start()
  }

}