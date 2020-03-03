<template>
  <with-app-bar>
    <v-card class="pa-4 mx-auto" elevation="0">
      <v-list>
        <transition name="fade">
          <v-list-item v-show="!myid">
            <v-list-item-avatar>
              <v-progress-circular indeterminate color="primary" v-if="!isError"></v-progress-circular>
              <v-icon v-else-if="isError" color="red">mdi-alert-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-if="!isError">正在联系桂北汇</v-list-item-title>
            <v-list-item-title v-else-if="isError">桂北汇拒绝了我们的请求</v-list-item-title>
            <v-list-item-action v-show="isError" @click="retryInfoLoad()">
              <v-icon>mdi-refresh</v-icon>
            </v-list-item-action>
          </v-list-item>
        </transition>
        <v-subheader>你的信息</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>姓名</v-list-item-title>
            <v-list-item-subtitle>{{ myname }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>性别</v-list-item-title>
            <v-list-item-subtitle>{{ mygender }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>学号</v-list-item-title>
            <v-list-item-subtitle>{{ myid }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>班级</v-list-item-title>
            <v-list-item-subtitle>{{ myclass }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>你的资历</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>年级</v-list-item-title>
            <v-list-item-subtitle>{{ mygrade }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>专业</v-list-item-title>
            <v-list-item-subtitle>{{ mydiscipline }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>账户安全</v-subheader>
      <v-list-item link @click.stop="editPasswordDialog = !editPasswordDialog">
        <v-list-item-avatar>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>修改密码</v-list-item-title>
      </v-list-item>
    </v-card>
    <v-dialog v-model="editPasswordDialog" persistent attach max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改密码</span>
        </v-card-title>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="旧密码*"
                    type="password"
                    required
                    v-model="oldPassword"
                    :rules="oldPassRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="新密码*"
                    type="password"
                    required
                    v-model="newPassword"
                    :rules="newPassRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="再次输入新密码*"
                    type="password"
                    required
                    v-model="newPasswordAgain"
                    :rules="newPassAgainRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small class="red--text pl-4">标*为必填选项</small>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearPasswordEditAndClose()">取消</v-btn>
          <v-btn color="blue darken-1" text @click="submitNewPassword()" :disabled="!valid">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="failDialog" persistent attach max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">无法修改你的密码</span>
        </v-card-title>
        <v-card-text>就是这样</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="failDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </with-app-bar>
</template>

<script>
import { UserInfoCall, ChangePasswordCall } from "@/plugins/guetsdk/structures";
import { updatePassword } from "@/usersaving";

export default {
  name: "Index",
  data() {
    return {
      myname: null,
      myid: null,
      myclass: null,
      mygender: null,
      mygrade: null,
      mydiscipline: null,
      myflatId: null,
      day: null,
      windowSize: {
        x: 0,
        y: 0
      },
      todayState: false,
      today: [],
      isError: false,
      editPasswordDialog: false,
      failDialog: false,
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      newPasscomparison: false,

      oldPassRules: [v => !!v || "不能为空"],
      newPassRules: [v => !!v || "不能为空"],
      newPassAgainRules: [
        v => !!v || "不能为空",
        v => v == this.newPassword || "两次新密码输入不一致"
      ],
      valid: true
    };
  },
  mounted() {
    this.onResize();
    this.retryInfoLoad();
    this.day = this.getWeekDate();
  },
  computed: {
    daytext() {
      if (this.day) {
        return this.day.name;
      } else {
        return null;
      }
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    async UserInfo() {
      let userInfoResult = await this.$guet().send(new UserInfoCall());
      this.myname = userInfoResult.name;
      this.myid = userInfoResult.id;
      this.myclass = userInfoResult.classId;
      this.mygender = userInfoResult.gender;
      this.mygrade = userInfoResult.grade;
      this.mydiscipline = userInfoResult.discipline;
      this.myflatId = userInfoResult.flatId;
    },
    retryInfoLoad() {
      this.isError = false;
      this.UserInfo().catch(() => {
        this.isError = true;
      });
    },
    submitNewPassword() {
      let call = new ChangePasswordCall(this.oldPassword, this.newPassword);
      this.$bus.emit("need_standby");
      this.$guet()
        .send(call)
        .then(x => {
          updatePassword(this.newPassword);
          this.clearPasswordEditAndClose();
          this.$snackbar.success("修改成功");
          return x;
        })
        .then(() => {
          this.$bus.emit("no_standby");
        })
        .catch(() => {
          this.failDialog = true;
          this.$bus.emit("no_standby");
        });
    },
    clearPasswordEditAndClose() {
      this.editPasswordDialog = false;
      this.oldPassword = "";
      this.newPassword = "";
      this.newPasswordAgain = "";
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 320px) {
  .hide-if-too-small {
    visibility: hidden;
  }
}
</style>
