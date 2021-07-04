<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab ===  'your_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab ===  'global_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab ===  'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: $route.query.tag,
                    }
                  }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <ArticleList :articles="articles" :total-page="totalPage"/>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{ item }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite
} from "~/api/article";
import { getTags } from "~/api/tag";
import { mapState } from 'vuex'
import ArticleList from '~/components/article-list/article-list';

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
  },
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1), limit = 20
    const { tag, tab = 'global_feed' } = query
    const loadArticles = store.state.user && tab === 'your_feed'
        ? getFeedArticles
        : getArticles
    const [articleData, { data: { tags } }] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const {
      articles,
      articlesCount,
    } = articleData.data

    articles.forEach(article => article.favoriteDisabled = false);
    console.log('----', articles)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    };
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.faboriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.faloritesCount -= 1;
      } else {
        await addFavorite(article.slug)
        article.favorited = true;
        article.faloritesCount += 1;
      }
      article.faboriteDisabled = false;
    }
  }

}
</script>

<style scoped>

</style>