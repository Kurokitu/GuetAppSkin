<template>
  <with-app-bar>
    <div class="about">
      <v-card style="height: 120px" class="mx-auto mt-4" elevation="0">
        <transition name="bounce">
          <v-img
            alt="Guet Logo"
            class="shrink mx-auto"
            contain
            src="@/assets/img/gbh_logo_null_mini.png"
            transition="scale-transition"
            width="120px"
            v-if="show"
            @click="LshowOff()"
          />
        </transition>
      </v-card>

      <v-card class="mx-auto mt-12 pa-4">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <strong>关于</strong>
            </v-list-item-title>
            <v-list-item-content>
              第三方桂北汇，在兼容官方小程序的情况下扩展出的项目。
              部分功能因为有测试风险无法实现，如选课、退课。请使用官方小程序进行操作。
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </with-app-bar>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      show: true,
      showclicknum: 0
    };
  },
  methods: {
    LshowOff() {
      this.show = false;
      this.showclicknum = this.showclicknum + 1;
      setTimeout(this.LshowOn, 1000);
    },
    LshowOn() {
      this.show = true;
      if (this.showclicknum == 10) {
        this.$snackbar.info("再点也没用啦！");
        this.showclicknum = 0;
      }
    }
  }
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>