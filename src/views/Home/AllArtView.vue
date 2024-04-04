<template>
  <div class="container mt-5">
    <h1>瀏覽作品</h1>
    <hr />
    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-0 g-lg-4">
      <div v-for="author in authors" :key="author.id">
        <ArtComponent :item="author" :showAuthor="true" :datas="Alldata" />
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-center">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pages.current }">
            <button
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
            <button class="page-link" @click="nextPage(page - 1)">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: !pages.hasNext }">
            <button
              class="page-link"
              @click="nextPage(pages.current + 1)"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import ArtComponent from '@/components/ArtComponent.vue'
import { mapState, mapActions } from 'pinia'
import UserState from '@/stores/UserState.js'
const state = ['Alldata']
const actions = ['getAlldata']
export default {
  name: 'AllAuthorView',
  components: {
    ArtComponent
  },
  data () {
    return {
      authors: [],
      pages: {
        min: 0,
        eachOfPage: 15,
        current: 0,
        total: 0,
        currentPage: 1,
        hasNext: false,
        totalPage: 0
      }
    }
  },
  methods: {
    ...mapActions(UserState, actions),
    async nextPage (currentPage = 0) {
      await this.getAlldata()
      this.authors = Object.values(this.Alldata).filter((item) => {
        return item.category === '作品'
      })
      this.pages.current = currentPage
      this.pages.currentPage = currentPage + 1
      this.pages.total = Object.values(this.authors).length
      this.pages.totalPage = Math.ceil(this.pages.total / this.pages.eachOfPage)
      this.pages.hasNext = this.pages.currentPage < this.pages.totalPage
      const min = this.pages.current * this.pages.eachOfPage + this.pages.min
      const max = min + this.pages.eachOfPage
      this.authors = this.authors.slice(min, max)
    }
  },
  computed: {
    ...mapState(UserState, state)
  },
  mounted () {
    this.nextPage()
  }
}
</script>

<style lang="scss" scoped></style>
