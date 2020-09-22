<!--  -->
<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt />
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells|sellCountFilter}}</div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="shopping">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>
<style  scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  display: flex;
  line-height: 45px;
}
.shop-top img {
  width: 12vw;
  height: 12vw;
  vertical-align: middle;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin-right: 2vw;
}
.shop-middle {
  display: flex;
  align-items: center;
}
.sells-count {
  font-size: 4.8vw;
  line-height: 12vw;
}
.goods-count {
  font-size: 4.8vw;
  line-height: 12vw;
}
.shop-middle-left,
.shop-middle-right {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  justify-content: space-evenly;
  border-right: 1px solid #cccccc;
}
.shop-middle-right {
  text-align: center;
}
.shop-middle-right table {
  width: 32vw;
  margin-left: 8vw;
}
.shop-middle-right table td {
  padding: 1.33333vw 0;
}
.score {
  color: #5ea732;
}
.score-better {
  color: #f13e3a;
}
.better span {
  background-color: #5ea732;
  color: #fff;
}
.better-more span {
  background-color: #f13e3a;
  color: #fff;
}
.shop-bottom {
  margin-top: 4vw;
  text-align: center;
}
.shopping {
  display: inline-block;
  width: 40vw;
  line-height: 8vw;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  background-color: rgba(242,245,248);
}
</style>