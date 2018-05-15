// 关卡编辑器
const LEVELS = [
  {
    shapes: [
      [[40, 40], [40, 80], [80, 80]],
      [[100, 100], [100, 160], [160, 160]],
      [[200, 200], [200, 260], [260, 260], [260, 200]],
    ],
    // 其他图形的第一个点, 与第一个图形的第一个点的相对坐标值
    answer: [
      [0, 0],
      [0, 0]
    ]
  }
]

const fetchLevel = index => {
  let level = LEVELS[index]
  return level
}