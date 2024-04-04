<template>
  <div class="container">
    <div class="d-flex flex-wrap">
      <div class="col-12 col">
        <h2
          type="button"
          class="my-5"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#collapseArtwork"
          aria-controls="collapseArtwork"
        >
          作品列表 <i class="bi bi-arrow-down-circle"></i>
        </h2>
        <hr />
        <div class="collapse" id="collapseArtwork">
          <div class="d-flex flex-wrap collapse">
            <div class="col-12">
              <table class="w-100">
                <thead class="border-bottom">
                  <tr>
                    <th>作品名稱</th>
                    <th>作品圖片</th>
                    <th>作品描述</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in Artwork" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>
                      <img
                        :src="item.imageUrl"
                        alt="作品圖片"
                        width="200"
                        class="mw-100"
                      />
                    </td>
                    <td>{{ item.description }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click.prevent="editProduct(item)"
                      >
                        編輯
                      </button>
                      <button
                        class="btn btn-outline-danger my-2"
                        @click.prevent="deletProduct(item)"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="col-12 col">
        <h2
          type="button"
          class="my-5"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#collapseComission"
          aria-controls="collapseComission"
        >
          方案列表 <i class="bi bi-arrow-down-circle"></i>
        </h2>
        <hr />
        <div class="collapse" id="collapseComission">
          <div class="d-flex flex-wrap">
            <div class="col-12">
              <table class="w-100">
                <thead class="border-bottom">
                  <tr>
                    <th>方案名稱</th>
                    <th>方案圖片</th>
                    <th>方案描述</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in ComissionList" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>
                      <img
                        :src="item.imageUrl"
                        alt="方案圖片"
                        width="200"
                        class="mw-100"
                      />
                    </td>
                    <td>{{ item.description }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click.prevent="editProduct(item)"
                      >
                        編輯
                      </button>
                      <button
                        class="btn btn-outline-danger my-2"
                        @click.prevent="deletProduct(item)"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="col-12 col">
        <h2
          type="button"
          class="my-5"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#collapseUser"
          aria-controls="collapseUser"
        >
          使用者列表 <i class="bi bi-arrow-down-circle"></i>
        </h2>
        <hr />
        <div class="collapse" id="collapseUser">
          <div class="d-flex flex-wrap">
            <div class="col-12">
              <table class="w-100">
                <thead class="border-bottom">
                  <tr>
                    <th>使用者名稱</th>
                    <th>使用者圖片</th>
                    <th>使用者描述</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in UserList" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>
                      <img
                        :src="item.imageUrl"
                        alt="使用者圖片"
                        width="200"
                        class="mw-100"
                      />
                    </td>
                    <td>{{ item.description }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click.prevent="editProduct(item)"
                      >
                        編輯
                      </button>
                      <button
                        class="btn btn-outline-danger my-2"
                        @click.prevent="deletProduct(item)"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal h-100 fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog h-100">
        <div class="modal-content h-100">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">修改產品</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body h-100">
            <div class="row align-items-center mb-2">
              <img
                :src="tempProduct.imageUrl"
                alt="修改圖片"
                width="200"
                class="mw-100 col-12"
              />
            </div>
            <div class="row align-items-center mb-2">
              <label for="title" class="col-2">名稱 : </label>
              <input
                type="text"
                id="title"
                class="col-10"
                v-model="tempProduct.title"
              />
            </div>
            <div class="row align-items-center mb-2">
              <label for="description" class="col-2">描述 : </label>
              <input
                type="text"
                id="description"
                class="col-10"
                v-model="tempProduct.description"
              />
            </div>
            <div class="row align-items-center mb-2">
              <label for="AuthorID" class="col-2">作者ID : </label>
              <input
                v-if="
                  tempProduct.category === '作品' ||
                  tempProduct.category === '報價'
                "
                type="text"
                id="AuthorID"
                class="col-10"
                v-model="tempProduct.author"
              />
              <input
                v-if="tempProduct.category === '使用者'"
                type="text"
                id="AuthorID"
                class="col-10"
                v-model="tempProduct.id"
              />
            </div>
            <div class="row align-items-center mb-2">
              <label for="imageUrl" class="col-3">圖片連結 : </label>
              <textarea
                type="text"
                id="imageUrl"
                class="col-9"
                v-model="tempProduct.imageUrl"
              ></textarea>
            </div>
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
              class="btn btn-primary"
              @click="editProductSave()"
            >
              儲存改變
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
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
              @click="deleteProductConfirm()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import { Modal } from 'bootstrap'
import axios from 'axios'
const { VITE_URL, VITE_API_PATH } = import.meta.env
const state = [
  'userName',
  'userEmail',
  'userID',
  'userHasLogIn',
  'AdminToken',
  'Alldata'
]
const actions = ['getAlldata', 'getCookie']
let editModal = null
let deletModal = null
export default {
  data () {
    return {
      tempProduct: {},
      Artwork: {},
      UserList: {},
      ComissionList: {}
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    async GetData () {
      await this.getAlldata(true)
      Object.values(this.Alldata).forEach((item) => {
        if (item.category === '作品') {
          this.Artwork[item.id] = item
        } else if (item.category === '使用者') {
          this.UserList[item.id] = item
        } else if (item.category === '報價') {
          this.ComissionList[item.id] = item
        }
      })
    },
    editProduct (item) {
      editModal.show()
      this.tempProduct = { ...item }
    },
    editProductSave () {
      const product = JSON.parse(this.tempProduct)
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${product.id}`
      axios.defaults.headers.common.Authorization =
        this.getCookie('DashbordAdminToken')

      axios
        .put(url, { data: product })
        .then((response) => {
          toastr.success('修改成功')

          editModal.hide()
        })
        .catch(() => {
          toastr.error('修改失敗')
        })
      this.getAlldata(true)
    },
    deletProduct (item) {
      deletModal.show()
      this.tempProduct = { ...item }
    },
    deletProductConfirm () {
      const key = this.tempProduct.id
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${key}`
      axios.defaults.headers.common.Authorization =
        this.getCookie('DashbordAdminToken')
      axios
        .delete(url)
        .then(() => {
          this.getAlldata(true)
          toastr.success('刪除成功')
        })
      deletModal.hide()
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  mounted () {
    this.GetData()
    editModal = new Modal(document.getElementById('editModal'), {
      keyboard: true,
      backdrop: 'static'
    })
    deletModal = new Modal(document.getElementById('deleteModal'), {
      keyboard: true,
      backdrop: 'static'
    })
  }
}
</script>

<style lang="scss" scoped></style>
