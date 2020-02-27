<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer :value="nav" disable-resize-watcher app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar color="white" app elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon color="blue" transition="scale-transition" @click.stop="onToggleDrawer"></v-app-bar-nav-icon>
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
      <!-- Sizes your content based upon application components -->
      <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-sheet>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      nav: false
    };
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

<style lang="scss">
</style>
