<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="profileBtnHandler"
            >
              <i :class="{
                'ion-plus-round':  !isUserSelf,
                'ion-gear-a': isUserSelf
              }"></i>
              {{ isUserSelf ? 'EditProfileSettings' : `Follow ${user.username}` }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'myArticle'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: username,
                    },
                    query: {
                      tab: 'myArticle'
                    }
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'favorite'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: username,
                    },
                    query: {
                      tab: 'favorite'
                    }
                  }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <ArticleList :articles="articles" :total-page="totalPage"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from "@/api/user";
import { getArticles } from "@/api/article";
import ArticleList from '~/components/article-list/article-list';

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  components: {
    ArticleList,
  },
  middleware: 'authenticated',
  name: "UserProfile",
  watchQuery: ['page', 'tab'],
  async asyncData({ query, store, params }) {
    let user
    // 如果传入用户名与登录人用户名相同
    if (params.username === store.state.user.username) {
      user = store.state.user;
    } else {
      const { data } = await getProfile(params.username);
      user = data.profile;
    }
    console.log(user);

    const page = Number.parseInt(query.page || 1), limit = 20
    const { tab = 'myArticle' } = query
    const articleData = await getArticles({
      limit,
      offset: (page - 1) * limit,
      // 根据tab不同传入不同的参数
      [tab === 'myArticle' ? 'author' : 'favorited']: user.username
    })
    const { articles, articlesCount } = articleData.data

    return { user, articles, articlesCount, page, tab, limit }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    isUserSelf() {
      return this.$store.state.user.username === this.username
    },
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  /*
  watch: {
    $route() {
      this.getArticles();
    }
  },*/
  methods: {
    profileBtnHandler() {
      /* 如果当前页面是自己，则跳转到用户编辑页面 */
      if (this.isUserSelf) {
        this.$router.push({ path: '/setting' })
      } else {

      }
    },
    async getArticles() {
      const { tab } = this.$route.query
      const params = {};
      if (tab === 'favorite') {
        params.favorited = this.username
      } else {
        params.author = this.username
      }
      const data = await getArticles(params)
      const { articles, articlesCount } = data.data
      this.articles = articles
      this.articlesCount = articlesCount
    }
  },
  mounted() {
    console.log(this.username);
    console.log(this.user);
    // this.getArticles()
  },

}
</script>

<style scoped>

</style>