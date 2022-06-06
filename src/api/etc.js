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
