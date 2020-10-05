<!--  -->
<template>
  <div class="acount">
    <div class="acount-item">
      <div class="number"><span>0.00</span>元</div>
      <div class="acount-info">我的余额</div>
    </div>
    <div class="acount-item">
      <div class="number"><span>0</span>个</div>
      <div class="acount-info">我的优惠</div>
    </div>
    <div class="acount-item">
      <div class="number"><span>0</span>分</div>
      <div class="acount-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Acount",
  data() {
    return {};
  },
};
</script>
<style  scoped>
.acount {
  display: flex;
}
.acount-item {
  flex: 1;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  margin-left: 1px;
}
.acount-item span {
  color: var(--color-tint);
  font-size: 25px;
  font-weight: 700;
}
.acount-info {
  margin-top: 5px;
  font-size: 12px;
}
</style>