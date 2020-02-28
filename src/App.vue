<template>
  <v-app>
    <v-navigation-drawer :value="nav" disable-resize-watcher app>
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>-->

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push('/' + item.page)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-if="login" v-slot:append>
        <div class="pa-2">
          <v-btn color="red" dark block>
            <strong>注销</strong>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="white" app elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon
        v-if="login"
        color="blue"
        transition="scale-transition"
        @click.stop="onToggleDrawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center" @click="$router.push('/')">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/Guet_logo.svg"
          transition="scale-transition"
          width="30"
        />
        <v-toolbar-title class="blue--text">桂北汇</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="100%">
      <v-content>
        <v-container fluid>
          <router-view class="page-auto"></router-view>
        </v-container>
      </v-content>
    </v-sheet>

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
      login: true
    };
  },
  mounted() {
  },
  methods: {
    onToggleDrawer() {
      if (this.nav != true) {
        this.nav = true;
      } else {
        this.nav = false;
      }
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
