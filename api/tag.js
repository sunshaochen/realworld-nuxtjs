import { request } from "~/plugins/request";

// get article tags list
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}
