<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
<!--            <a href="">Have an account?</a>-->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
<!--            <li>That email is already taken</li>-->
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg"
                type="text" placeholder="Your Name"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                v-model="user.email"
                type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                v-model="user.password"
                type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '~/api/user';

// 只在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "LoginIndex",
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin ? await login(this.user) : await register(this.user);
        console.log(data);
        this.$store.commit('setUser', data.user)

        // 数据持久化
        Cookie.set('user', data.user)

        this.$router.push('/')
      } catch (e) {
        console.log('请求失败', e)
        console.dir(e);
        this.errors = e.response.data.errors;
      }
    }
  }
}
</script>

<style scoped>

</style>