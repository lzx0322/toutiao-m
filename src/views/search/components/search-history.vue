<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态,删除历史记录数据
        // eslint-disable-next-line vue/no-mutating-props
        this.SearchHistories.splice(index, 1)
      } else {
        // 非删除状态,直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>
