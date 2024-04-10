<template>
  <div class="home">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    <div class="container-fluid bg bg-light bg-opacity-50 bg-summer">
      <div class="row vh-50 align-content-center m-0">
        <div class="col-12">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12">
                <div
                  class="position-relative w-100 h-100 bg-black bg-opacity-25 p-5"
                >
                  <p class="d-none d-sm-block fs-3 text-break mw-100 fw-bold">
                    累積粉絲 尋找合作機會？
                  </p>
                  <p class="fs-3 d-sm-none text-break mw-100 fw-bold lh-1 mb-2">
                    累積粉絲
                  </p>
                  <p class="fs-3 d-sm-none text-break mw-100 fw-bold lh-1">
                    尋找合作機會？
                  </p>
                  <p class="fs-3 d-none d-sm-block text-break mw-100 fw-bold">
                    趕快右上登入使用 Pixel Missions 滿足這一切
                  </p>
                  <p class="fs-3 d-sm-none text-break mw-100 fw-bold lh-1 mb-2">
                    趕快右上登入使用
                  </p>
                  <p class="fs-3 d-sm-none text-break mw-100 fw-bold lh-1 mb-2">
                    Pixel Missions
                  </p>
                  <p class="fs-3 d-sm-none text-break mw-100 fw-bold lh-1">
                    滿足這一切
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <h3>推薦作品</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 p-0">
          <swiper
            :style="{
              '--swiper-navigation-color': '#6ea8fe',
              '--swiper-pagination-color': '#6ea8fe'
            }"
            :lazy="true"
            :slidesPerView="'auto'"
            :spaceBetween="20"
            navigation
            :pagination="{
              clickable: true
            }"
            :scrollbar="{ draggable: true }"
            :modules="modules"
            class="mySwiper"
            :breakpoints="swiperOptions.breakpoints"
          >
            <template v-for="item in products" :key="item.id">
              <swiper-slide>
                <ArtComponent
                  :item="item"
                  :showAuthor="true"
                  :datas="Alldata"
                  @loadDone="loadDone"
                />
              </swiper-slide>
            </template>
          </swiper>
        </div>
      </div>
    </div>
    <div class="container-fluid bg bg-dark-subtle">
      <div class="row min-vh-50 align-content-center">
        <div class="col-12 py-4">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-4 text-center">
                <div>
                  <img
                    src="/resources/transistor-physician-giving-a-prescription-and-pill.png"
                    class="object-fit-cover object-position-50 aspect-ratio-1x1 w-100"
                    alt="找不到人合作?"
                  />
                </div>
                <h3 class="fw-bold mb-3">找不到人合作?</h3>
                <p>成千上萬的人在這裡分享作品，尋找合作機會</p>
              </div>
              <div class="col-12 col-md-4 text-center">
                <div>
                  <img
                    src="/resources/transistor-boy-and-girl-drawing-at-the-childrens-table.png"
                    class="object-fit-scale object-position-50 aspect-ratio-1x1 w-100"
                    alt="想累積粉絲?"
                  />
                </div>
                <h3 class="fw-bold mb-3">想累積粉絲?</h3>
                <p>將你的作品分享出來，這裡有無數志同道合的朋友</p>
              </div>
              <div class="col-12 col-md-4 text-center">
                <div>
                  <img
                    src="/resources/transistor-autumn-walk.png"
                    class="object-fit-cover object-position-50 aspect-ratio-1x1 w-100"
                    alt="約稿沒保障?"
                  />
                </div>
                <h3 class="fw-bold mb-3">約稿沒保障?</h3>
                <p class="m-0">這裡有合理的交易流程，</p>
                <p>由我們把關每筆交易，讓我們成為你的傘</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <h3>推薦作者</h3>
        </div>
      </div>
      <div
        class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-0 g-md-2 gx-lg-4"
      >
        <div
          v-for="item in authors"
          :key="item.id"
          class="rounded-bottom col ratio-1x1"
        >
          <ArtComponent :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import UserState from '@/stores/UserState.js'
import ArtComponent from '@/components/ArtComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import Loading from 'vue-loading-overlay'
import 'swiper/scss'
import 'swiper/css/bundle'

const { VITE_URL, VITE_API_PATH } = import.meta.env

const actions = [
  'PushUrl',
  'setAdminToken',
  'checkUserLogin',
  'checkUserhasArt',
  'getAlldata'
]

export default {
  components: {
    ArtComponent,
    Swiper,
    SwiperSlide,
    Loading
  },
  data () {
    return {
      fullPage: true,
      products: [],
      authors: [],
      page: {},
      AuthorPage: {},
      isloadDone: false,
      isLoading: true,
      modules: [Navigation, Pagination, Scrollbar, A11y],
      swiperOptions: {
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    getData (page = 1) {
      const url = `${VITE_URL}/api/${VITE_API_PATH}/products?category=作品&page=${page}`
      axios.get(url).then((response) => {
        this.products = response.data.products
        this.page = response.data.pagination
      })
    },
    async getAuthorData (page = 1) {
      await this.setAdminToken()
      await this.checkUserhasArt()
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/products?category=使用者&page=${page}`
      axios.defaults.headers.common.Authorization = this.AdminToken
      axios
        .get(url)
        .then((response) => {
          this.authors = response.data.products
          this.AuthorPage = response.data.pagination
        })
        .then(() => {
          if (
            Object.values(this.authors).length < 5 &&
            this.AuthorPage.has_next
          ) {
            this.authors = Object.values(this.authors).filter((item) => {
              return item.ArtQuantity > 0
            })
            this.getAuthorData(page + 1)
          } else {
            this.authors = Object.values(this.authors).filter((item) => {
              return item.ArtQuantity > 0
            })
          }
        })
    },
    loadDone () {
      this.isLoading = false
    }
  },
  async mounted () {
    await this.getAlldata()
    this.getData()
    this.getAuthorData()
  },
  computed: {
    ...mapState(UserState, ['userHasLogIn', 'AdminToken', 'Alldata'])
  }
}
</script>

<style>
/* 修正swiper在576px以下會出錯 */
@media (max-width: 576px) {
  .swiper {
    box-sizing: border-box;
    padding: 0 1rem;
    width: 100% !important;
    max-width: 100vw !important;
  }
}
.swiper-button-next {
  right: 20px;
  font-weight: 900;
}

.swiper-button-prev {
  font-weight: 900;
  left: 20px;
}
</style>
