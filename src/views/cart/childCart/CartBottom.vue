<!--  -->
<template>
  <div class="cart-bottom">
    <div class="check-all">
      <check-button
        :isChecked="checkAll"
        @click.native="AllClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total" v-show="!isShowMessage">
      总计：￥
      <span>{{ totalPrice }}</span>
    </div>
    <div v-show="isShowMessage" @click="ancleClick" class="ancle">取消</div>
    <div class="total-count" @click="calculationClick">
      <span>{{ message }}({{ totalCount }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CartBottom",
  components: {
    CheckButton,
  },
  props: {
    message: {
      type: String,
      default: "结算",
    },
    isShowMessage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["deleteProduct"]),
    AllClick() {
      if (this.checkAll) {
        this.cartList.forEach((item) => {
          return (item.checked = false);
        });
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    ancleClick() {
      this.$emit("ancleClick");
    },
    calculationClick() {
      //some()：一真即真
      if (!this.cartList.some((item) => item.checked)) {
        this.$toast.showToast("请至少选择一项商品!", 800);
      } else if (this.message.indexOf("删除") !== -1) {
        this.deleteProduct();
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return item.realPrice * item.count + preValue;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.cartList.filter((item) => item.checked).length;
    },
    checkAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
};
</script>
<style  scoped>
.cart-bottom {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  height: 40px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
}
.check-all {
  display: flex;
  flex: 1;
  line-height: 40px;
  /* margin-left: 2vw; */
  justify-content: center;
}
.check-all span {
  margin-left: 2vw;
}
.total {
  flex: 2;
  line-height: 40px;
  text-align: center;
}
.total span {
  color: var(--color-tint);
}
.total-count {
  flex: 1;
  line-height: 40px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
  font-size: 14px;
}
.ancle {
  flex: 2;
  line-height: 40px;
  justify-content: center;
  background-color: var(--color-high-text);
  color: #ffffff;
  text-align: center;
}
</style>