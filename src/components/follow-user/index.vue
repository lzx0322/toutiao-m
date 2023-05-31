<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.value) {
          // 已关注,取消关注
          await deleteFollow(this.userId)
          // this.article.is_followed = false
        } else {
          // 未关注,添加关注
          await addFollow(this.userId)
          // this.article.is_followed = true
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('update-is_followed', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
        const message = '操作失败,请重试！'
        if (err.response && err.response.status === 400) {
          // eslint-disable-next-line no-const-assign
          message = '用户不能关注用户本身'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
