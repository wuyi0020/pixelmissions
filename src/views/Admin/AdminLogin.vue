<template>
  <div>
    <h2>登入頁面</h2>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
                v-model="user.username"
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>
            <br />
            <button
              type="button"
              class="btn btn-lg btn-primary w-100 mt-3"
              @click="login()"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'

const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      apiUrl: `${VITE_URL}`,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${this.apiUrl}/admin/signin`
      axios
        .post(api, this.user)
        .then((res) => {
          toastr.success('燈入成功')
          const { token, expired } = res.data
          document.cookie = `DashbordAdminToken=${token};expires=${new Date(expired)}; path=/`
          this.$router.push('/admin/product')
        })
        .catch(() => {
          toastr.error('登入失敗')
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)DashbordAdminToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token) {
      this.$router.push('/admin/product')
    }
  }
}
</script>
