export function deepCopy(oldObj) {
  let newObj = oldObj
  if (oldObj && typeof oldObj === 'object') {
    newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {}
    for (const i in oldObj) {
      newObj[i] = deepCopy(oldObj[i])
    }
  }
  return newObj
}

export function objToArr(obj) {
  return Object.keys(obj).map((key) => obj[key])
}

export function getDateTime() {
  const currentdate = new Date()
  return `${currentdate.getDate()}/${
         currentdate.getMonth() + 1}/${
         currentdate.getFullYear()} @ ${
         currentdate.getHours()}:${
         currentdate.getMinutes()}:${
         currentdate.getSeconds()}`
}
export function makeArrayUnique(array) {
  const seen = {}
  return array.filter((item) => seen.hasOwnProperty(item) ? false : (seen[item] = true))
}
