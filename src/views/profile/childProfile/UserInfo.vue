<!--  -->
<template>
  <div class="user-info">
    <img src="~assets/img/profile/avatar.svg" alt="" class="avatar">
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  },
};
</script>
<style  scoped>
.user-info {
  background-color: var(--color-tint);
  display: flex;
  padding: 8px 12px;
  height: 90px;
}
.avatar {
  width: 80px;
  vertical-align: middle;
}
.info {
  color: #ffffff;
  padding-left: 12px;
  flex: 1;
}
.login {
  margin-top: 12px;
}
.phone {
  margin-top: 12px;
}
.phone img {
  width: 20px;
  vertical-align: middle;
  margin-left: -4px;
}
.arrow {
    line-height: 90px;
}
.arrow img {
  width: 20px;

}

</style>