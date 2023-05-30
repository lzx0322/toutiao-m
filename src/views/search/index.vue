<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="SearchHistories"
      @clear-search-histories="SearchHistories = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchResult from '@/views/search/components/search-result.vue'
import SearchSuggestion from '@/views/search/components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    }
  },
  watch: {
    SearchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求:不要有重复历史记录,最新的排在最前面
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
