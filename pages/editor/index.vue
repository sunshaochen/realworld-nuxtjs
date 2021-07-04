<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  required
                  type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  required
                  type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  required
                  class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, getArticle } from '~/api/article'
export default {
  name: "EditorIndex",
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  data() {
    return {
      article: {
        slug: this.$route.params.slug,
        title: '',
        description: '',
        body: '',
        tagList: '',
      }
    }
  },
  async mounted() {
    if (!this.article.slug) return
    const { data } = await getArticle(this.article.slug)
    data.article.tagList = data.article.tagList?.join(',')
    this.article = data.article;
  },
  methods: {
    async submit() {
      const articleFetch = this.article.slug ? updateArticle : createArticle;
      const { data } = await articleFetch(this.article)
      await this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>

<style scoped>

</style>