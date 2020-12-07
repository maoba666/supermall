<!--  -->
<template>
  <div class="tab-content-category">
    <grid-view
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="gridViewImgLoad"/>
          <div class="text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    GridView,
  },
  data() {
    return {};
  },
   methods:{
      //监听图片加载完成
      gridViewImgLoad(){
        this.$bus.$emit('gridViewImgLoad');
      }
    }
};
</script>
<style  scoped>
.tab-content-category {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 8px;
}
.item {
  width: 90px;
  /* margin-left: 8px; */
  text-align: center;
  font-size: 12px;
}
.item a img {
  width: 80%;
  vertical-align: middle;
}
.text {
  margin: 10px 0;
}
</style>