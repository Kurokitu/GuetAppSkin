<template>
    <v-app-bar color="white" app elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon
        color="light-blue"
        transition="scale-transition"
        @click.stop="onToggleDrawer"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center" @click="$router.push('/')">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/gbh_logo_null_mini.png"
          transition="scale-transition"
          width="30"
        />
        <v-toolbar-title class="light-blue--text">桂北汇</v-toolbar-title>
      </div>
    </v-app-bar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onToggleDrawer(){
      let drawer = this.value;
      drawer = ! drawer;
      this.$emit('input', drawer);
    }
  }
}
</script>
