<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-6">
        <div class="card mt-3">
          <div class="card-body">
            <h1 class="card-title">
              <span v-if="art.category === '作品'">編輯作品</span>
              <span v-if="art.category === '報價'">編輯方案</span>
            </h1>
            <div
              class="justify-content-center"
              :class="{
                'd-none': art.imageUrl !== '',
                'd-flex': art.imageUrl === ''
              }"
            >
              <div
                :class="{
                  'col-12 col-md-6 col-lg-3': art.imageUrl == '',
                  'col-12 col-md-9 col-lg-6': !(art.imageUrl == '')
                }"
              >
                <div
                  class="d-flex justify-content-center mw-100 ratio ratio-1x1"
                  :class="{ uploadStyle: art.imageUrl == '' }"
                >
                  <label
                    class="d-flex justify-content-center align-items-center btn btn-outline-secondary rounded-3"
                  >
                    <input type="file" ref="imgfileInput" id="fileInput" />
                    <h1
                      class="m-0 p-0"
                      :class="{
                        'd-block': art.imageUrl == '',
                        'd-none': !(art.imageUrl == '')
                      }"
                    >
                      +
                    </h1>
                    <img
                      :src="art.imageUrl"
                      ref="imagePreview2"
                      class="mw-100 ratio-1x1"
                      alt="上傳圖片"
                    />
                  </label>
                </div>
              </div>
            </div>
            <img
              v-if="art.imageUrl"
              class="card-img-top ratio-1x1"
              :src="art.imageUrl"
              alt="作品圖片"
            />
            <div class="mt-3 d-flex justify-content-center">
              <button
                type="button"
                class="w-100 btn btn-danger btn-lg"
                @click="art.imageUrl = ''"
              >
                刪除圖片
              </button>
            </div>
            <div class="mt-3">
              <label class="fs-1">
                <span v-if="art.category === '作品'">作品名稱：</span>
                <span v-if="art.category === '報價'">方案名稱：</span>
              </label>
              <input
                type="text"
                class="form-control fs-3"
                placeholder="作品名稱"
                v-model="art.title"
              />
            </div>
            <div class="mt-3">
              <label class="fs-1">
                <span v-if="art.category === '作品'">作品描述</span>
                <span v-if="art.category === '報價'">方案描述</span>
              </label>
              <input
                type="text"
                class="form-control fs-3"
                placeholder="作品描述"
                v-model="art.description"
              />
            </div>
            <div v-if="art.category === '報價'" class="mt-3">
              <label class="fs-1">
                <span>方案價格</span>
              </label>
              <input
                type="text"
                class="form-control fs-3"
                placeholder="方案價格"
                v-model="art.price"
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
      art: {},
      artAuthor: '',
      artID: '',
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
      this.art = this.Alldata[this.artID]
      this.artAuthor = this.Alldata[this.artID].author
      this.oldimageUrl = this.Alldata[this.artID].imageUrl
      if (this.artAuthor !== this.userID) {
        this.$router.push(`/usercenter/${this.userID}`)
      }
    },
    cancel () {
      if (this.art.category === '作品') {
        this.$router.push(`/dashboard/art/${this.userID}`)
      }
      if (this.art.category === '報價') {
        this.$router.push(`/dashboard/comission/${this.userID}`)
      } else {
        this.$router.push(`/usercenter/${this.userID}`)
      }
    },
    done () {
      this.setAdminToken()
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.artID}`
      axios.defaults.headers.common.Authorization = this.AdminToken

      axios
        .put(url, { data: this.art })
        .then(() => {
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
        this.art.imageUrl = event.target.result
      }
    },
    upload () {
      if (this.art.imageUrl === this.oldimageUrl) {
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
      axios
        .post(uploadUrl, formData)
        .then((res) => {
          this.art.imageUrl = res.data.imageUrl
          this.done()
        })
    }
  },
  async mounted () {
    await this.getAlldata()
    this.AdminTokenCheck()
    this.getArtdata()
    this.artID = this.$route.params.id
    this.$refs.imgfileInput.addEventListener('change', this.imagePreview)
  }
}
</script>
<style>
input[type='file'] {
  display: none;
}
</style>
