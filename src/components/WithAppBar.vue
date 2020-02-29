<template>
  <div>
    <my-app-bar v-bind="$attrs" v-model="drawer"></my-app-bar>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
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

    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="100%">
      <v-content>
        <v-container fluid>
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
      ]
    };
  }
};
</script>