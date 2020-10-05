<template>
  <div id="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
    <user-info/>
    <acount/>
    <nomal-list :list-data="orderList"/>
    <nomal-list :list-data="serviceList"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childProfile/UserInfo"
import Acount from "./childProfile/Acount"
import NomalList from "./childProfile/NomalList"
  export default {
    name: "Profile",
    components:{
      NavBar,
      UserInfo,
      Acount,
      NomalList
    },
    data() {
    	return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
  }
</script>

<style scoped>
#profile {
/* color: #FFF; */
background-color: #f2f2f2;
}

.profile-nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;

}
</style>
