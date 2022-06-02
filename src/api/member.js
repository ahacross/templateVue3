import instance from './index'

export function GET_MEMBER_INFO(id) {
  const url = `/mylord/member/${id}`
  return instance({ url, method: 'GET' })
}
