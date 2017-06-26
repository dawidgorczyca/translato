export function deepCopy(oldObj) {
  let newObj = oldObj
  if (oldObj && typeof oldObj === 'object') {
    newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {}
    for (let i in oldObj) {
      newObj[i] = deepCopy(oldObj[i])
    }
  }
  return newObj
}

export function objToArr(obj) {
  return Object.keys(obj).map((key) => obj[key])
}
