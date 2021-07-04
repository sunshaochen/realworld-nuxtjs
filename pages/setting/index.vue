<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" required class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button
                  class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>

import { updateUser } from '~/api/user';
// 只在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: "SettingsIndex",
  data() {
    const { user = {} } = this.$store.state
    console.log(this);
    return {
      user: {
        image: user.image,
        username: user.username,
        bio: user.bio,
        email: user.email,
        password: ''
      }
    }
  },
  methods: {
    async updateUser() {
      const { data } = await updateUser(this.user)
      console.log(data.user);
      // 数据持久化
      Cookie.set('user', data.user)
      await this.$router.push('/')
    },
    logout() {
      Cookie.remove('user')
      this.$store.commit('setUser', null);
      setTimeout(() => {
        this.$router.push('/')
      }, 0)
    }

  }
}
</script>

<style scoped>

</style>