<template>
  <div>
    <my-app-bar v-bind="$attrs" v-model="drawer"></my-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>-->

      <v-list nav>
        <v-list>
          <v-list-item link @click="goInfoPage()">
            <v-list-item-content>
              <v-list-item-title class="title">你</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action >
              <v-icon>mdi-menu-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
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
    </v-navigation-drawer>

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="100%"
      v-resize="onResize"
    >
      <v-content>
        <v-container fluid>
          <v-dialog v-model="standByHintOpen" persistent attach max-width="600px">
            <v-card style="text-align: center;" tile class="mx-auto" raised>
              <v-card-text class="title pt-4">请稍候</v-card-text>
            </v-card>
          </v-dialog>
          <slot></slot>
        </v-container>
      </v-content>
    </v-sheet>
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
  data() {
    return {
      drawer: false,
      items: [
        { title: "主页", icon: "mdi-home", page: "Index" },
        { title: "课程表", icon: "mdi-image", page: "Index" },
        { title: "关于", icon: "mdi-help-box", page: "About" }
      ],
      standByHintOpen: false
    };
  },
  mounted() {
    this.$bus.on("need_standby", () => {
      this.standByHintOpen = true;
    });
    this.$bus.on("no_standby", () => {
      this.standByHintOpen = false;
    })
    this.onResize();
  },
  methods: {
    onResize() {
      if (window.innerWidth >= 1440) {
        this.$bus.emit("hide_drawer_button");
        let { requireLogin, skipIfLoggedIn } = this.$route.meta;
        if (!requireLogin && skipIfLoggedIn) {
          this.drawer = false;
        } else {
          this.drawer = true;
        }
      } else {
        this.$bus.emit("show_drawer_button");
      }
    },
    goInfoPage(){
      this.$router.push({ name: 'Info' });
    }
  }
};
</script>