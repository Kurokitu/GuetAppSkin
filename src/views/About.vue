<template>
  <div class="about">
    <!-- <div class="home-logo">
      <img alt="logo" src="../assets/Guet_logo.svg">
    </div> -->

    <el-card class="box-card">
      <h1>关于桂北课表</h1>
      <p>桂北课表是由第三方学生个人开发的一款WebApp，数据来源于桂林电子科技大学桂北汇，桂北汇是由学校网络信息中心开发的一款学校官方微信小程序，本App与桂电网络信息中心没有任何直接关系。本APP不会直接上传和记录您的任何信息，所有认证数据均存储在本地。如您担心，请勿使用本APP。</p>
      <!-- <p>反馈联系方式：QQ1469924277(没事请勿骚扰)</p> -->
      <br />
      <p>如果你有一些对于本APP的建议欢迎发送邮件至<el-link type="primary" href="mailto:foxiti.a@gmail.com">foxiti.a@gmail.com</el-link>尽管我的技术并不精湛，但我会细心听取意见。</p>
      <br />
      <p>我并不追求有多少人来使用它，但仅仅是为了方便我，以及使用它的人，谢谢</p>
    </el-card>
    <el-card class="box-card">
      云端版本：V1.4
      APP版本：V1.3

      <el-button type="text" @click="open()" icon="el-icon-question"></el-button>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'about',
  methods: {
    open() {
      this.$message({
        message: 'WLZX N🐴$L',
        type: 'success'
      });
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 90%;
  }

  .box-card h1{
    line-height: 100px;
    text-align: center;
  }

  .box-card p {
    line-height: 24px;
  }
</style>
