<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-control
      :titles="['综合', '新品', '销量']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isFixed"
      class="tab-control2"
    />
    <div class="box">
      <tab-menu :categories="categories" @itemClick="itemClick" />
      <scroll
        class="tab-content"
        :probe-type="3"
        :pull-up-load="true"
        @pullingUp="loadMore"
        @scroll="scroll"
        ref="scroll"
      >
        <tab-content-category :subcategories="showSubcategory" />
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <goods-list :goods="showCategoryDetail" />
      </scroll>
    </div>
     <back-top v-show="isshow" @click.native="backClick"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList";

import TabMenu from "./childCat/TabMenu";
import TabContentCategory from "./childCat/TabContentCategory";

import { POP, SELL, NEW, TOP_DISTANCE } from "commonjs/const";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import {
  tabControlMixin,
  itemImgListenerMixin,
  backTopMixin,
} from "commonjs/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    // TabControl,
    GoodsList,
  },
  mixins: [tabControlMixin, itemImgListenerMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      isFixed: false,
      saveY: 0,
      tabOffsetTop: 0,
    };
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    // 拿到所有数据
    _getCategory() {
      getCategory().then((res) => {
        // 1.保存分类数据
        this.categories = res.data.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          // 2.初始化每个分类的子数据
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 获取第一个分类的数据
        this._getSubcategories(0);
      });
    },
    //2、根据分类栏目的下标去请求相应的数据
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    //3、根据类型请求相应的商品数据（pop，new，sell）
    _getCategoryDetail(type) {
      // 1)获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2)发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3)将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    itemClick(index) {
      this._getSubcategories(index);
    },
    loadMore() {
      this.$refs.scroll.scroll.refresh();
    },
    scroll(position) {
      //1)、监听BackTop是否显示
      this.isshow = position.y < -TOP_DISTANCE;
      //2)、判断tabControl是否需要吸顶显示
      this.isFixed = this.tabOffsetTop + 70 < -position.y;
      // this.isshow = -position.y > 1000;
      // this.isFixed = -position.y > this.tabOffSetTop;
    },
    _tabClick(index) {
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
  },
  mounted() {
    this.$bus.$on("gridViewImgLoad", () => {
      //refresh():重新计算 better-scroll,   this.$refs.scroll：组件创建完成才能执行后面函数
      this.mixinRefresh();
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.tabOffsetLeft = this.$refs.scroll.$el.offsetLeft;
      
    });
  },
  activated() {
    //一进入组件就滚动到离开时保存的位置
    this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
    //refresh():重新计算 better-scroll,
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
  deactivated() {
    //1、保存离开时的位置
    this.saveY = this.$refs.scroll.getScrollY();

    //2、取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
.box {
  display: flex;
}
.tab-content {
  overflow: hidden;
  height: calc(100vh - 49px - 44px);
  flex: 1;
}
.tab-control2 {
  position: absolute;
  width: calc(100% - 101px);
  z-index: 3;
  right: 0;
  
}
.box {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
</style>
