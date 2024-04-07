<template>
  <div class="container-fluid">
    <div class="row bg-dark-subtle topband" id="topband"></div>
  </div>
  <div class="container mb-5">
    <div class="row pt-0">
      <div class="col-12 d-flex align-items-center">
        <div class="me-2 headeimg" style="height: 100px; width: 100px">
          <img
            :src="authorData.imageUrl"
            class="rounded-circle img-container"
            alt="作者"
          />
        </div>
        <div class="d-flex align-items-center">
          <h3 class="">
            {{ authorData.title }}
          </h3>
          <div
            v-if="userID === ThisComissionData.author"
            class="text text-secondary mx-2"
          >
            (自我檢視)
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12 p-5 bg bg-dark-subtle rounded-5">
        <div class="row g-5">
          <div class="col-md-4">
            <img
              :src="ThisComissionData.imageUrl"
              class="img-fluid rounded-start-0 ratio-1x1 mh-100"
              alt="方案"
            />
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h1 class="card-title">
                {{ ThisComissionData.title }}
              </h1>
              <p class="mb-0">
                {{ ThisComissionData.description }}
              </p>
              <p class="">
                {{ ThisComissionData.content }}
              </p>
            </div>
            <div class="mb-5">
              <span> {{ ThisComissionData.price }} TWD</span>
            </div>
            <router-link
              :to="{
                name: 'createOrder',
                params: { id: ThisComissionData.id }
              }"
              class=""
              v-if="userID !== ThisComissionData.author"
            >
              <button
                type="button"
                class="btn btn-primary w-100 btn-lg rounded-pill"
              >
                進行委託
              </button>
            </router-link>
            <router-link
              :to="{
                name: 'EditArtView',
                params: { id: ThisComissionData.id }
              }"
              class=""
              v-else
            >
              <button
                type="button"
                class="btn btn-primary w-100 btn-lg rounded-pill"
              >
                修改方案
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1 class="pt-3">其他方案</h1>
          <hr />
        </div>
      </div>
      <div class="row row-cols-2 row-cols-md-3 g-0 g-md-2 gx-lg-4">
        <div v-for="item in authorComission" :key="item.id">
          <ArtComponent :item="item" :showPrice="true" />
        </div>
      </div>
    </div>
  </div>
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
const actions = ['checkUserLogin', 'UserLogout', 'getAlldata', 'PushUrl']

export default {
  data () {
    return {
      authorID: '',
      authorData: {},
      authorComission: [],
      ThisComissionData: [],
      userData: {}
    }
  },
  components: {
    ArtComponent
  },
  methods: {
    ...mapActions(UserState, actions),
    async GetAuthorData () {
      await this.getAlldata()
      if (this.$route.params.id === this.userID) {
        this.$router.push(`/usercomission/${this.userID}`)
      }
      if (this.$route.params.id === undefined) {
        this.$router.push('/')
      }
      this.ThisComissionData = { ...this.Alldata[this.$route.params.id] }
      if (this.ThisComissionData === undefined) {
        this.$router.push('/')
      }
      if (this.ThisComissionData.category !== '報價') {
        this.$router.replace(`/usercomission/${this.userID}`)
      }
      this.authorID = this.ThisComissionData.author
      this.authorData = this.Alldata[this.authorID]
      this.authorComission = Object.values(this.Alldata).filter(
        (item) => item.category === '報價' && item.author === this.authorID
      )
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
