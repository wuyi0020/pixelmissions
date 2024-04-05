<template>
  <div class="home">
    <div class="container-fluid bg bg-light bg-opacity-50 bg-summer">
      <div class="row vh-50 align-content-center m-0">
        <!-- <div
          v-if="!userHasLogIn"
          class="col-12 pt-3 text-end bg-body-secondary"
        >
          <h1>還沒註冊？註冊取得所有功能<i class="bi bi-arrow-up"></i></h1>
        </div> -->
        <div class="col-12">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12">
                <h3 class="h3 pt-5 text-break mw-100">
                  累積粉絲 尋找合作機會？
                </h3>
                <h3 class="h3 pb-5 text-break mw-100">
                  使用 Pixel Missions 滿足這一切
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <h1>推薦作品</h1>
        </div>
      </div>
      <swiper
        :slidesPerView="'auto'"
        :spaceBetween="20"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper"
        :breakpoints="swiperOptions.breakpoints"
      >
        <template v-for="item in products" :key="item.id">
          <swiper-slide>
            <ArtComponent :item="item" :showAuthor="true" :datas="Alldata" />
          </swiper-slide>
        </template>
      </swiper>
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
                <h1>找不到人合作?</h1>
                <h3>成千上萬的人在這裡分享作品，尋找合作機會</h3>
              </div>
              <div class="col-12 col-md-4 text-center">
                <div>
                  <img
                    src="/resources/transistor-boy-and-girl-drawing-at-the-childrens-table.png"
                    class="object-fit-scale object-position-50 aspect-ratio-1x1 w-100"
                    alt="想累積粉絲?"
                  />
                </div>
                <h1>想累積粉絲?</h1>
                <h3>將你的作品分享出來，這裡有無數志同道合的朋友</h3>
              </div>
              <div class="col-12 col-md-4 text-center">
                <div>
                  <img
                    src="/resources/transistor-autumn-walk.png"
                    class="object-fit-cover object-position-50 aspect-ratio-1x1 w-100"
                    alt="約稿沒保障?"
                  />
                </div>
                <h1>約稿沒保障?</h1>
                <h3>
                  這裡有合理的交易流程，由我們把關每筆交易，讓我們成為你的傘
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <h1>推薦作者</h1>
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
import { Navigation, Pagination } from 'swiper/modules'

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
    SwiperSlide
  },
  data () {
    return {
      products: [],
      authors: [],
      page: {},
      AuthorPage: {},
      modules: [Navigation, Pagination],
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
      console.log(url)
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products
          this.page = response.data.pagination
        })
        .catch((err) => {
          console.log(err.response.data.message)
          // alert(err.response.data.message)
        })
    },
    async getAuthorData (page = 1) {
      await this.setAdminToken()
      await this.checkUserhasArt()
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/products?category=使用者&page=${page}`
      console.log(this.AdminToken)
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
            console.log('has next')
          } else {
            this.authors = Object.values(this.authors).filter((item) => {
              return item.ArtQuantity > 0
            })
            console.log('no next')
          }
        })
        .catch((err) => {
          console.log(err.response.data.message)
          // alert(err.response.data.message)
        })
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
    max-width: 80vw !important;
  }
}
</style>
