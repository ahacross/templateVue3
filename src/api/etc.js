import instance from './index'
import { useMemberStore } from '../stores/member'
// import { makeDate, minus, plus } from '../plugins/date'

const prefix = '/mylord'

function getMemberId() {
  return useMemberStore().getInfoOne('member_id')
}

// 부른 찬양 목록 가져오기
export function GET_HISTORY() {
  const url = `${prefix}/history`
  return instance({ url, method: 'GET' })
}

// 부른 곡 추가
export function POST_HISTORY(data) {
  const url = `${prefix}/history`
  return instance({ url, method: 'POST', data })
}

// 부른 곡 수정
export function PUT_HISTORY(data) {
  const url = `${prefix}/history/${getMemberId()}`
  return instance({ url, method: 'PUT', data })
}

// 임원들
export function GET_WORKERS() {
  const url = `${prefix}/officer`
  return instance({ url, method: 'GET' })
}

// 임원 추가
export function POST_WORKERS(data) {
  const url = `${prefix}/officer`
  return instance({ url, method: 'POST', data })
}

// 임원 수정
export function PUT_WORKERS(data) {
  const url = `${prefix}/officer/${data.member_id}`
  return instance({ url, method: 'PUT', data })
}

// 임원 수정
export function DELETE_WORKERS(data) {
  const url = `${prefix}/officer/${data.member_id}`
  return instance({ url, method: 'DELETE', data })
}

// 일자별 출석 체크 가져오기
export function GET_ATTENDANCE_PART(params) {
  const url = `${prefix}/attendance`
  params.status = 'Y'
  return instance({ url, method: 'GET', params })
}

// 출석 체크
export function PUT_ATTENDANCE({ member_id, ...data }) {
  const url = `${prefix}/attendance/${member_id}`
  return instance({ url, method: 'PUT', data })
}

// 재적 가져오기
export function GET_ENROLL(params) {
  const url = `${prefix}/enroll`
  return instance({ url, method: 'GET', params })
}

// 재적 수동저장

// 생일 가져오기
// birthday=07
export function GET_BIRTHDAY(params) {
  const url = `${prefix}/member`
  params.type = 'birthday'
  return instance({ url, method: 'GET', params })
}
