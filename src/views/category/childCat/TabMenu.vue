<!--  -->
<template>
  <scroll class="tab-menu" ref="scroll"  :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in categories"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  props: {
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    loadMore() {
        this.$refs.scroll.scroll.refresh()
      },
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('itemClick', index)
    },
  },
};
</script>
<style  scoped>
.tab-menu {
  background-color: #f6f6f6;
  height: calc(100vh - 49px - 44px);
  overflow: hidden;
  width: 100px;
  box-sizing: border-box;
}
.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 0.8vw solid var(--color-high-text);
}
.menu-list-item {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
}
</style>