<template>
  <div class="article-meta">
    <nuxt-link :to="{
       name: 'profile',
       params: {
         username: article.author.username
       }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
       name: 'profile',
       params: {
         username: article.author.username
       }
    }">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>

    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      v-if="article.author.username !== user.username"
      :disabled="disableFollowBtn"
      @click="followUser"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ !article.author.following ? 'Follow' : 'Unfollow' }} {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
      :disabled="disableFavoriteBtn"
      v-if="article.author.username !== user.username"
      @click="favoriteArticle"
    >
      <i class="ion-heart"></i>
      &nbsp;
      {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article <span class="counter">({{article.favoritesCount}})</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-secondary"
      v-if="article.author.username === user.username"
      @click="editArticle"
    >
      <i class="ion-edit"></i>
      &nbsp;
      Edit Article
    </button>
    &nbsp;&nbsp;
    <button
        class="btn btn-sm btn-outline-danger"
        v-if="article.author.username === user.username"
        @click="deleteArticle"
    >
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle, addFavorite, deleteFavorite } from '~/api/article'
import { follow,unfollow } from '~/api/user'
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      disableFollowBtn: false,
      disableFavoriteBtn: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    console.log(this.article)
  },
  methods: {
    editArticle() {
      this.$router.push(`/editor/${this.article.slug}`)
    },
    async deleteArticle() {
      await deleteArticle(this.article.slug)
      this.$router.back()
    },
    async followUser() {
      this.disableFollowBtn = true;
      const followFetch = this.article.author.following ? unfollow : follow
      await followFetch(this.article.author.username)
      await this.$parent.updateArticle(this.article.slug)
      this.disableFollowBtn = false;
    },
    async favoriteArticle() {
      this.disableFavoriteBtn = true;
      const favoriteFetch = this.article.favorited ? deleteFavorite : addFavorite;
      await favoriteFetch(this.article.slug)
      await this.$parent.updateArticle(this.article.slug)
      this.disableFavoriteBtn = false;
    }
  }
}
</script>

<style scoped>

</style>