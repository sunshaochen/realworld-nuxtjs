<template>
  <div>
    <div
        class="article-preview"
        v-for="article in articles"
        :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
          <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
          <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.faboriteDisabled"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>

    <nav>
      <ul class="pagination">

        <li class="page-item"
          :class="{
            active: item === ($route.query.page || 1)
          }"
          v-for="item in totalPage"
          :key="item"
        >
          <nuxt-link class="page-link" :to="{
            name: 'home',
            query: {
              page: item,
              tag: $route.query.tag,
              tab: $route.query.tab
            }
          }">{{ item }}</nuxt-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
export default {
  name: "article-list",
  props: {
    articles: {
      type: Array,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },
  }
}
</script>

<style scoped>

</style>