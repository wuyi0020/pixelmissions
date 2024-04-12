<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  />
  <div class="container-fluid">
    <div class="row bg-dark-subtle topband bg-5dot" id="topband"></div>
  </div>
  <div class="container">
    <div class="row pt-3">
      <div class="col-12 d-flex align-items-center">
        <RouterLink :to="{ name: 'UserCenter', params: { id: authorID } }">
          <i class="bi bi-caret-left-fill h1 text-white-50"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'UserCenter', params: { id: authorID } }">
          <div class="me-2" style="width: 60px; height: 60px">
            <img
              :src="authorData.imageUrl"
              class="rounded-circle object-fit-cover w-100 h-100"
              alt="作者"
            />
          </div>
        </RouterLink>
        <RouterLink
          :to="{ name: 'UserCenter', params: { id: authorID } }"
          class="text text-white link-underline link-underline-opacity-0"
        >
          <div class="m-0 p-0 h3">{{ authorData.title }}</div>
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="container pt-5">
    <div class="row">
      <div class="col-12">
        <div class="h3 pt-3">追隨的作者</div>
      </div>
      <div class="col-12">
        <div
          class="row row-cols-2 row-cols-md-3 row-cols-xxl-5 g-0 g-md-2 gx-lg-4"
        >
          <div v-for="item in FollowList" :key="item.id">
            <ArtComponent :item="item" @loadDone="loadDone" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class=""></div>
  </div>
  <div class="d-flex justify-content-center">
    <nav>
      <ul class="pagination m-0 mt-4">
        <li class="page-item" :class="{ disabled: !pages.current }">
          <button
            type="button"
            class="page-link"
            @click="nextPage(pages.current - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li
          class="page-item"
          v-for="page in pages.totalPage"
          :key="page"
          :class="{ active: page === pages.currentPage }"
        >
          <button class="page-link" @click="nextPage(page - 1)" type="button">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: !pages.hasNext }">
          <button
            class="page-link"
            @click="nextPage(pages.current + 1)"
            aria-label="Next"
            type="button"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import ArtComponent from '@/components/ArtComponent.vue'
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

export default {
  data () {
    return {
      authorID: '',
      authorData: {},
      FollowList: [],
      userData: {},
      pages: {
        min: 0,
        eachOfPage: 15,
        current: 0,
        total: 0,
        currentPage: 1,
        hasNext: false,
        totalPage: 0
      },
      isLoading: true
    }
  },
  components: {
    ArtComponent,
    Loading
  },
  methods: {
    ...mapActions(UserState, actions),
    async GetAuthorData (currentPage = 0) {
      await this.getAlldata()
      this.authorID = this.$route.params.userid
      this.authorData = this.Alldata[this.authorID]
      this.authorData.followList.forEach((item) => {
        this.FollowList.push(this.Alldata[item])
      })
      this.pages.current = currentPage
      this.pages.currentPage = currentPage + 1
      this.pages.total = this.FollowList.length
      this.pages.totalPage = Math.ceil(this.pages.total / this.pages.eachOfPage)
      this.pages.hasNext = this.pages.currentPage < this.pages.totalPage
      const start = this.pages.current * this.pages.eachOfPage
      const end = start + this.pages.eachOfPage
      this.FollowList = this.FollowList.slice(start, end)
    },
    loadDone () {
      this.isLoading = false
    },
    nextPage (page) {
      this.isLoading = true
      this.GetAuthorData(page)
    }
  },
  async mounted () {
    await this.checkUserLogin()
    if (this.userHasLogIn) {
      await this.GetAuthorData()
    }
  },
  computed: {
    ...mapState(UserState, state)
  }
}
</script>
<style></style>
