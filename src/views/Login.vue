<template>
  <v-app id="inspire">
    <v-content>
          <v-col cols="12" sm="4" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="blue" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" v-icon="person" type="text" />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>