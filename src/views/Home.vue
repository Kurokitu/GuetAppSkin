<template>
  <div id="home">
    <div class="Home-Hello">
      <h1>{{ name }},</h1>
      <p class="Home-Hello-p">早上好！</p>
      <v-avatar class="Home-Hello-av" color="blue" size="48">
        <span class="white--text headline">{{ aname }}</span>
      </v-avatar>
    </div>
    <v-card class="mx-auto Home-Card elevation-2" max-width="90%" tile outlined>
      <v-card-title>
        <strong class="subheading">课程（星期二）</strong>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>

      <v-list-item v-for="citem in cdata" :key="citem.title">
        <v-list-item-content>
          <v-list-item-title>{{ citem.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ citem.onetime }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ citem.twotime }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "测试",
      aname: "",
      cdata: [
        {
          title: "大学英语I",
          onetime: "第一节:8:25 - 9:10",
          twotime: "第二节:9:20 - 10:05",
          info: ""
        },
        {
          title: "体育I",
          onetime: "第一节:10:25 - 11:10",
          twotime: "第二节:11:20 - 12:05",
          info: ""
        },
        {
          title: "思修I",
          onetime: "第一节:16:30 - 17:15",
          twotime: "第二节:17:25 - 18:10",
          info: ""
        }
      ]
    };
  },
  mounted() {
    this.aname = this.name.substr(0, 1);
  }
};
</script>