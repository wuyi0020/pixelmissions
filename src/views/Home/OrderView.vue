<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  />
  <div class="container">
    <div class="row">
      <h3 class="mt-5">委託訂單確認</h3>
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
                alt="方案"
                @load="loadDone"
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
                    alt="作者"
                  />
                  <span class="mx-2 h3">{{
                    Users[products.product.author].title
                  }}</span>
                </div>
                <p class="card-title h3 my-2">
                  {{ products.product.title }}
                </p>
                <p class="mb-0 my-2">
                  {{ products.product.description }}
                </p>
                <p class="">
                  {{ products.product.content }}
                </p>
              </div>
              <div class="mb-5">
                <span class="fs-2"> {{ products.total }} TWD</span>
                <span v-if="order.is_paid" class="ms-2 text-success-emphasis"
                  >(付款完成)</span
                >
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
                    @click="deleteOrder(order.id)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-12">
              <h3
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapseID${order.id}`"
                aria-expanded="false"
                :aria-controls="`collapseID${order.id}`"
              >
                訂單資料 <i class="bi bi-arrow-down-circle"></i>
              </h3>
              <hr />
              <div :id="`collapseID${order.id}`" class="collapse">
                <h3>Email :</h3>
                <p>{{ order.user.email }}</p>
                <hr />
                <h3>姓名 :</h3>
                <p>{{ order.user.name }}</p>
                <hr />
                <h3>收件人地址 :</h3>
                <p>{{ order.user.address }}</p>
                <hr />
                <h3>電話 :</h3>
                <p>{{ order.user.tel }}</p>
                <hr />
                <h3>付款狀態 :</h3>
                <p
                  :class="{
                    'text-danger': !order.is_paid,
                    'text-success': order.is_paid
                  }"
                >
                  {{ order.is_paid ? '完成付款' : '尚未付款' }}
                </p>
                <hr />
                <h3>留言訊息 :</h3>
                <p>
                  {{ order.message ? order.message : '沒有留言' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import UserState from '@/stores/UserState.js'
import axios from 'axios'
import moment from 'moment'
import tostar from 'toastr'
import Loading from 'vue-loading-overlay'

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
      Users: {},
      isLoading: true
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions(UserState, actions),
    Pay (id) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/pay/${id}`
      axios
        .post(url)
        .then((response) => {
          tostar.success('付款成功')
        })
        .then(() => {
          this.Orders = []
          this.getOeder()
        })
    },
    deleteOrder (id) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/order/${id}`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios
        .delete(url)
        .then((response) => {
          tostar.success('刪除成功')
        })
        .then(() => {
          this.Orders = []
          this.getOeder()
        })
    },
    async getOeder () {
      axios.defaults.headers.common.Authorization = this.AdminToken
      let hasNext = true
      let page = 1
      while (hasNext) {
        const url = `${VITE_URL}/api/${VITE_API_PATH}/orders?page=${page}`
        await axios
          .get(url)
          .then((response) => {
            this.Orders = [...this.Orders, ...response.data.orders]
            this.pagination = response.data.pagination
            hasNext = response.data.pagination.has_next
            page++
          })
          .catch(() => {
            hasNext = false
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
    },
    loadDone () {
      this.isLoading = false
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
