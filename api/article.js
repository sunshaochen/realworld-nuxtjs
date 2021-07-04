import { request } from "~/plugins/request";
// 获取公共文章列表
export const getArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles',
    params
  })

// 获取关注的用户文章列表
export const getFeedArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })

// 获取文章详情
export const getArticle = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })

// 获取文章详情
export const deleteArticle = slug =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })

// 创建文章
export const createArticle = article =>
  request({
    method: 'POST',
    url: `/api/articles/`,
    data: { article: {
        ...article,
        tagList: article.tagList?.split(',')
      }
    }
  })

// 更新文章
export const updateArticle = article =>
  request({
    method: 'PUT',
    url: `/api/articles/${article.slug}`,
    data: { article: {
        ...article,
        tagList: article.tagList?.split(',')
      }
    }
  })

// 获取文章评论
export const getComments = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })

// 添加点赞
export const addFavorite = slug =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })

// 取消点赞
export const deleteFavorite = slug =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })

// 添加评论
export const addComment = (slug, comment) =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body: comment
      }
    }
  })

// 删除评论
export const deleteComment = (slug, id) =>
  request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`,
  })
