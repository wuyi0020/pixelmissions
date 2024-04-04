<template>
  <div class="container-fluid">
    <div class="row bg-dark-subtle topband" id="topband"></div>
  </div>
  <div class="container">
    <div class="row pt-0">
      <div class="col-12 d-flex align-items-center">
        <div class="me-2 headeimg">
          <img
            :src="authorData.imageUrl"
            class="rounded-circle"
            alt="作者"
          />
        </div>
        <div>
          <h3>{{ authorData.title }}</h3>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12 px-5">
          <p>{{ authorData.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="py-3">所有方案</h1>
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
const actions = ['checkUserLogin', 'getAlldata', 'PushUrl']

export default {
  data () {
    return {
      authorID: '',
      authorData: {},
      authorComission: [],
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
      // this.userData = {...this.Alldata[this.userID]};
      this.authorID = this.$route.params.userid
      this.authorComission = Object.values(this.Alldata).filter(
        (item) => item.category === '報價' && item.author === this.authorID
      )
      this.authorData = this.Alldata[this.authorID]
      // console.log(this.$route.params);
    }
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
