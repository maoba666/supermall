<template>
 <div id="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
      <div slot="right" @click="delClick">管理</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom :message="message" :isShowMessage="isShowMessage" @ancleClick='ancleClick'></cart-bottom>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childCart/CartList'
import CartBottom from './childCart/CartBottom'
import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottom
    },
    data(){
      return {
        message:'结算',
        isShowMessage:false
      }
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    methods:{
      delClick(){
        //1、监听管理按钮的点击
        this.message = '删除';
        this.isShowMessage = true;
      },
      ancleClick(){
        this.message = '结算';
        this.isShowMessage = false;
      }
    }
  }
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav-bar {
   background-color: var(--color-tint);
   color: #ffffff;
}
</style>
