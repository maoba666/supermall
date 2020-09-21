<!--  -->
<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{active:index===currentIndex}"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>
<style  scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(100, 100, 100,.1);
  text-align: center;

  
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
  padding: 5px;
}

</style>