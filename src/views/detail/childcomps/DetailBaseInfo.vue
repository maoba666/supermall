<!--  -->
<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="disc" :style="{'background-color': goods.discountBgColor}">{{goods.discount}}</span>
    </div>
    <div class="info-shop">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style  scoped>
.base-info {
  margin-top: 4vw;
  padding: 0 2.13333vw;
  color: #999;
  border-bottom: 1.33333vw solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 3vw;
}
.n-price {
  font-size: 6.4vw;
  color: var(--color-high-text);
}
.o-price {
  text-decoration: line-through;
  margin-left: 5px;
  font-size: 3.4vw;
}
.disc {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}
.info-shop {
  display: flex;
  margin-top: 4vw;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 1vh;
}
.info-services {
  line-height: 16vw;
  display: flex;
  color: #333;
  font-size: 3.4vw;
  justify-content: space-between;
}
.info-services img {
  width: 14px;
  height: 14px;
  vertical-align:middle;
}
</style>