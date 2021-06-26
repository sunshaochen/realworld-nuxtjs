/**
 *  基于axios封装的请求模块
 */
import axios from "axios";

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default ({ store }) => {
  // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  // 公共业务处理，例如同统一设置 token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  // 响应拦截器

}