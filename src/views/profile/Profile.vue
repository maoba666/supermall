<template>
  <div id="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">我的</div>
    
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "Profile",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
#profile {
color: #FFF;
}

.profile-nav-bar {
  background-color: var(--color-tint);

}
</style>
