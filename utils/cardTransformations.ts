export const getrotation = (index: number, len: number, rotDegree: number) => {
  return (index + 1 - (len + 1) / 2) * rotDegree
}

export const gettop = (index: number, len: number, topOffset: number) => {
  return Math.abs(index + 1 - (len + 1) / 2) * topOffset
}

export const getleftpos = (index: number, len: number) => {
  return (100 / (len - 1)) * index
}

export const getxpos = (index: number, len: number) => {
  return (100 / (len - 1)) * index * -1
}
