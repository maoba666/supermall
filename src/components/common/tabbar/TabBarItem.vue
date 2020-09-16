<!--  -->
<template>
  <div class="tabbar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt />
    <div>首页</div>-->
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon_active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isactive:true
    };
  },
  computed: { 
    isactive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isactive?{color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
      console.log(111111111111);
    },
  },
};
</script>
<style  scoped>
.tabbar-item {
  flex: 1;
  text-align: center;
  margin-top: 3px;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

</style>