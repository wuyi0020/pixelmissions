<template>
  <div class="d-flex align-content-center min-vh-100 flex-column p-0">
    <nav
      class="navbar navbar-expand-lg navbar-static-top navbar-dark border-bottom"
    >
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">Pixel Missions</RouterLink>
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
            <!-- <li class="nav-item">
              <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
            </li> -->
            <li class="nav-item">
              <RouterLink class="nav-link" to="/author">瀏覽作者</RouterLink>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/allart">瀏覽作品</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-flex ms-auto">
            <li class="nav-item" v-if="userHasLogIn">
              <RouterLink class="nav-link" to="/order">委託訂單</RouterLink>
            </li>
            <div class="nav-item" v-if="userHasLogIn">
              <RouterLink class="nav-link" :to="`/usercenter/${userID}`"
                >會員中心</RouterLink
              >
            </div>
            <div class="nav-item" v-if="userHasLogIn">
              <button type="button" class="nav-link" @click="UserLogout()">登出</button>
            </div>
            <div class="nav-item" v-else>
              <RouterLink class="nav-link" to="/login">登入</RouterLink>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <div class="d-flex flex-grow-1 flex-column flex-wrap">
      <RouterView :key="$route.fullPath" />
    </div>
    <footer class="d-flex mt-auto">
      <div class="container">
        <div
          class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
        >
          <p class="col-md-4 mb-0 text-body-secondary">
            &copy; 2024 PixelMissions
          </p>
          <p class="col-md-4 mb-0 text-body-secondary">
            Illustration by
            <a href="https://icons8.com/illustrations/author/259416"
              >Marina Green</a
            >
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </p>
          <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item">
              <RouterLink to="/admin" class="nav-link px-2 text-body-secondary"
                >後台登入</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/author" class="nav-link px-2 text-body-secondary"
                >瀏覽作者</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link px-2 text-body-secondary"
                >常見問題</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/" class="nav-link px-2 text-body-secondary"
                >回首頁</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
// import * as router from "vue-router";
// import toastr from "toastr";

const state = ['userName', 'userEmail', 'userID', 'userHasLogIn', 'AdminToken']
const actions = [
  'checkUserLogin',
  'UserLogout',
  'AdminTokenCheck',
  'getAlldata'
]

export default {
  name: 'FontView',
  methods: {
    ...mapActions(UserState, actions)
  },
  computed: {
    ...mapState(UserState, state)
  },
  mounted () {
    // this.checkUserLogin()
    this.getAlldata()
    this.AdminTokenCheck()
    this.$router.beforeEach(() => {
      const Navbar = document.getElementById('navbarContent')
      if (Navbar) {
        Navbar.classList.remove('show')
      }
    })
    this.checkUserLogin(false)
    // console.log(this.userHasLogIn)
  }
}
</script>
