String.prototype.string = function (len) {
  let s = '',
    i = 0
  while (i++ < len) {
    s += this
  }
  return s
}
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this
}
Number.prototype.zf = function (len) {
  return this.toString().zf(len)
}

Array.prototype.first = function () {
  return this[0]
}

Array.prototype.last = function () {
  return this[this.length - 1]
}

Array.prototype.eq = function (num) {
  return this[num]
}

const _WEEKNAMES = {
  sun: '일요일',
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  am: '오전',
  pm: '오후',
}

Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' '

  const weekName = [
    _WEEKNAMES.sun,
    _WEEKNAMES.mon,
    _WEEKNAMES.tue,
    _WEEKNAMES.wed,
    _WEEKNAMES.thu,
    _WEEKNAMES.fri,
    _WEEKNAMES.sat,
  ]
  const d = this

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|ms|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear()
      case 'yy':
        return (d.getFullYear() % 1000).zf(2)
      case 'MM':
        return (d.getMonth() + 1).zf(2)
      case 'dd':
        return d.getDate().zf(2)
      case 'E':
        return weekName[d.getDay()]
      case 'HH':
        return d.getHours().zf(2)
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2)
      case 'mm':
        return d.getMinutes().zf(2)
      case 'ss':
        return d.getSeconds().zf(2)
      case 'ms':
        return d.getMilliseconds().zf(3)
      case 'a/p':
        return d.getHours() < 12 ? _WEEKNAMES.am : _WEEKNAMES.pm
      default:
        return $1
    }
  })
}

Date.prototype.getWeek = function () {
  const onejan = new Date(this.getFullYear(), 0, 1)
  const today = new Date(this.getFullYear(), this.getMonth(), this.getDate())
  const dayOfYear = (today - onejan + 86400000) / 86400000
  return Math.ceil(dayOfYear / 7)
}

Date.prototype.getWeekState = function () {
  const toDay = new Date()
  let resultWeekCnt = toDay.getWeek() - this.getWeek()
  if (toDay.getFullYear() > this.getFullYear()) {
    resultWeekCnt = 52 + resultWeekCnt
  }

  return resultWeekCnt
}
