<template>
  <div class="container">
    <div class="row">
      <h1 class="mt-5">委託訂單確認</h1>
    </div>
    <div class="container">
      <div
        class="row mb-5"
        v-for="(order, index) in ThisUserOrders"
        :key="index"
      >
        <div class="col-12 p-5 bg bg-dark-subtle rounded-5">
          <div
            class="row g-5"
            v-for="(products, index) in order.products"
            :key="products.product.id + 'order' + index"
          >
            <div class="col-md-4">
              <img
                :src="products.product.imageUrl"
                class="img-fluid rounded-start-0 ratio-1x1 mh-100"
              />
            </div>
            <div class="col-md-8 d-flex flex-column">
              <div class="card-body">
                <div
                  v-if="products.product.author"
                  class="d-flex align-items-center"
                >
                  <img
                    :src="Users[products.product.author].imageUrl"
                    width="60px"
                    class="img-fluid ratio-1x1 rounded-circle"
                  />
                  <span class="mx-2 fs-4">{{
                    Users[products.product.author].title
                  }}</span>
                </div>
                <h1 class="card-title">
                  {{ products.product.title }}
                </h1>
                <p class="fs-3 text-secondary mb-0">
                  {{ products.product.description }}
                </p>
                <p class="fs-3 text-secondary">
                  {{ products.product.content }}
                </p>
              </div>
              <div class="text-center fs-2">
                <span class=""> {{ products.total }} TWD</span>
              </div>
              <div class="row gx-3">
                <div class="col-9">
                  <button
                    v-if="!order.is_paid"
                    type="button"
                    class="btn w-100 btn-primary btn-lg rounded-pill"
                    @click="Pay(order.id)"
                  >
                    前往付款
                  </button>
                </div>
                <div class="col-3">
                  <button
                    v-if="!order.is_paid"
                    type="button"
                    class="btn w-100 btn-outline-danger btn-lg rounded-pill"
                    @click="DeletOrder(order.id)"
                  >
                    刪除訂單
                  </button>
                </div>
              </div>
            </div>
            <div class="col-12">
              <h1
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapseID${order.id}`"
                aria-expanded="false"
                :aria-controls="`collapseID${order.id}`"
              >
                訂單資料<i class="bi bi-arrow-down-circle"></i>
              </h1>
              <hr />
              <div :id="`collapseID${order.id}`" class="collapse">
                <h2>Email :</h2>
                <h3>{{ order.user.email }}</h3>
                <hr />
                <h2>姓名 :</h2>
                <h3>{{ order.user.name }}</h3>
                <hr />
                <h2>收件人地址 :</h2>
                <h3>{{ order.user.address }}</h3>
                <hr />
                <h2>電話 :</h2>
                <h3>{{ order.user.tel }}</h3>
                <hr />
                <h2>付款狀態 :</h2>
                <h3
                  :class="{
                    'text-danger': !order.is_paid,
                    'text-success': order.is_paid
                  }"
                >
                  {{ order.is_paid ? '完成付款' : '尚未付款' }}
                </h3>
                <hr />
                <h2>留言訊息 :</h2>
                <h3>
                  {{ order.message ? order.message : '沒有留言' }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="card">
      {{ ThisUserOrders }}
    </div>
    <div class="" v-for="(order, index) in ThisUserOrders" :key="index + 'B'">
      <div class="card">
        <div class="card-body">
          {{ order }}
          <hr />
          {{ order.user.userid == this.userID }}
          {{ this.userID }}
          <hr />
          <h5 class="card-title">{{ item.products }}</h5>
          <div
            class=""
            v-for="(dd, index) in order.products"
            :key="index + 'C'"
          >
            {{ dd }}
          </div>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    {{ pagination }}
    <div class="card">
      <div class="" v-for="(item, index) in Users" :key="index">
        {{ item }}
        <hr />
        {{ ' index:' + index }}
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import UserState from '@/stores/UserState.js'
import axios from 'axios'
import moment from 'moment'
import tostar from 'toastr'

const state = [
  'userName',
  'userEmail',
  'userID',
  'userHasLogIn',
  'AdminToken',
  'Alldata'
]
const actions = ['checkUserLogin', 'getAlldata', 'PushUrl']
const { VITE_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      Orders: [],
      ThisUserOrders: [],
      pagination: {},
      Users: {}
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    Pay (id) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/pay/${id}`
      axios.post(url).then((response) => {
        tostar.success('付款成功')
      })
    },
    deleteOrder (id) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/orders/${id}`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios.delete(url).then((response) => {
        tostar.success('刪除成功')
      })
    },
    async getOeder () {
      axios.defaults.headers.common.Authorization = this.AdminToken
      let hasNext = true
      let page = 1
      while (hasNext) {
        const url = `${VITE_URL}/api/${VITE_API_PATH}/orders?page=${page}`
        console.log(page)
        await axios
          .get(url)
          .then((response) => {
            this.Orders = [...this.Orders, ...response.data.orders]
            this.pagination = response.data.pagination
            hasNext = response.data.pagination.has_next
            page++
          })
          .catch((err) => {
            hasNext = false
            console.log(err)
          })
      }
      this.ThisUserOrders = this.Orders.filter((order) => {
        return order.user.userid === this.userID
      })
    },
    getUsers () {
      Object.values(this.Alldata).forEach((item) => {
        if (item.category === '使用者') {
          this.Users[item.id] = item
        }
      })
    }
  },
  async mounted () {
    await this.getAlldata()
    this.getOeder()
    this.checkUserLogin()
    this.getUsers()
  },
  computed: {
    ...mapState(UserState, state),
    formattedTime (time) {
      if (time === undefined) {
        return ''
      }
      const date = new Date(time)
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
<style></style>
