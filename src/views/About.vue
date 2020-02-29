<template>
  <with-app-bar>
    <div class="about">
      <v-img
        alt="Guet Logo"
        class="shrink mx-auto"
        contain
        src="@/assets/gbh_logo_null_mini.png"
        transition="scale-transition"
        width="150px"
      />

      <v-card class="mx-auto mt-12 pa-4">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <strong>关于</strong>
            </v-list-item-title>
            <v-list-item-content>
              第三方桂北汇，在兼容官方小程序的情况下扩展出的项目。
              部分功能因为有测试风险无法实现，如选课。请使用官方小程序进行操作。
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <strong>项目开发组成员</strong>
            </v-list-item-title>
            <v-list-item-content>
              <v-list-item>
                <a href="https://github.com/Kurokitu">Kurokitu</a>
              </v-list-item>
              <v-list-item>
                <a href="https://github.com/thislight">Rubicon L</a>
              </v-list-item>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </with-app-bar>
</template>
