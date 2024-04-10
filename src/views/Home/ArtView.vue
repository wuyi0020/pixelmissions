<template>
  <div class="container h-100 pt-5" v-if="!NotFund">
    <div class="row">
      <div
        class="col-12 rounded-top-4 col-md-9 bg-dark-subtle rounded-top-2 text-center"
      >
        <img class="mw-100 artMaxHight" :src="art.imageUrl" :alt="art.id" />
      </div>
      <div class="col-3 d-none d-sm-none d-md-block">
        <div class="d-flex position-relative align-items-center">
          <img
            width="50"
            :src="author.imageUrl"
            class="rounded-circle"
            alt="作者"
          />
          <p class="px-2 m-0 text-center user-select-none fs-5">
            {{ author.title }}
          </p>
          <router-link
            :to="`/usercenter/${author.id}`"
            class="stretched-link"
          ></router-link>
        </div>
        <div class="pt-2" v-if="!(author.id == userID)">
          <button
            type="button"
            class="btn w-100 rounded-pill"
            :class="{
              'btn-primary': !hasfollow,
              'btn-secondary': hasfollow
            }"
            @click.prevent="followAuthor()"
          >
            {{ hasfollow ? '已關注' : '加入關注' }}
          </button>
        </div>
        <div class="pt-2">
          <router-link
            :to="`/usercomission/${author.id}`"
            class="btn btn-outline-primary w-100 rounded-pill text-white"
            >查看約稿方案</router-link
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9 bg-dark-subtle">
        <div class="d-flex mt-3 align-items-center justify-content-end">
          <div class="me-auto">
            <h2>{{ art.title }}</h2>
          </div>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="likeArt(haslike)"
          >
            <i
              class="bi text-white"
              :class="{ 'bi-heart-fill': haslike, 'bi-heart': !haslike }"
              >{{ haslike ? ' 已收藏' : ' 收藏' }} {{ art.like }}</i
            >
          </button>
          <button
            type="button"
            class="btn ms-3 btn-outline-primary"
            @click.prevent="ShareArt()"
          >
            <i class="bi bi-arrow-90deg-right text-white">分享</i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9 bg-dark-subtle">
        <p class="mt-2">{{ art.description }}</p>
        <p class="">{{ time }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9 py-3 bg-dark-subtle">
        <div class="d-flex align-items-center">
          <div class="d-flex position-relative align-items-center">
            <img
              width="50"
              :src="author.imageUrl"
              class="rounded-circle"
              alt="作者"
            />
            <p class="px-2 m-0 text-center fs-5 user-select-none">
              {{ author.title }} <span class="text fs-6">關注者{{ author.fans }}</span>
            </p>
            <a
              href=""
              @click.prevent="PushUrl('/usercenter/' + author.id)"
              class="stretched-link"
            ></a>
          </div>
          <p class="m-0 text-center" v-if="!(author.id == userID)">
            <button
              type="button"
              class="btn rounded-pill"
              :class="{
                'btn-primary': !hasfollow,
                'btn-secondary': hasfollow
              }"
              @click.prevent="followAuthor()"
            >
              {{ hasfollow ? '已關注' : '加入關注' }}
            </button>
          </p>
          <a
            href=""
            @click.prevent="PushUrl('/usercenter/' + author.id)"
            class="link-secondary ms-auto text-white link-underline link-underline-opacity-25 link-opacity-100-hover"
            >查看作品</a
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-9 pt-3 bg-dark-subtle">
        <h3>相關作品</h3>
      </div>
      <div
        class="col-12 col-md-9 rounded-bottom-4 bg-dark-subtle overflow-auto scrollbar1"
      >
        <div class="d-flex">
          <div
            class="p-1 position-relative artbox my-2"
            v-for="item in AuthorWorks"
            :key="'AuthorWorks' + item.id"
          >
            <img
              :src="item.imageUrl"
              height="150"
              width="150"
              class="mh-100 object-position-50 object-fit-cover"
              alt="作品圖片"
            />

            <router-link :to="`/art/${item.id}`" class="stretched-link">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container h-100" v-else>
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 bg-dark-subtle flex-grow-1">
        <h3 class="user-select-none">找不到作品</h3>
        <router-link role="button" to="/" class="btn btn-primary"
          >回首頁</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
import toastr from 'toastr'
const { VITE_URL, VITE_API_PATH } = import.meta.env
const state = [
  'userName',
  'userEmail',
  'userID',
  'userHasLogIn',
  'AdminToken',
  'Alldata'
]
const actions = ['setAdminToken', 'PushUrl', 'getAlldata']
let likeListSet = null
let followListSet = null
export default {
  data () {
    return {
      art: {},
      ArtID: {},
      author: {},
      User: {},
      NotFund: false,
      time: '',
      haslike: false,
      AuthorWorks: [],
      hasfollow: false
    }
  },
  async mounted () {
    await this.setAdminToken()
    this.Artinit()
    this.logincheck()
  },
  computed: {
    ...mapState(UserState, state),
    formattedTime () {
      if (this.art.time === undefined) {
        return ''
      }
      const date = new Date(this.art.time)
      return moment(date).format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    logincheck () {
      if (!this.userHasLogIn) {
        this.PushUrl('/login')
        toastr.warning('請先登入')
      }
    },
    async Artinit () {
      await this.setAdminToken()
      await this.getAlldata()
      this.ArtID = this.$route.params.id

      this.art = Object.values(this.Alldata).find((item) => {
        return item.id === this.ArtID
      })

      if (this.art === undefined) {
        this.NotFund = true
        return
      }
      this.author = Object.values(this.Alldata).find((item) => {
        return item.id === this.art.author
      })
      this.User = Object.values(this.Alldata).find((item) => {
        return item.id === this.userID
      })
      this.AuthorWorks = Object.values(this.Alldata).filter((item) => {
        return item.author === this.author.id && item.category === '作品'
      })

      likeListSet = new Set(this.User.likeList)
      followListSet = new Set(this.User.followList)
      this.hasfollow = followListSet.has(this.author.id)
      this.haslike = likeListSet.has(this.art.id)
    },
    likeArt (boolhaslike) {
      const artData = this.art
      const Userdata = this.User
      if (isNaN(artData.like)) {
        artData.like = 0
      }
      if (boolhaslike) {
        artData.like = artData.like - 1
        likeListSet.delete(this.art.id)
        Userdata.likeList = [...likeListSet]
        this.haslike = likeListSet.has(this.art.id)
      } else {
        artData.like = artData.like + 1
        likeListSet = new Set(Userdata.likeList)
        likeListSet.add(this.art.id)
        Userdata.likeList = [...likeListSet]
        this.haslike = likeListSet.has(this.art.id)
      }
      axios.defaults.headers.common.Authorization = this.AdminToken
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.art.id}`

      const UserUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.userID}`

      axios
        .put(url, { data: artData })
        .then(() => {
          return axios.put(UserUrl, { data: Userdata })
        })
        .then(() => {
          this.art = artData
          this.User = Userdata
        })
    },
    ShareArt () {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toastr.success('網址已複製到剪貼簿')
        })
        .catch(() => {
          toastr.warning('複製失敗')
        })
    },
    followAuthor () {
      const authordata = this.author
      const Userdata = this.User
      if (isNaN(this.author.fans)) {
        this.author.fans = 1
      }
      if (this.hasfollow) {
        this.hasfollow = false
        followListSet.delete(this.author.id)
        Userdata.followList = [...followListSet]
        authordata.fans = authordata.fans - 1
      } else {
        this.hasfollow = true
        followListSet.add(this.author.id)
        Userdata.followList = [...followListSet]
        authordata.fans = authordata.fans + 1
      }
      axios.defaults.headers.common.Authorization = this.AdminToken
      const authorUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.author.id}`
      const UserUrl = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${this.userID}`
      axios
        .put(authorUrl, { data: authordata })
        .then(() => {
          this.author = authordata
          return axios.put(UserUrl, { data: Userdata })
        })
        .then(() => {
          this.User = Userdata
        })
    }
  }
}
</script>
<style>
.artbox:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transform: translateY(-5px) scale(1.05);
  transition: transform 0.3s;
}
.artMaxHight{
  max-height: 80vh;
}
</style>
