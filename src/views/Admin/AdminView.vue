<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-static-top navbar-dark border-bottom"
    >
      <div class="container-fluid">
        <RouterLink to="/admin/" class="navbar-brand">後台首頁</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav navbar-nav-scroll">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin/product"
                >管理使用者/作品/方案
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin/order"
                >瀏覽訂單
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">回到前台 </RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav d-flex ms-auto">
            <div class="nav-item">
              <button class="nav-link" @click="AdminLogOut()">登出</button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  data () {
    return {}
  },
  methods: {
    checkAdmin (token) {
      axios.defaults.headers.common.Authorization = token
      const url = `${VITE_URL}/api/user/check`
      axios.post(url).catch(() => {
        this.$router.push('/admin/login')
      })
    },
    async getToken () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)DashbordAdminToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      console.log('token', token)
      if (!token) {
        this.$router.push('/admin/login')
        console.log('請先登入')
      } else {
        console.log('已登入')
      }
      this.checkAdmin(token)
    },
    AdminLogOut () {
      document.cookie =
        'DashbordAdminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      this.$router.push('/admin/login')
    }
  },
  mounted () {
    this.getToken()
  }
}
</script>
