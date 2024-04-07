<template>
  <!-- <VueLoading :active="isLoading" :z-index="1060" /> -->
  <div class="container">
    <div class="col-12">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th class="d-none d-lg-table-cell">Email</th>
            <th>購買方案</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in orders" :key="item.id">
            <tr
              v-if="orders.length"
              :class="{ 'text-secondary': !item.is_paid }"
            >
              <td>{{ formatDate(item.create_at) }}</td>
              <td class="d-none d-lg-table-cell">
                <span v-text="item.user.email" v-if="item.user"></span>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="product in item.products" :key="product.id">
                    {{ product.product.title }}
                  </li>
                </ul>
              </td>
              <td class="text-right">
                {{ item.total }}
              </td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`paidSwitch${item.id}`"
                    v-model="item.is_paid"
                    @change="updatePaid(item)"
                  />
                  <label class="form-check-label" :for="`paidSwitch${item.id}`">
                    <span v-if="item.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </td>

              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="openModal(item)"
                  >
                    檢視
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="openDelOrderModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pagination.current }">
            <button
              type="button"
              class="page-link"
              @click="nextPage(pagination.current - 1)"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li
            class="page-item"
            v-for="page in pagination.totalPage"
            :key="page"
            :class="{ active: page === pagination.currentPage }"
          >
            <button class="page-link" @click="nextPage(page - 1)" type="button">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: !pagination.hasNext }">
            <button
              type="button"
              class="page-link"
              @click="nextPage(pagination.current + 1)"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div
    class="modal"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">確認刪除</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除此產品嗎？</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteOrderConfirm()"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal"
    id="OrderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>留言</th>
                    <td>{{ tempOrder.user.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ formatDate(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ formatDate(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ tempOrder.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updatePaid(tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import tostar from 'toastr'
import axios from 'axios'
import UserState from '@/stores/UserState.js'
import moment from 'moment'
import { Modal } from 'bootstrap'
const { VITE_URL, VITE_API_PATH } = import.meta.env
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {},
  methods: {
    ...mapActions(UserState, ['getCookie']),
    getOrders () {
      axios.defaults.headers.common.Authorization =
        this.getCookie('DashbordAdminToken')
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/orders?page=${this.currentPage}`
      axios
        .get(url)
        .then((res) => {
          this.orders = res.data.orders
        })
        .catch(() => {
          tostar.error('取得訂單失敗')
        })
    },
    formatDate (date) {
      return moment(date * 1000).format('YYYY-MM-DD')
    },
    updatePaid (item) {
      this.isLoading = true
      const api = `${VITE_URL}/api/${VITE_API_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      const orderModal = Modal.getInstance(
        document.getElementById('OrderModal')
      )
      axios.defaults.headers.common.Authorization =
        this.getCookie('DashbordAdminToken')
      axios
        .put(api, { data: paid })
        .then(() => {
          tostar.success('更新付款狀態成功')
          if (orderModal) {
            orderModal.hide()
          }
          this.getOrders(this.currentPage)
        })
        .catch(() => {
          tostar.error('更新付款狀態失敗')
        })
    },
    openDelOrderModal (item) {
      this.tempOrder = item
      const deleteModal = new Modal(document.getElementById('deleteModal'), {
        keyboard: false
      })
      deleteModal.show()
    },
    deleteOrderConfirm () {
      const api = `${VITE_URL}/api/${VITE_API_PATH}/admin/order/${this.tempOrder.id}`
      axios.defaults.headers.common.Authorization =
        this.getCookie('DashbordAdminToken')
      axios
        .delete(api)
        .then(() => {
          tostar.success('刪除訂單成功')
          this.getOrders(this.currentPage)
        })
        .catch(() => {
          tostar.error('刪除訂單失敗')
        })
      const deleteModal = Modal.getInstance(
        document.getElementById('deleteModal')
      )
      deleteModal.hide()
    },
    openModal (item) {
      const orderModal = new Modal(document.getElementById('OrderModal'), {
        keyboard: false
      })
      this.tempOrder = item
      orderModal.show()
    }
  },
  computed: {
    ...mapState(UserState, ['AdminToken'])
  },
  mounted () {
    this.getOrders()
  }
}
</script>
