<template>
  <div id="login">
    <div class="panel">
      <el-form ref="operForm">
        <div class="title">{{ sitename }} 登录</div>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" class="input-username" autocomplete="off" v-model.trim="formData.username">
            <template #prefix>
              <i-ep-user></i-ep-user>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" class="input-password" autocomplete="off" show-password v-model="formData.password">
            <template #prefix>
              <i-ep-lock></i-ep-lock>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="captcha">
            <el-input placeholder="请输入图片验证码" class="input-captcha" v-model.trim="formData.captcha">
              <template #prefix>
                <i-ep-set-up></i-ep-set-up>
              </template>
            </el-input>
            <el-image class="img-captcha" :src="imgCaptcha" @click="getLoginCaptcha"></el-image>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-login" round>登录</el-button>
        </el-form-item>
        <div class="forget-password">
          <el-button type="primary" link @click="forgetPassword">忘记密码？</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config/config'
import Captcha from '@/api/captcha'
import MessageBox from '@/utils/messageBox'

const sitename = config.site.name
const formData = reactive({
  username: '',
  password: '',
  captcha: ''
})
const imgCaptcha = ref('')
const getLoginCaptcha = () => {
  Captcha.login().then((res: any) => (imgCaptcha.value = res.data.captcha))
}
getLoginCaptcha()
const forgetPassword = () => {
  MessageBox.show('请联系管理员重设密码')
}
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 80vh;
  padding-top: 20vh;
  background: url('../assets/images/loginBg.jpg') no-repeat;
  background-size: cover;
  .panel {
    @include border-radius-big();

    display: flex;
    flex-direction: column;
    align-items: center;
    color: $gray-color;
    width: 320px;
    height: 310px;
    background: white;
    margin: 0 auto;

    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: $font-size-huge;
    }
    %base-element {
      width: 280px;
    }
    .input-username,
    .input-password {
      @extend %base-element;
    }
    .captcha {
      @extend %base-element;

      display: flex;
      justify-content: space-between;
      .input-captcha {
        width: 190px;
      }
      .img-captcha {
        @include border-radius-small();

        width: 80px;
        cursor: pointer;
      }
    }
    .submit-login {
      @extend %base-element;

      margin-top: 5px;
    }

    .forget-password {
      @extend %base-element;

      display: flex;
      justify-content: flex-end;
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
