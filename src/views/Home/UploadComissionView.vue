<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        <h1>上傳報價</h1>
      </div>
      <div class="justify-content-center align-items-center flex-column d-flex">
        <div
          :class="{
            'col-12 col-md-6 col-lg-3': fileUrl == '',
            'col-12 col-md-9 col-lg-6': !(fileUrl == '')
          }"
        >
          <div
            class="d-flex justify-content-center mw-100 ratio ratio-1x1"
            :class="{ uploadStyle: fileUrl == '' }"
          >
            <label
              class="d-flex justify-content-center align-items-center btn btn-outline-secondary rounded-3"
              :class="{ 'border-danger-subtle': fileError }"
            >
              <img
                :src="fileUrl"
                ref="imagePreview2"
                class="mw-100 ratio-1x1"
              />
              <input type="file" ref="imgfileInput" id="fileInput" />
              <h1
                class="m-0 p-0"
                :class="{
                  'd-block': fileUrl == '',
                  'd-none': !(fileUrl == ''),
                  'text-danger': fileError
                }"
              >
                +
              </h1>
            </label>
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-6 text-center">
          <p
            class="w-100 text-danger-emphasis mt-3 mb-0"
            :class="{ 'd-none': !fileError }"
          >
            需要上傳圖片
          </p>
        </div>
        <div class="col-12 col-md-9 col-lg-6 text-center">
          <p
            class="w-100 text-secondary mt-3 mb-0"
            :class="{
              'text-secondary': !fileError,
              'text-danger-emphasis ': fileError
            }"
          >
            檔案大小限制為 3MB 以下，接受格式為 jpg jpeg png
          </p>
        </div>
      </div>
    </div>

    <hr />
    <div class="row justify-content-center">
      <v-form
        class="col-12 col-md-9 col-lg-6 text-center"
        ref="form"
        v-slot="{ errors }"
        @submit="uploadPrduct"
      >
        <div class="input-group mb-3">
          <span class="input-group-text">報價單名稱</span>
          <v-field
            id="title"
            name="報價單名稱"
            type=""
            class="form-control"
            :class="{ 'is-invalid': errors['報價單名稱'] }"
            placeholder="報價單名稱"
            rules="required"
            v-model="ArtData.title"
          ></v-field>

          <error-message
            name="報價單名稱"
            class="invalid-feedback"
          ></error-message>
          <!-- <v-field  class="form-control" v-model="ArtData.title"></v-field> -->
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">報價單描述</span>
          <v-field
            id="description"
            name="報價單簡單描述"
            type=""
            :class="{ 'is-invalid': errors['報價單簡單描述'] }"
            class="form-control"
            placeholder="報價單簡單描述"
            rules="required"
            v-model="ArtData.description"
          ></v-field>
          <error-message
            name="報價單簡單描述"
            class="invalid-feedback"
          ></error-message>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">報價單內容</span>
          <v-field
            id="content"
            name="報價單內容"
            type=""
            :class="{ 'is-invalid': errors['報價單內容'] }"
            class="form-control"
            placeholder="報價單內容"
            rules="required"
            v-model="ArtData.content"
          ></v-field>
          <error-message
            name="報價單內容"
            class="invalid-feedback"
          ></error-message>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">約稿價格</span>
          <v-field
            id="price"
            name="約稿價格"
            type="number"
            :class="{ 'is-invalid': errors['約稿價格'] }"
            class="form-control"
            placeholder="約稿價格"
            rules="required"
            v-model="ArtData.price"
          ></v-field>
          <span class="input-group-text">TWD</span>
          <error-message
            name="約稿價格"
            class="invalid-feedback"
          ></error-message>
        </div>
        <button class="btn btn-primary w-100 rounded-pill" type="submit">
          上傳
        </button>
      </v-form>
    </div>
    <div class="row justify-content-center"></div>
    <div id="imagePreview"></div>
  </div>
</template>
<script>
// axios

import axios from 'axios'
import UserState from '@/stores/UserState.js'
import { mapState, mapActions } from 'pinia'
import toastr from 'toastr'

import * as VeeValidate from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
const { VITE_URL, VITE_API_PATH } = import.meta.env
const state = ['AdminToken', 'userID']
const actions = ['setAdminToken', 'checkUserLogin']

Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule])
})
VeeValidateI18n.localize({
  zh_TW: zhTW
})
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true
})

export default {
  components: {
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage: VeeValidate.ErrorMessage
  },
  data () {
    return {
      fileUrl: '',
      fileError: false,
      ArtData: {
        author: '',
        category: '報價',
        content: '',
        description: '',
        imageUrl: '',
        is_enabled: 1,
        like: 0,
        sublist: [],
        origin_price: 0,
        price: 0,
        time: 0,
        title: '',
        unit: 'TWD'
      }
    }
  },
  mounted () {
    // const fileInput = document.getElementById("fileInput");
    this.$refs.imgfileInput.addEventListener('change', this.imagePreview)
    this.setAdminToken()
    this.checkUserLogin()
  },
  methods: {
    ...mapActions(UserState, actions),
    imagePreview () {
      const file = this.$refs.imgfileInput.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.fileUrl = event.target.result
      }
    },
    filechack () {
      if (this.fileUrl === '') {
        this.fileError = true
        // toastr.error("請選擇圖片");
      }
    },
    uploadPrduct () {
      // 創建上傳用的formdata
      const formData = new FormData()
      const file = this.$refs.imgfileInput.files[0]
      formData.append('file-to-upload', file)
      // 圖片上傳的api url
      const uploadUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/upload`
      const uploadArtUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/product`
      // 設定預設header
      axios.defaults.headers.common.Authorization = this.AdminToken
      this.ArtData.author = this.userID
      this.ArtData.time = new Date().getTime()
      console.log(this.ArtData)
      if (this.fileUrl === '') {
        this.fileError = true
        // toastr.error("請選擇圖片");
        return
      }

      axios
        .post(uploadUrl, formData)
        .then((res) => {
          this.fileUrl = res.data.imageUrl
          this.ArtData.imageUrl = res.data.imageUrl
          console.log(this.ArtData)
          return axios.post(uploadArtUrl, { data: this.ArtData })
        })
        .then((res) => {
          console.log(res)
          this.$router.push(`/usercenter/${this.userID}`)
          toastr.success('上傳成功')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(UserState, state)
  }
}
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';
.uploadStyle.ratio-1x1 {
  @include media-breakpoint-down(md) {
    --bs-aspect-ratio: 33%; // 1:3
  }
  @include media-breakpoint-between(md, lg) {
    --bs-aspect-ratio: 50%; // 1:3
  }
}
input[type='file'] {
  display: none;
}
</style>
