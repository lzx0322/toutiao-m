<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败,请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          // 1.请求获取数据
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })
        // 2.将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中 loading 关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 4.1 如果有,则更新获取下一个数据的页面
          this.page++
        } else {
          // 4.2 如果没有,则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('数据获取失败,请稍后重试')
      }
    }
  }
}
</script>

<style></style>
