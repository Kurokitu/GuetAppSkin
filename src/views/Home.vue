<template>
  <with-app-bar>
    <div class="home">
      <v-card class="mx-auto home" elevation="0">
        <v-img
          alt="Guet Logo"
          class="shrink mx-auto"
          contain
          src="@/assets/gbh_logo_null_mini.png"
          transition="scale-transition"
          width="250px"
        />
        <v-card-text class="mt-5 blue--text display-2">桂北汇</v-card-text>
        <v-card-text class="mt-5">
          <v-btn
            x-large
            dark
            color="blue"
            calss="mx-auto"
            @click="$router.push('/Index')"
          >
            <strong>开始</strong>
            <v-icon right dark>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </with-app-bar>
</template>

<script>
// @ is an alias to /src


export default {
  name: "Home",
  mounted() {
    if (this.$get.getAuthData !== false) {
      this.$router.push({ name: "Index" });
    }
  },
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 16%;
}

@media screen and (min-width: 300px) {
  .home {
    text-align: center;
    margin-top: 8%;
  }
}
</style>