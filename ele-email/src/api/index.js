import request from '@/utils/request'

export function createEmail() {
  return request({
    url: '/email/gen/user',
    method: 'get'
  })
}
export function refreshEmail(name) {
  return request({
    url: `/email/refresh/${name}`,
    method: 'get'
  })
}
export function registerEmail(name, old) {
  return request({
    url: `/email/register/${name}?`,
    method: 'get',
    params: { old }
  })
}

export function getEmailList(name) {
  return request({
    url: `/email/receive/${name}`,
    method: 'get'
  })
}
