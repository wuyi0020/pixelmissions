<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  />
  <div class="container">
    <div class="row">
      <div class="col-12 pt-5">
        <router-link
          :to="{
            name: 'ComissionView',
            params: { userid: `${ThisComissionData.id}` }
          }"
          class="link-underline link-underline-opacity-0 text-white"
        >
          <div class="d-flex align-items-center">
            <i class="bi bi-caret-left-fill fs-1 text-white-50"></i>
            <p class="h3 m-0">登記方案</p>
          </div>
        </router-link>
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-12 p-5 pb-0 pb-md-5 bg bg-dark-subtle rounded-5">
              <div class="row g-5">
                <div class="col-md-4">
                  <img
                    :src="ThisComissionData.imageUrl"
                    class="img-fluid rounded-start-0 ratio-1x1 mh-100"
                    alt="方案"
                    @load="loadDone"
                  />
                </div>
                <div class="col-md-8 d-flex flex-column">
                  <div class="card-body">
                    <h3 class="card-title h3">
                      {{ ThisComissionData.title }}
                    </h3>
                    <p class="text-secondary mb-0">
                      {{ ThisComissionData.description }}
                    </p>
                    <p class="text-secondary">
                      {{ ThisComissionData.content }}
                    </p>
                  </div>
                  <div class="mb-5">
                    <span class=""> {{ ThisComissionData.price }} TWD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 class="my-2">登記資料</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <v-form
        ref="form"
        class="col-md-8 col-lg-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">電子郵件 *</label>
          <v-field
            id="email"
            name="電子郵件"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['電子郵件'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></v-field>
          <error-message
            name="電子郵件"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人名稱 *</label>
          <v-field
            id="name"
            name="收件人"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['收件人'] }"
            placeholder="請輸入名稱"
            rules="required"
            v-model="form.user.name"
          ></v-field>
          <error-message name="收件人" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話 *</label>
          <v-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10"
            v-model="form.user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址 *</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import * as VeeValidate from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import Loading from 'vue-loading-overlay'

import axios from 'axios'

import toastr from 'toastr'
const { VITE_URL, VITE_API_PATH } = import.meta.env

const state = [
  'userName',
  'userEmail',
  'userID',
  'userHasLogIn',
  'AdminToken',
  'Alldata'
]
const actions = [
  'checkUserLogin',
  'UserLogout',
  'getAlldata',
  'PushUrl',
  'setAdminToken'
]

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
  data () {
    return {
      total: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          userid: '',
          forauthor: ''
        },
        message: ''
      },
      ThisComissionData: {},
      isLoading: true
    }
  },
  methods: {
    // 紀錄 把流程改成 按下購買 帶著物品ID進到購物車頁面 填完表單 按下結帳 直接加入購物車再結帳 這樣就不會有問題 外部的購物車改成用產品API 儲存購物車資料
    // {category: cart , cart : [userid : {productid: {qty: 1} , productid: {qty: 1}}, userid : {productid: {qty: 1}}]}
    ...mapActions(UserState, actions),
    loadDone () {
      this.isLoading = false
    },
    async createOrder () {
      const Thisproductid = this.$route.params.id
      const authorid = this.Alldata[Thisproductid].author
      const carturl = `${VITE_URL}/api/${VITE_API_PATH}/cart`
      const orderurl = `${VITE_URL}/api/${VITE_API_PATH}/order`
      this.form.user.userid = this.userID
      this.form.user.forauthor = authorid
      axios
        .post(carturl, {
          data: {
            product_id: Thisproductid,
            qty: 1
          }
        })
        .then(() => {
          return axios.post(orderurl, {
            data: {
              user: this.form.user,
              message: this.form.message,
              createUser: this.userID,
              forauthor: authorid
            }
          })
        })
        .then(() => {
          toastr.success('已創建訂單')
          this.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
              userid: '',
              forauthor: ''
            },
            message: ''
          }
        })
        .then(() => {
          this.$router.push({ name: 'Order' })
        })
    },
    deletCart () {
      const carturl = `${VITE_URL}/api/${VITE_API_PATH}/admin/orders/all`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios.delete(carturl).then(() => {
        toastr.success('已刪除購物車')
      })
    },
    getThisComission () {
      this.ThisComissionData = this.Alldata[this.$route.params.id]
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  async mounted () {
    this.setAdminToken()
    this.checkUserLogin()
    await this.getAlldata()
    this.getThisComission()
  },
  components: {
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage: VeeValidate.ErrorMessage,
    Loading
  }
}
</script>

<style>
.butAdd {
  width: 30px;
  height: 30px;
}
</style>
