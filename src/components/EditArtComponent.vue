<template>
  <div class="card">
    <img
      :src="item.imageUrl"
      class="card-img-top rounded-0 card-img"
      alt="..."
    />
    <div class="card-body border align-self-stretch bg-dark-subtle">
      <p class="mb-0 card-text border-top-0 fs-3">
        {{ item.title }}
      </p>
      <p class="mb-0 card-text text-end border-top-0 fs-3">
        <i class="bi bi-heart-fill"></i>
        {{ item.like }}
      </p>
      <p v-if="item.category === '報價'" class="mb-0 card-text text-end border-top-0 fs-3">
        <i class="bi bi-cash"></i>
        {{ item.price }}
      </p>
      <p
        class="mb-0 d-flex flex-column card-text text-end border-top-0 fs-3 mt-2"
      >
        <router-link
          class=""
          :to="{ name: 'EditArtView', params: { id: item.id } }"
        >
          <button type="button" class="btn w-100 btn-secondary btn-lg">
            <span v-if="item.category === '作品'">
              <i class="bi bi-pencil-square"></i>
              修改作品
            </span>
            <span v-if="item.category === '報價'">
              <i class="bi bi-pencil-square"></i>
              修改方案
            </span>
          </button>
        </router-link>
        <button
          type="button"
          class="btn btn-danger btn-lg mt-2"
          @click.prevent="deleteItem(item)"
        >
          <span v-if="item.category === '作品'">
            <i class="bi bi-trash3"></i>
            刪除作品
          </span>
          <span v-if="item.category === '報價'">
            <i class="bi bi-trash3"></i>
            刪除方案
          </span>
        </button>
      </p>
    </div>
    <div v-if="isArtwork" class="card-footer mb-0 text-end">
      <p class="card-text border-0 text-end">{{ item.price }} TWD</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import UserState from '@/stores/UserState.js'
import { mapState, mapActions } from 'pinia'
// import toastr from 'toastr'

import * as VeeValidate from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
const { VITE_URL, VITE_API_PATH } = import.meta.env
const state = ['AdminToken', 'userID']
const actions = ['setAdminToken', 'checkUserLogin', 'getAlldata']

Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule])
})
VeeValidateI18n.localize({
  zh_TW: zhTW
})
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true
})

export default {
  components: {
    // VField: VeeValidate.VField,
    // VForm: VeeValidate.VForm,
    // ErrorMessage: VeeValidate.ErrorMessage
  },
  data () {
    return {
      edit: false,
      tempitem: {},
      isArt: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    showtitle: {
      type: Boolean,
      default: true
    },
    isArtwork: {
      type: Boolean,
      default: false
    },
    showbutton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    editItem () {
      this.edit = true
    },
    deleteItem (item) {
      console.log(item)
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${item.id}`
      const token = this.AdminToken
      axios.defaults.headers.common.Authorization = `${token}`
      axios
        .delete(url)
        .then((res) => {
          console.log(res)
          this.$emit('updated')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  mounted () {
    this.tempitem = { ...this.item }
  }
}
</script>
<style lang=""></style>
