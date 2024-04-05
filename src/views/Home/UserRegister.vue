<template>
  <div
    class="container-fluid h-100 justify-content-center align-items-center mt-5"
  >
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-9 col-lg-6 col-xxl-4">
        <div class="card rounded-lg">
          <div class="card-body">
            <router-link
              :to="{ name: 'Home' }"
              class="text text-decoration-none"
            >
              <h2
                class="display-4 text-center fw-bold text text-decoration-none"
              >
                Pixel Missions
              </h2>
            </router-link>
            <p class="text-center text-secondary">接案的好幫手</p>
            <hr />
            <p class="text-center text-secondary">註冊</p>
            <p v-if="warningswitch" class="text-center text-danger">
              {{ warningText }}
            </p>
            <div class="form-floating mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="使用者名稱或電子郵件"
                v-model="email"
              />
              <label for="floatingInput">電子郵件</label>
            </div>
            <div class="form-floating mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="暱稱"
                v-model="username"
              />
              <label for="floatingInput">暱稱</label>
            </div>
            <div class="form-floating mt-3">
              <input
                type="password"
                class="form-control"
                placeholder="密碼"
                v-model="password"
              />
              <label for="floatingInput">密碼</label>
            </div>
            <hr />
            <div class="text-center mt-3 w-100">
              <button
                class="w-100 btn btn-primary rounded-pill"
                type="button"
                @click="registerCheck()"
              >
                註冊
              </button>
            </div>
            <div class="text-center mt-3 w-100">
              <button
                class="w-100 btn btn-outline-primary rounded-pill"
                type="button"
                @click="backLogin()"
              >
                回到登入
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'

import { mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
const { VITE_URL, VITE_API_PATH, VITE_ADMIN_USERNAME, VITE_ADMIN_PASSWORD } =
  import.meta.env

const actions = ['Userlogin', 'AdminTokenCheck']

export default {
  name: 'UserRegister',
  data () {
    return {
      warningswitch: false,
      warningText: '',
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    registerCheck () {
      if (this.email === '' || this.password === '') {
        this.warningText = '請輸入使用者名稱或密碼'
        this.warningswitch = true
        return
      }
      if (this.email.length < 4 || this.password.length < 4) {
        this.warningText = '使用者名稱或密碼長度不足\n(最少為4個字元)'
        this.warningswitch = true
        return
      }
      if (this.email.length > 20 || this.password.length > 20) {
        this.warningText = '使用者名稱或密碼長度過長\n(最多為20個字元)'
        this.warningswitch = true
        return
      }
      if (
        this.email.includes(' ') ||
        this.password.includes(' ') ||
        this.username.includes(' ')
      ) {
        this.warningText = '使用者名稱或密碼不可包含空白'
        this.warningswitch = true
        return
      }
      this.warningText = ''
      this.warningswitch = false
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)RegToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // console.log("token", token);
      // 如果有token就跳過註冊檢查
      if (token) {
        // console.log("token", token);
        this.checkUserduplicates(token)
        return
      }
      const loginData = {
        username: VITE_ADMIN_USERNAME,
        password: VITE_ADMIN_PASSWORD
      }
      const tokenUrl = `${VITE_URL}/admin/signin`
      // 登入取得後端必要token
      axios
        .post(tokenUrl, loginData)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `RegToken=${token};expires=${new Date(expired)}; path=/`
          this.checkUserduplicates(token)
        })
        .catch(() => {
          toastr.warning('註冊失敗 請稍後再試')
        })
    },
    checkUserduplicates (token, pages = 1) {
      // API只接收 page 跟 category 兩個參數 撈回來的要用filter篩選
      // `${VITE_URL}/api/${VITE_API_PATH}/admin/products?category=使用者`;
      const checkUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/products?category=使用者&page=${pages}`
      // 產品GET資料 不用帶data參數 直接寫Authorization就好
      axios
        .get(checkUrl, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then((res) => {
          const account = Object.values(res.data.products).filter((item) => {
            return item.email === this.email
          })
          if (
            res.data.pagination.total_pages !==
              res.data.pagination.current_page &&
            account.length === 0
          ) {
            this.checkUserduplicates(
              token,
              res.data.pagination.current_page + 1
            )
            return
          }
          if (account.length === 0) {
            this.register(token)
          } else {
            this.warningText = '使用者名稱已存在'
            this.warningswitch = true
          }
        })
    },
    register (token) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product`
      let data = {
        title: this.username,
        category: '使用者',
        origin_price: 0,
        price: 0,
        unit: '人',
        description: '我想我應該在這留下一句很有趣的話，可是我剛好想不到',
        content: '使用者資料',
        username: this.username,
        password: this.password,
        email: this.email,
        is_enabled: 1,
        imageUrl: 'https://fakeimg.pl/500x500/?retina=1&text=Not%20Set%20Head'
      }
      // POST 要帶data參數 才能寫Authorization 直接寫headers會把headers當成data參數
      axios
        .post(url, (data = { data }), {
          headers: {
            Authorization: `${token}`
          }
        })
        .then(() => {
          toastr.success('註冊成功')
          this.$router.push({ name: 'Login' })
        })
        .catch(() => {
          toastr.warning('註冊失敗 請稍後再試')
        })
    },
    backLogin () {
      this.$router.push('/login')
    }
  },
  mounted () {
    this.AdminTokenCheck(true)
  }
}
</script>

<style></style>
