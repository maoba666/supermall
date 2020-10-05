<!--  -->
<template>
  <div class="bottom-info">
    <div class="bottom-left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>商店</span>
      </div>
      <div class="select">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <span class="shopping-cart" @click="addToCart">加入购物车</span>
      <span class="buy" @click="buyClick">购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottonInfo",
  methods:{
    addToCart(){
      this.$emit('addCart')
    },
    buyClick(){
      this.$router.push("/Cart")
    }
  }
};
</script>
<style  scoped>
.bottom-info {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 13.06667vw;
  background-color: #fff;
  display: flex;
  text-align: center;
  box-shadow: 0px 1px 1.33333vw rgba(0, 0, 0, 0.3);
}
.bottom-right,
.bottom-left {
  flex: 1;
}
.bottom-left {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 3.46667vw;
  color: rgba(154, 154, 154);
}

.bottom-left div {
  flex: 1;
}

.icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 8px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png");
  background-size: 100%;
}
.shop i {
  background-position: 0 -98px;
}
.service i {
  background-position: 0 -54px;
}
.bottom-right {
  display: flex;
  text-align: center;
  line-height: 59px;
}
.bottom-right span {
  flex: 1;
}
.shopping-cart {
  background-color: #ffe817;
  color: #000;
}
.buy {
  background-color: #ff6699;
  color: #fff;
}
</style>