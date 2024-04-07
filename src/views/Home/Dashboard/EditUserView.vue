<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-6">
        <div class="card mt-3">
          <div class="card-body">
            <div class="" v-if="User.id">
              <RouterLink
                :to="{ name: 'UserCenter', params: { userid: User.id } }"
                class="text text-white link-underline link-underline-opacity-0 d-flex"
              >
                <i class="bi bi-caret-left-fill h1 text-white-50"></i>
                <h1 class="card-title">編輯使用者資料</h1>
              </RouterLink>
            </div>
            <div
              class="justify-content-center"
              :class="{
                'd-none': User.imageUrl !== '',
                'd-flex': User.imageUrl === ''
              }"
            >
              <div
                :class="{
                  'col-12 col-md-6 col-lg-3': User.imageUrl == '',
                  'col-12 col-md-9 col-lg-6': !(User.imageUrl == '')
                }"
              >
                <div
                  class="d-flex justify-content-center mw-100 ratio ratio-1x1"
                  :class="{ uploadStyle: User.imageUrl == '' }"
                >
                  <label
                    class="d-flex justify-content-center align-items-center btn btn-outline-secondary rounded-3"
                  >
                    <input type="file" ref="imgfileInput" id="fileInput" />
                    <h1
                      class="m-0 p-0"
                      :class="{
                        'd-block': User.imageUrl == '',
                        'd-none': !(User.imageUrl == '')
                      }"
                    >
                      +
                    </h1>
                    <img
                      :src="User.imageUrl"
                      ref="imagePreview2"
                      class="mw-100 ratio-1x1"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="text-center">
              <img
                v-if="User.imageUrl"
                class="card-img-top w-50 ratio-1x1"
                :src="User.imageUrl"
              />
            </div>

            <div class="mt-3 d-flex justify-content-center">
              <button
                type="button"
                class="w-100 btn btn-danger btn-lg"
                @click="User.imageUrl = ''"
              >
                刪除圖片
              </button>
            </div>
            <div class="mt-3">
              <label class="">名稱：</label>
              <input
                type="text"
                class="form-control"
                placeholder="使用者名稱"
                v-model="User.title"
              />
            </div>
            <div class="mt-3">
              <label class="">自我描述：</label>
              <input
                type="text"
                class="form-control"
                placeholder="描述"
                v-model="User.description"
              />
            </div>
            <div class="mt-3">
              <label class="">帳號/Email :</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                v-model="User.email"
              />
            </div>
            <div class="mt-3">
              <label class="">密碼：</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="User.password"
              />
            </div>
            <div class="mt-3 d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-danger btn-lg"
                @click="cancel"
              >
                <i class="bi bi bi-x-circle-fill me-1"></i>
                <span>取消修改</span>
              </button>
              <button
                type="button"
                class="btn btn-success btn-lg"
                @click="upload"
              >
                <i class="bi bi-check-circle-fill me-1"></i>
                <span>確定修改</span>
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
import axios from 'axios'
import toastr from 'toastr'
const { VITE_URL, VITE_API_PATH } = import.meta.env
const state = ['Alldata', 'AdminToken', 'userHasLogIn', 'userID']
const actions = ['AdminTokenCheck', 'getAlldata', 'setAdminToken']
export default {
  data () {
    return {
      User: {},
      ThisUserID: '',
      oldimageUrl: ''
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  methods: {
    ...mapActions(UserState, actions),
    async getArtdata () {
      await this.getAlldata()
      this.User = this.Alldata[this.ThisUserID]
      this.oldimageUrl = this.Alldata[this.ThisUserID].imageUrl
      if (this.userID !== this.ThisUserID) {
        this.$router.push(`/usercenter/${this.userID}`)
      }
    },
    cancel () {
      this.$router.push(`/usercenter/${this.userID}`)
    },
    done () {
      this.setAdminToken()
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.ThisUserID}`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios
        .put(url, { data: this.User })
        .then((res) => {
          this.$router.push(`/usercenter/${this.userID}`)
          toastr.success('修改成功')
        })
        .catch(() => {
          toastr.warning('修改失敗')
        })
    },
    imagePreview () {
      const file = this.$refs.imgfileInput.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.User.imageUrl = event.target.result
      }
    },
    upload () {
      if (this.User.imageUrl === this.oldimageUrl) {
        this.done()
        return
      }
      // 創建上傳用的formdata
      const formData = new FormData()
      const file = this.$refs.imgfileInput.files[0]
      formData.append('file-to-upload', file)
      // 圖片上傳的api url
      const uploadUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/upload`
      // 設定預設header
      axios.defaults.headers.common.Authorization = this.AdminToken
      if (this.fileUrl === '') {
        toastr.error('請選擇圖片')
        return
      }
      axios.post(uploadUrl, formData).then((res) => {
        this.User.imageUrl = res.data.imageUrl
        this.done()
      })
    },
    async UserDataCheck () {
      if (this.User.email === '' || this.User.password === '') {
        this.warningText = '請輸入使用者名稱或密碼'
        this.warningswitch = true
        return
      }
      if (this.User.email.length < 4 || this.User.password.length < 4) {
        this.warningText = '使用者名稱或密碼長度不足'
        this.warningswitch = true
        return
      }
      if (this.User.email.length > 20 || this.User.password.length > 20) {
        this.warningText = '使用者名稱或密碼長度過長'
        this.warningswitch = true
        return
      }
      if (
        this.User.email.includes(' ') ||
        this.User.password.includes(' ') ||
        this.User.username.includes(' ')
      ) {
        this.warningText = '使用者名稱或密碼不可包含空白'
        this.warningswitch = true
        return
      }
      await this.getAlldata()
      const check = Object.values(this.Alldata).filter(
        (item) => item.email === this.User.email
      )
      if (check.length > 1) {
        this.warningText = '使用者帳號已存在'
        this.warningswitch = true
      }
    }
  },
  async mounted () {
    await this.getAlldata()
    this.ThisUserID = this.$route.params.id
    this.AdminTokenCheck()
    this.getArtdata()
    this.$refs.imgfileInput.addEventListener('change', this.imagePreview)
  }
}
</script>
<style>
input[type='file'] {
  display: none;
}
</style>
