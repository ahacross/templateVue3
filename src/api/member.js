import instance from './index'
import { useMemberStore } from '../stores/member'
import { makeDate, minus, plus } from '../plugins/date'

const prefix = '/mylord'

function getMemberId() {
  return useMemberStore().getInfoOne('member_id')
}

// 회원 정보 가져오기
export function GET_MEMBER_INFO(id) {
  if (!id) {
    id = getMemberId()
  }
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

// 올해 임원들 가져오기
export function GET_IS_MANAGER() {
  const memberId = getMemberId()
  const url = `${prefix}/officer/${memberId}`
  const year = makeDate().format('YYYY')
  return instance({ url, method: 'GET', params: { year, member_id: memberId } })
}

// 로그인
export function GET_LOGIN(phone) {
  const url = `${prefix}/member`
  const type = 'login'
  return instance({ url, method: 'GET', params: { type, phone } })
}

// 개인정보 update
export function PUT_MEMBER_UPDATE(data) {
  const url = `${prefix}/member/${data.member_id}`
  return instance({ url, method: 'PUT', data })
}

// 이름으로 찾기
export function GET_MEMBER_NAME(name) {
  const url = `${prefix}/member`
  const status = 'Y'
  return instance({ url, method: 'GET', params: { name, status } })
}

// 파트로 찾기
export function GET_MEMBER_PART(part) {
  const url = `${prefix}/member`
  return instance({ url, method: 'GET', params: { part } })
}

// 대원 추가
export function POST_MEMBER_INSERT(data) {
  const url = `${prefix}/member`
  return instance({ url, method: 'POST', data })
}
