<template>
  <div class="card art rounded-0 border-2 my-2">
    <div class="container-fluid p-0">
      <img
        :src="item.imageUrl"
        class="card-img-top mh-100 rounded-0 object-fit-contain object-position-center w-100 m-0 ArtComponent__image"
        loading="lazy"
        alt="作品圖片"
      />
    </div>
    <!-- <div class="w-100 pt-100 position-relative"></div> -->

    <div class="card-body flex-grow-0 align-self-stretch bg-dark-subtle">
      <p
        v-show="showtitle"
        class="mb-0 card-text border-top-0 text-nowrap text-truncate"
        :class="{ 'fs-4': showPrice, 'fs-5': !showPrice }"
      >
        {{ item.title }}
        <span v-if="showUpload" class="text fs-6 text-secondary ms-auto">
          已上傳 {{ item.ArtQuantity }}
        </span>
      </p>
    </div>
    <div
      v-if="showAuthor"
      class="card-body flex-grow-0 align-self-stretch bg-dark-subtle"
    >
      <div class="d-flex justify-content-end align-items-center">
        <img
          :src="author.imageUrl"
          alt="作者圖片"
          height="50px"
          class="rounded-circle object-fit-cover object-position-center"
        />
        <p
          class="mb-0 ms-2 card-text border-top-0 text-nowrap text-truncate"
          :class="{ 'fs-4': showPrice, 'fs-5': !showPrice }"
        >
          {{ author.title }}
        </p>
      </div>
    </div>
    <p
      v-show="showPrice"
      class="card-body flex-grow-1 bg-dark-subtle mb-0 card-text text-secondary border-0 fs-5"
    >
      {{ item.description }}
    </p>
    <p v-show="showPrice" class="card-footer mb-0 card-text border-0 text-end">
      {{ item.price }} TWD
    </p>
    <router-link
      v-if="item.category === '作品'"
      :to="`/art/${item.id}`"
      class="stretched-link"
    ></router-link>
    <router-link
      v-if="item.category === '報價'"
      :to="`/comission/${item.id}`"
      class="stretched-link"
    ></router-link>
    <router-link
      v-if="item.category === '使用者'"
      :to="`/usercenter/${item.id}`"
      class="stretched-link"
    ></router-link>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import UserState from '../stores/UserState'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    datas: {
      type: Object,
      required: false
    },
    showtitle: {
      type: Boolean,
      default: true
    },
    showPrice: {
      type: Boolean,
      default: false
    },
    showbutton: {
      type: Boolean,
      default: false
    },
    showUpload: {
      type: Boolean,
      default: false
    },
    showAuthor: {
      type: Boolean,
      default: false
    },
    h100: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      author: {}
    }
  },
  computed: {
    ...mapState(UserState, ['Alldata'])
  },
  methods: {
    ...mapActions(UserState, ['getAlldata'])
  },
  async mounted () {
    if (!this.datas) {
      await this.getAlldata()
      this.author = this.Alldata[this.item.author]
    } else {
      this.author = this.datas[this.item.author]
    }
  }
}
</script>
<style>
/* card hover 特效:向上浮動一點點 放大一點點*/
.art.card:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transform: translateY(-5px) scale(1.05);
  transition: transform 0.3s;
}
</style>
