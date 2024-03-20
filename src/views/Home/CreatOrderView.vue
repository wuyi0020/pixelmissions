<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="pt-3">登記方案</h1>
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-12 p-5 bg bg-dark-subtle rounded-5">
              <div class="row g-5">
                <div class="col-md-4">
                  <img
                    :src="ThisComissionData.imageUrl"
                    class="img-fluid rounded-start-0 ratio-1x1 mh-100"
                  />
                </div>
                <div class="col-md-8 d-flex flex-column">
                  <div class="card-body">
                    <h1 class="card-title">
                      {{ ThisComissionData.title }}
                    </h1>
                    <p class="fs-3 text-secondary mb-0">
                      {{ ThisComissionData.description }}
                    </p>
                    <p class="fs-3 text-secondary">
                      {{ ThisComissionData.content }}
                    </p>
                  </div>
                  <div class="text-center display-4">
                    <span class=""> {{ ThisComissionData.price }} TWD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <!-- {{ ThisComissionData }} -->
        <!-- <div class="" v-for="(item, index) in items" :key="index"></div> -->
        <!-- <button type="button" @click="createOrder">AAA</button> -->
      </div>
      <!-- <button type="button" @click="deletCart">清空購物車</button> -->
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
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3 form-floating">
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></v-field>
          <label for="email" class="floatingInput">Email</label>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人name</label>
          <v-field
            id="name"
            name="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['name'] }"
            placeholder="請輸入name"
            rules="required"
            v-model="form.user.name"
          ></v-field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人phone</label>
          <v-field
            id="tel"
            name="phone"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['phone'] }"
            placeholder="請輸入phone"
            rules="required|min:8|max:10"
            v-model="form.user.tel"
          ></v-field>
          <error-message name="phone" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人address</label>
          <v-field
            id="address"
            name="address"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['address'] }"
            placeholder="請輸入address"
            rules="required"
            v-model="form.user.address"
          ></v-field>
          <error-message
            name="address"
            class="invalid-feedback"
          ></error-message>
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
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "pinia";
// import { cartStore } from "../store/cartStore.js";
import * as VeeValidate from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
// import toastr from 'toastr'

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
      ThisComissionData: {}
    }
  },
  methods: {
    // 紀錄 把流程改成 按下購買 帶著物品ID進到購物車頁面 填完表單 按下結帳 直接加入購物車再結帳 這樣就不會有問題 外部的購物車改成用產品API 儲存購物車資料
    // {category: cart , cart : [userid : {productid: {qty: 1} , productid: {qty: 1}}, userid : {productid: {qty: 1}}]}
    ...mapActions(UserState, actions),
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
        .then((response) => {
          console.log(response.data)
          return axios.post(orderurl, {
            data: {
              user: this.form.user,
              message: this.form.message,
              createUser: this.userID,
              forauthor: authorid
            }
          })
        })
        .then((response) => {
          console.log(response.data)
          toastr.success('已創建訂單')
        })
      // axios.get(url).then((response) => {
      //   console.log(response.data.data.carts)
      // })
    },
    deletCart () {
      const carturl = `${VITE_URL}/api/${VITE_API_PATH}/admin/orders/all`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios.delete(carturl).then((response) => {
        console.log(response.data)
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
    ErrorMessage: VeeValidate.ErrorMessage
  }
}
</script>

<style>
.butAdd {
  width: 30px;
  height: 30px;
}
</style>
