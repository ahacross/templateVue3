export const partMap = new Map()
partMap.set('s', '소프라노')
partMap.set('a', '알토')
partMap.set('t', '테너')
partMap.set('b', '베이스')

export const statusMap = new Map()
statusMap.set('Y', '활동중')
statusMap.set('R', '장기결석')
statusMap.set('N', '기타(탈퇴)')

export const tabs = [
  { name: 'all', label: '전체' },
  { name: 's', label: '솦' },
  { name: 'a', label: '알' },
  { name: 't', label: '테' },
  { name: 'b', label: '베' },
  { name: 'e', label: '그외' },
]

export const parts = [
  { label: '소프라노', value: 's' },
  { label: '알토', value: 'a' },
  { label: '테너', value: 't' },
  { label: '베이스', value: 'b' },
  { label: '반주자', value: '반주자' },
  { label: '지휘자', value: '지휘자' },
  { label: '목사님', value: '목사님' },
]
