<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment"></comment-item>
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <comment-list
        :list="commentList"
        :source="comment.com_id"
        type="c"
      ></comment-list>
    </div>
    <!-- 底部区域 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item.vue'
import CommentList from '@/views/article/components/comment-list.vue'
import CommentPost from '@/views/article/components/comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess(data) {
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
