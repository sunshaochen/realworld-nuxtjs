import { request } from "~/plugins/request";

// 用户登录
export const login = user => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: {
      user
    }
  })
}

// 用户注册
export const register = user => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: {
      user
    }
  })
}
