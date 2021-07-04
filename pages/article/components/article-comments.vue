<template>
  <div>
    <form class="card comment-form" @submit.prevent="addComment">
      <div class="card-block">
        <textarea v-model="comment" required class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" :key="comment.id" v-for="comment in comments">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>

        <span class="mod-options" v-if="comment.author.username === $store.state.user.username">
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
export default {
  name: "article-comments",
  props: {
    article: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      comments: [], // 文章列表
      comment: ''
    }
  },
  mounted() {
    this.updateComments()

  },
  methods: {
    async updateComments() {
      const { data } = await getComments(this.article.slug)
      console.log(data);
      this.comments = data.comments
    },
    async addComment() {
      await addComment(this.article.slug, this.comment)
      await this.updateComments()
    },
    async deleteComment(id) {
      await deleteComment(this.article.slug, id)
      await this.updateComments()
    }
  }
}
</script>

<style scoped>

</style>