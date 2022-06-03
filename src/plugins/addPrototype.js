Array.prototype.first = function () {
  return this[0]
}

Array.prototype.last = function () {
  return this[this.length - 1]
}

Array.prototype.eq = function (num) {
  return this[num]
}
