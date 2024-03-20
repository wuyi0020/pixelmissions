<template>
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
          />
        </div>
        <div>
          <h3>{{ userData.title }}</h3>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12 px-5">
          <p>{{ userData.description }}</p>
        </div>
      </div>
    </div>
    <div
      class="row border py-3 border-2 rounded-pill bg-dark-subtle"
      v-if="$route.params.userid == userID"
    >
      <div class="d-flex justify-content-end align-items-center">
        <h3 class="me-auto p-0 m-0">創作儀表板</h3>
        <router-link
          :to="{ name: 'EditUserView', params: { id: userID } }"
          class="btn btn-primary rounded-pill text-center ms-3"
          type="button"
          ><h3 class="m-0">修改使用者資料</h3>
        </router-link>
        <router-link
          :to="{ name: 'DashboardComission', params: { id: userID } }"
          class="btn btn-primary rounded-pill text-center ms-3"
          type="button"
          ><h3 class="m-0">修改方案</h3>
        </router-link>
        <router-link
          :to="`/dashboard/art/${userID}`"
          class="btn btn-primary rounded-pill text-center ms-3"
          type="button"
          ><h3 class="m-0">修改作品</h3>
        </router-link>
        <router-link
          to="/upload"
          class="btn btn-primary rounded-pill text-center ms-3"
          type="button"
          ><h3 class="m-0">上傳作品</h3>
        </router-link>
        <router-link
          to="/uploadcomission"
          class="btn btn-primary rounded-pill text-center ms-3"
          type="button"
          ><h3 class="m-0">上傳方案</h3>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="pt-3">作品</h1>
        <hr />
      </div>
    </div>
    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-0 g-md-2 gx-lg-4">
      <div v-for="item in userArtWork" :key="item.id">
        <ArtComponent :item="item" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="pt-3 d-inline-block">贊助/約稿方案</h1>
        <router-link
          :to="{ name: 'ComissionView', params: { id: thisUserID } }"
        >
          <span class="text-secondary"> 查看全部 </span>
        </router-link>
        <hr />
      </div>
    </div>
    <div class="row row-cols-2 row-cols-md-3 g-0 g-md-2 gx-lg-4">
      <div v-for="item in userComission" :key="item.id">
        <ArtComponent :item="item" :showPrice="true" />
      </div>
    </div>
  </div>

  <!-- <div class="container">
    <p style="word-break: break-all">
      {{ userData }}
    </p>
    <hr />
    <p style="word-break: break-all">
      {{ userArtWork }}
    </p>
  </div> -->
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import ArtComponent from '@/components/ArtComponent.vue'

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
      thisUserID: this.$route.params.userid
    }
  },
  components: {
    ArtComponent
  },
  methods: {
    ...mapActions(UserState, actions),
    async GetUserData () {
      await this.getAlldata()
      console.log(this.$route.params.userid)
      const key = this.$route.params.userid
      this.userData = this.Alldata[key]
      this.getUserArtWork()
    },
    getUserArtWork () {
      const key = this.$route.params.userid
      this.userArtWork = Object.values(this.Alldata)
        .filter((item) => {
          if (item.author === key && item.category === '作品') {
            console.log(item)
            return item
          }
          return null
        })
        .slice(0, 12)
      this.userComission = Object.values(this.Alldata)
        .filter((item) => {
          if (item.author === key && item.category === '報價') {
            console.log(item)
            return item
          }
          return null
        })
        .slice(0, 3)
      console.log(this.userArtWork)
      console.log(this.userComission)
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
