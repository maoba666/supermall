<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll
      class="content"
      :pull-up-load="true"
      :probe-type="3"
      ref="scroll"
      @scroll="contentScroll"
    >
    
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :paramInfo="paramInfo" ref="detailParamInfo"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo " ref="detailCommentInfo"></detail-comment-info>
      <goods-list :goods="recommend" ref="goodsList"></goods-list>
    </scroll>

    <detail-bottom-info @addCart="addCart"></detail-bottom-info>
    <back-top v-show="isshow" @click.native="backClick"  />
  </div>
</template>

<script>
import DetailNavBar from "./childcomps/DetailNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamsInfo from "./childcomps/DetailParamsInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import DetailShoppingCart from "./childcomps/DetailShoppingCart";
import DetailBottomInfo from "./childcomps/DetailBottomInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";

import { itemImgListenerMixin, backTopMixin } from "commonjs/mixin";
import { debounce } from "commonjs/utils";
import { TOP_DISTANCE } from "commonjs/const";

import {
  getDetail,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailShoppingCart,
    DetailBottomInfo,

    Scroll,
    GoodsList,
    GoodsListItem,
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      shopCart: {},
      themeTopYs: [],
      getThemeTopY: null,
      titleCurrentIndex: 0,
    };
  },
  created() {
    // this.iid = this.$route.parmas.iid;
    //1、保存传入的iid
    this.iid = this.$route.params.iid;

    //2、根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //1).获取轮播图片
      this.topImages = res.result.itemInfo.topImages;
      //2)将商品信息封装到GoodsInfo类中
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3)将店铺信息封装到Shop类中
      this.shop = new Shop(data.shopInfo);
      //4)保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5)将参数信息封装到GoodsParam类中
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6)保存评论信息
     if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }
    });
    //3、获取推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    //8给getThemeTopY赋值（使用防抖函数）
    this.getThemeTopY = debounce(() => {
      //获取每个组件距离顶部的Y值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 50);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },

    //用scrollTo跳转到指定位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // console.log(i);
          this.titleCurrentIndex = i;
          this.$refs.nav.currentIndex = this.titleCurrentIndex;
        }
      }
      this.isshow = position.y < -TOP_DISTANCE;
    },
  addCart(){

    const product = {}
    product.iid = this.iid
    product.image = this.topImages[0]
    product.title = this.goods.title
    product.name = this.shop.name
    product.desc = this.goods.desc
    product.realPrice = this.goods.realPrice  
    this.$store.dispatch('addList',product).then(res => {
      this.$toast.showToast(res, 500);
    })
  }
  },
  mounted() {},
  destroyed() {
    //1、取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>
<style  scoped>
#detail {
  position: relative;
  z-index: 100;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
}
.content {
  position: relative;
  overflow: hidden;
  height: calc(100% - 44px - 49px);
}
</style>