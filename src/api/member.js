import instance from './index'
import { useMemberStore } from '../stores/member'
import { makeDate, minus, plus } from '../plugins/date'

const prefix = '/mylord'

function getMemberId() {
  return useMemberStore().getInfoOne('member_id')
}

// 회원 정보 가져오기
export function GET_MEMBER_INFO(id) {
  const url = `${prefix}/member/${id}`
  return instance({ url, method: 'GET' })
}

// 출석률 가져오기
function AttendanceRate(amount) {
  const url = `${prefix}/stats`
  const params = {}
  const endDate = makeDate()
  let unit
  let targetId
  if (amount === 4) {
    unit = 'week'
    targetId = 'before4week'
  } else if (amount === 12) {
    unit = 'week'
    targetId = 'before12week'
  } else if (amount === 1) {
    unit = 'year'
    targetId = 'beforeThisyear'
  }
  let startDate = minus(amount, unit, endDate)
  const day = startDate.toDate().getDay()
  if (day) {
    startDate = plus(7 - day, 'date', startDate)
  }

  params.type = 'one'
  params.targetId = targetId
  params.endDate = endDate.format('YYYYMMDD')
  params.startDate = startDate.format('YYYYMMDD')
  params.member_id = getMemberId()
  return instance({ url, method: 'GET', params })
}

// 4주, 12주, 올해 출석률 가져오기
export function GET_ATTENDANCE_RATES() {
  return Promise.all([AttendanceRate(4), AttendanceRate(12), AttendanceRate(1)])
}

// 올해 회비 낸 횟수
export function GET_DUES_YEAR() {
  const url = `${prefix}/dues/${getMemberId()}`
  const year = makeDate().format('YYYY')
  return instance({ url, method: 'GET', params: { year } })
}

export function GET_IS_MANAGER() {
  const memberId = getMemberId()
  const url = `${prefix}/officer/${memberId}`
  const year = makeDate().format('YYYY')
  return instance({ url, method: 'GET', params: { year, member_id: memberId } })
}
