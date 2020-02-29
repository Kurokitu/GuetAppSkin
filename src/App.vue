<template>
  <v-app>
    <router-view></router-view>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      nav: false,
      items: [
        { title: "主页", icon: "mdi-home", page: "Index" },
        { title: "课程表", icon: "mdi-image", page: "Index" },
        { title: "关于", icon: "mdi-help-box", page: "About" }
      ],
      right: null,
      login: true,
    };
  },
  mounted() {
  },
  methods: {
    onToggleDrawer() {
      this.nav = !this.nav;
    }
  }
};
</script>>

<style>
.page-auto {
  width: 100%;
}

@media screen and (min-width: 500px) {
  .page-auto {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
