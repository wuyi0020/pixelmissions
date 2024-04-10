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
    <div class="row pt-0">
      <div class="col-12 d-flex align-items-center">
        <div class="me-2 headeimg" style="width: 100px; height: 100px">
          <img
            :src="userData.imageUrl"
            class="rounded-circle object-fit-cover w-100 h-100"
            alt="作者"
          />
        </div>
        <div class="d-flex align-items-end">
          <div class="h3 m-0 p-0">{{ userData.title }}</div>
          <router-link
            :to="{ name: 'userFollowArt' }"
            v-if="userData.likeList"
            class="link-underline link-underline-opacity-0"
          >
            <div
              class="ms-2 text-primary link-underline link-underline-opacity-0"
            >
              收藏的作品 {{ userData.likeList.length }}
            </div>
          </router-link>
          <div v-else class="link-underline link-underline-opacity-0">
            <div
              class="ms-2 text-white-50 link-underline link-underline-opacity-0"
            >
              尚未收藏作品
            </div>
          </div>
          <div class="text mx-2">|</div>
          <router-link
            :to="{ name: 'userFollowUser' }"
            v-if="userData.followList"
            class="link-underline link-underline-opacity-0"
          >
            <div class="text-primary link-underline link-underline-opacity-0">
              追隨中 {{ userData.followList.length }}
            </div>
          </router-link>
          <div v-else class="link-underline link-underline-opacity-0">
            <div
              class="ms-2 text-white-50 link-underline link-underline-opacity-0"
            >
              尚未追隨任何人
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12">
          <p>{{ userData.description }}</p>
        </div>
      </div>
    </div>
    <button
      v-if="$route.params.userid == userID"
      type="button"
      class="btn btn-outline-primary btn-lg my-3 mx-0 usercenterBtnToggle"
      data-bs-toggle="collapse"
      data-bs-target="#usercenterbtns"
      aria-expanded="false"
      aria-controls="usercenterbtns"
    >
      儀錶板
    </button>
    <div
      class="row row-cols-1 row-cols-lg-3 text-center m-0 border border-2 bg-dark-subtle collapse"
      v-if="$route.params.userid == userID"
      id="usercenterbtns"
    >
      <div class="col border p-0 position-relative">
        <router-link
          :to="{ name: 'EditUserView', params: { id: userID } }"
          class="btn text-center fs-5 stretched-link"
          type="button"
          ><p class="m-0 p-0">編輯使用者資料</p>
        </router-link>
      </div>
      <div class="col border p-0 position-relative">
        <router-link
          :to="{ name: 'DashboardComission', params: { id: userID } }"
          class="btn text-center fs-5 stretched-link"
          type="button"
          ><p class="m-0 p-0">編輯方案</p>
        </router-link>
      </div>
      <div class="col border p-0 position-relative">
        <router-link
          :to="`/dashboard/art/${userID}`"
          class="btn text-center fs-5 stretched-link"
          type="button"
          ><p class="m-0">編輯作品</p>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="pt-5">作品</h3>
        <hr />
      </div>
    </div>
    <div
      class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-0 g-md-2 gx-lg-4 pb-3"
    >
      <div v-for="item in userArtWork" :key="item.id">
        <ArtComponent :item="item" @loadDone="loadDone" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="pt-5 d-inline-block">贊助/約稿方案</h3>
        <router-link
          :to="{ name: 'ComissionView', params: { id: `${thisUserID}` } }"
          class="text-decoration-none"
        >
          <span class="text-primary"> 查看全部 </span>
        </router-link>
        <hr />
      </div>
    </div>
    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-md-3 gx-lg-4 pb-3">
      <div class="col" v-for="item in userComission" :key="item.id">
        <ArtComponent :item="item" :showPrice="true" class="h-100" />
      </div>
    </div>
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
      userData: {},
      userArtWork: [],
      userComission: [],
      thisUserID: this.$route.params.userid,
      isLoading: true
    }
  },
  components: {
    ArtComponent,
    Loading
  },
  methods: {
    ...mapActions(UserState, actions),
    async GetUserData () {
      await this.getAlldata()
      const key = this.$route.params.userid
      this.userData = this.Alldata[key]
      this.getUserArtWork()
    },
    getUserArtWork () {
      const key = this.$route.params.userid
      this.userArtWork = Object.values(this.Alldata)
        .filter((item) => {
          if (item.author === key && item.category === '作品') {
            return item
          }
          return null
        })
        .slice(0, 12)
      this.userComission = Object.values(this.Alldata)
        .filter((item) => {
          if (item.author === key && item.category === '報價') {
            return item
          }
          return null
        })
        .slice(0, 3)
    },
    loadDone () {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  mounted () {
    this.checkUserLogin()
    this.GetUserData()
  }
}
</script>
