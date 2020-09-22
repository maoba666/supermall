<!--  -->
<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length!==0">
    <div class="header">
      <span>用户评价</span>
      <span>
        更多&nbsp;>>
        <i class="arrow-right" />
      </span>
    </div>
    <div class="user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{commentInfo.created | showData}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "commonjs/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showData(value) {
      //1、将时间戳转成data对象
      const data = new Date(value * 1000);
      //2、格式化data
      return formatDate(data, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>
<style  scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.header {
  display: flex;
  line-height: 12vw;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.user {
  padding: 2.67vw 0 1.33vw;
}
.user img {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  vertical-align: middle;
}
.user span {
  margin-left: 2vw;
}
.info-detail {
  font-size: 3.2vw;
  color: #999;
  margin-bottom: 6vw;
}
.info-detail p {
  margin: 4vw 0;
}
.data {
  padding-right: 3vw;
}
.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>