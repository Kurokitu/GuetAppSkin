<template>
  <v-app-bar color="white" app elevate-on-scroll scroll-target="#scrolling-techniques-7">
    <v-app-bar-nav-icon
      color="light-blue"
      transition="scale-transition"
      @click.stop="onToggleDrawer"
      v-show="drawerButton"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center" @click="$router.push('/')">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/img/gbh_logo_null_mini.png"
        transition="scale-transition"
        width="30"
      />
      <v-toolbar-title class="light-blue--text">桂北汇</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <v-menu top close-on-click v-if="!hideMenu">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" color="light-blue">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link>
          <v-list-item-title @click.stop="logout">注销你的登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    hideDrawer: {
      type: Boolean,
      default: false
    },
    hideMenu: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      drawerButton: !this.hideDrawer,
    }
  },
  methods: {
    onToggleDrawer() {
      let drawer = this.value;
      drawer = !drawer;
      this.$emit("input", drawer);
    },
    logout() {
      this.$bus.emit("need_standby");
      localStorage.clear()
      this.$router.push("/");
    }
  },
  mounted(){
    this.$bus.on("hide_drawer_button", () => {
      this.drawerButton = false;
    });
    this.$bus.on("show_drawer_button", () => {
      this.drawerButton = true;
    });
  }
};
</script>
