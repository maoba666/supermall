<template>
 <div id="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车(0)</div>
      <div slot="right">管理</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Cart",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
#cart {
  color: #FFF;
}
.cart-nav-bar {
   background-color: var(--color-tint);
}
</style>
