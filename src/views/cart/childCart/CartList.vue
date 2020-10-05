<!--  -->
<template>
  <div class="cart-list">
    <scroll class="context" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :product="item"/>
     
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
    
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>
<style  scoped>
.cart-list {
  height: calc(100% - 44px - 41px - 40px);
}
.context {
  height: 100%;
  overflow: hidden;
}
</style>