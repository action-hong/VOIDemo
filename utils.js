// var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

// console.dir([
//     inside({x: 1.5, y: 4.5}}, polygon),
//     inside([ 4.9, 1.2 ], polygon),
//     inside([ 1.8, 1.1 ], polygon)
// ]);
// 点是否在该多边形内
const pointInPolygon = (x, y, vs) => {
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i][0], yi = vs[i][1];
      let xj = vs[j][0], yj = vs[j][1];
      
      let intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  return inside;
}

const loadImage = src => {
  let img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img)
    }
    img.src = src
  })
}