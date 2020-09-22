<!--  -->
<template>
  <div v-if="Object.keys(detailInfo).length!==0" class="detail-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item,index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {
          counter: 0,
          imagesLength: 0,
        };
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("imageLoad");
    },
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>
<style  scoped>
.detail-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.start {
  float: left;
  margin-bottom: 3vw;
}
.end {
  float: right;
}
.start::before {
  content: "";
  position: absolute;
  width: 1.33333vw;
  height: 1.33333vw;
  background-color: #333;
  bottom: 0;
}
.end::after {
  content: "";
  position: absolute;
  width: 1.33333vw;
  height: 1.33333vw;
  background-color: #333;
  bottom: 0;
}
.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  color: #333;
  font-size: 4vw;
  margin: 2.67vw 0 2.67vw 4vw;
}
.info-list img {
width: 100vw;
margin-top: 4vw;
}
</style>