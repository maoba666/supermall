<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center" class="title">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      ref="tabControl1"
      v-show="isfixed"
    ></tab-control>
    <scroll
      class="content"
      @pullingUp="loadMore"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        class="tab-control"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childHome/HomeSwiper";
import RecommendView from "./childHome/RecommendView";
import Feature from "./childHome/Feature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "commonjs/utils";
import {itemImgListenerMixin} from "commonjs/mixin"
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    Feature,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins:[itemImgListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isshow: false,
      tabOffSetTop: 0,
      isfixed: false,
      saveY:0
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
   
  },
  activated() {
    //一进入组件就滚动到离开时保存的位置
    this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
    //refresh():重新计算 better-scroll,
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
  deactivated() {
     this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    //计算属性

    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      //  this.$refs.scroll.scroll.refresh();
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isshow = -position.y > 1000;
      this.isfixed = -position.y > this.tabOffSetTop;
    },
    swiperImageLoad() {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //请求数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        (this.banners = res.data.banner.list),
          // console.log(res.data.banner.list);
          (this.recommends = res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* color: #fff; */
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.title {
  color: #fff;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: var(--color-tint);
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
