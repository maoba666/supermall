<!--  -->
<template>
  <div class="cart-list-item">
    <div class="item-selector" @click="btnClick">
      <check-button :is-checked="product.checked" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-name">
        <img src="~assets/img/profile/vip.svg" alt="" height="48" width="48" />
        {{ product.name }}
      </div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="item-price">
        <span>￥{{ product.realPrice }}</span>
        <div class="item-count">
          <div @click="subClick">-</div>
          <div>{{ product.count }}</div>
          <div @click="addClick">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton";
import { mapMutations } from "vuex";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    ...mapMutations(["updateCounts"]),
    btnClick() {
      this.product.checked = !this.product.checked;
    },
    subClick() {
      if (this.product.count > 1) {
        this.updateCounts({ item: this.product, number: -1 });
      } else {
        this.$toast.showToast("不能再少了.亲", 500);
      }
    },
    addClick() {
      if (this.product.count >= 10) {
        this.$toast.showToast("不能再多了亲", 500);
      } else {
        this.updateCounts({ item: this.product, number: 1 });
      }
    },
  },
};
</script>
<style  scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 5.33333vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-button {
  background-color: #999;
  border-radius: 50%;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 21vw;
  height: 29vw;
  border-radius: 3vw;
}
.item-info {
  width: 100%;
  text-align: center;
  font-size: 4.53333vw;
  color: #333;
  padding: 1.33333vw 2.66667vw;
  position: relative;
  overflow: hidden;
  font-size: 3.73333vw;
  color: #666;
}
.item-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 4vw;
  color: #000;
}
.item-name img {
  width: 5.33333vw;
  height: 5.33333vw;
  vertical-align: text-bottom;
}
.item-desc {
  text-align: left;
  white-space: nowrap;
  margin-top: 4vw;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-price {
  display: flex;
  justify-content: space-between;
  margin-top: 5vw;
}
.item-price span {
  color: var(--color-tint);
  font-size: 5vw;
}
.item-count {
  display: flex;
  height: 5vw;
  line-height: 5vw;
  text-align: center;
}
.item-count div {
  flex: 1;
  width: 7vw;
  height: 6vw;
  line-height: 6vw;
  border: 1px solid #cccccc;
}
</style>