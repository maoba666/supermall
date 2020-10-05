<!--  -->
<template>
  <div class="nomal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span>
        <img :src="iconURL(item)" alt="" />
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NomalList",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    iconURL(item) {
      return require("assets/img/profile/" + item.icon);
    },
  },
};
</script>
<style  scoped>
.nomal-list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}
.item {
  display: flex;
  line-height: 36px;
  height: 36px;
  margin-top: 12px;
  border-bottom: 1px solid #f2f2f2;
}
.item span img {
  width: 20px;
  vertical-align: middle;
  margin-top: -4px;
  margin-left: 12px;
}
.info {
  margin-left: 10px;
}
</style>