import { request } from "~/plugins/request";

// 用户登录
export const login = user =>request({
    method: 'POST',
    url: '/api/users/login',
    data: {
      user
    }
  })

// 修改用户信息
export const updateUser = user =>
  request({
    method: 'put',
    url: '/api/user',
    data: {
      user
    }
  })

// 用户注册
export const register = user =>
  request({
    method: 'POST',
    url: '/api/users',
    data: {
      user
    }
  })
// 获取用户配置信息
export const getProfile = username =>
  request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })

// Follow用户
export const follow = username => request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })

// Unfollow用户
export const unfollow = username => request({
  method: 'DELETE',
  url: `/api/profiles/${username}/follow`
})
