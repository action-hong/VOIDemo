window.onload = () => {
  let game = new Game(30, {}, g => {
    let scene = new Scene(g)
    g.runWithScene(scene)
  })
}