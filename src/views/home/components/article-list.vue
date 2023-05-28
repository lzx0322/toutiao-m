<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/acticle-item/index.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isFreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    /* onLoad() {
      // 初始化或滚动到底部的时候会触发调用 onLoad
      // 1. 请求获取数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 2. 把请求结果数据放到 list 数组中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 3. 本次数据加载结束之后要把加载状态设置为结束
        // loading 关闭以后才能触发下一次的加载更多
        this.loading = false

        // 4. 判断数据是否全部加载完成
        if (this.list.length >= 40) {
          // 如果没有数据了,把 finished 设置为 true,之后不再触发加载更多
          this.finished = true
        }
      }, 1000)
    } */
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        // 数组的展开操作符
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了,将 finished 设置为 true,不再 load 加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了, loading 也要关闭
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 下拉刷新,每次请求获取最新数据,所有传递当前最新时间戳
          timestamp: Date.now()
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的 loading 状态
        this.isFreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功,更新了 ${results.length} 条数据`
      } catch (err) {
        this.isFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
