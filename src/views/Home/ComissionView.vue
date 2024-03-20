<template>
  <div class="container-fluid">
    <div class="row bg-dark-subtle topband" id="topband"></div>
  </div>
  <div class="container mb-5">
    <div class="row pt-0">
      <div class="col-12 d-flex align-items-center">
        <div class="me-2 headeimg">
          <img src="https://fakeimg.pl/100x100/" class="rounded-circle" />
        </div>
        <div>
          <p class="h3">
            {{ authorData.title }}
            <span
              v-if="userID === ThisComissionData.author"
              class="text text-secondary"
              >(自我檢視)</span
            >
          </p>
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
            />
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h1 class="card-title">
                {{ ThisComissionData.title }}
              </h1>
              <p class="fs-3 text-secondary mb-0">
                {{ ThisComissionData.description }}
              </p>
              <p class="fs-3 text-secondary">
                {{ ThisComissionData.content }}
              </p>
            </div>
            <div class="text-center fs-2">
              <span class=""> {{ ThisComissionData.price }} TWD</span>
            </div>
            <router-link
              :to="{
                name: 'createOrder',
                params: { id: ThisComissionData.id }
              }"
              class="mx-5"
              v-if="userID !== ThisComissionData.author"
            >
              <button
                type="button"
                class="btn btn-primary w-100 btn-lg rounded-pill"
              >
                進行委託
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
      <!-- <div class="col-12">
        <p>
          {{ this.authorComission }}
        </p>
        <br />
        <p>
          {{ this.ThisComissionData }}
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import ArtComponent from '@/components/ArtComponent.vue'
// import axios from 'axios'
// import toastr from 'toastr'

// const { VITE_URL, VITE_API_PATH } = import.meta.env

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
      // this.userData = {...this.Alldata[this.userID]};
      this.ThisComissionData = { ...this.Alldata[this.$route.params.id] }
      if (this.ThisComissionData === undefined) {
        this.$router.push('/')
      }
      if (this.ThisComissionData.category !== '報價') {
        this.$router.push(`/usercomission/${this.userID}`)
      }
      this.authorID = this.ThisComissionData.author
      this.authorData = this.Alldata[this.authorID]
      this.authorComission = Object.values(this.Alldata).filter(
        (item) => item.category === '報價' && item.author === this.authorID
      )
      // console.log(this.$route.params);
    }
    // addCart () {
    //   // const addcartUrl = `${VITE_URL}/api/${VITE_API_PATH}/cart`
    //   // axios
    //   //   .post(addcartUrl, {
    //   //     data: {
    //   //       product_id: this.ThisComissionData.id,
    //   //       qty: 1
    //   //     }
    //   //   })
    //   //   .then((response) => {
    //   //     toastr.success('已加入購物車')
    //   //     console.log(response)
    //   //   })
    //   //   .catch((err) => {
    //   //     alert(err.response.data.message)
    //   //   })
    //   // console.log('addCart')
    // }
  },
  async mounted () {
    await this.checkUserLogin()
    console.log(this.userHasLogIn)
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
