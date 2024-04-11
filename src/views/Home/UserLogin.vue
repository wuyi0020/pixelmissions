<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-9 col-lg-6 col-xxl-4">
        <div class="card rounded-lg border-3">
          <div class="card-body">
            <router-link
              :to="{ name: 'Home' }"
              class="text text-decoration-none"
            >
              <h2 class="display-4 text-center fw-bold text">Pixel Missions</h2>
            </router-link>
            <p class="text-center text-secondary">接案的好幫手</p>
            <hr />
            <p class="text-center text-secondary">請登入或註冊</p>
            <div class="form-floating mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="使用者名稱或電子信箱"
                v-model="email"
              />
              <label for="floatingInput">電子信箱</label>
            </div>
            <div class="form-floating mt-1">
              <input
                type="password"
                class="form-control"
                placeholder="密碼"
                v-model="password"
              />
              <label for="floatingInput">密碼</label>
            </div>
            <div class="text-center mt-3 w-100">
              <button
                class="w-100 btn btn-primary rounded-pill"
                type="button"
                @click="Userlogin(email, password)"
              >
                登入
              </button>
            </div>
            <div class="text-center mt-3 w-100">
              <button
                class="w-100 btn btn-outline-primary rounded-pill"
                type="button"
                @click="GOregister"
              >
                註冊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'

const state = ['userName', 'userEmail', 'userID', 'userHasLogIn', 'AdminToken']
const actions = ['Userlogin', 'AdminTokenCheck']

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    this.AdminTokenCheck(true)
  },
  methods: {
    GOregister () {
      this.$router.push('/register')
    },
    ...mapActions(UserState, actions)
  },
  computed: {
    ...mapState(UserState, state)
  }
}
</script>

<style></style>
