<template>
  <div id="login">
    <div class="panel">
      <div class="title">{{ sitename }} 登录</div>
      <el-form ref="operForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" class="input margin" autocomplete="off">
            <template #prefix>
              <i-ep-user></i-ep-user>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" class="input margin" autocomplete="off" show-password>
            <template #prefix>
              <i-ep-lock></i-ep-lock>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="login-submit margin" round>登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config/config'
const sitename = config.site.name
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 80vh;
  padding-top: 20vh;
  background: url('../assets/images/loginBg.jpg') no-repeat;
  background-size: cover;
  .panel {
    @include border-radius();

    color: $gray-color;
    width: 320px;
    height: 300px;
    background: white;
    margin: 0 auto;
    text-align: center;

    .title {
      font-size: $font-size-huge;
      padding-top: 30px;
    }
    .input {
      width: 280px;
      margin-left: 20px;
    }
    .login-submit {
      width: 280px;
    }
    .margin {
      margin-top: 20px;
    }
  }
}

@media screen and (max-width: 320px) {
  .panel {
    width: 280px;
  }
  .input {
    width: 240px;
  }
  .login-submit {
    width: 240px;
  }
}
</style>
