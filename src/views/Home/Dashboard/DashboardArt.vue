<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12">
        <RouterLink
          :to="{ name: 'UserCenter', params: { userid: `${userID}` } }"
          class="text text-white link-underline link-underline-opacity-0 d-flex"
        >
          <p class="m-0 fs-4">
            <i class="bi bi-caret-left-fill fs-4 text-white-50"></i>編輯作品
          </p>
        </RouterLink>
        <hr class="mb-4"/>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-0 g-md-2 gx-lg-4">
      <div v-for="item in userArtWork" :key="item.id">
        <EditArtComponent :item="item" @updated="getUserArtWork" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import EditArtComponent from '@/components/EditArtComponent.vue'
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
  name: 'EditArtView',
  data () {
    return {
      userArtWork: {},
      userCommission: {}
    }
  },
  components: {
    EditArtComponent
  },
  methods: {
    ...mapActions(UserState, actions),
    async getUserArtWork () {
      await this.getAlldata()
      this.userArtWork = Object.values(this.Alldata).filter((item) => {
        return item.author === this.userID && item.category === '作品'
      })
      this.userCommission = Object.values(this.Alldata).filter((item) => {
        return item.author === this.userID && item.category === '報價'
      })
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  async mounted () {
    await this.getAlldata()
    await this.getUserArtWork()
    this.checkUserLogin()
  }
}
</script>
<style></style>
