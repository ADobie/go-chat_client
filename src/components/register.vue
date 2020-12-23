/* eslint-disable */
<template>
  <v-content>
    <v-snackbar v-model="messageBar" color="error" :timeout="2000" :top="true">{{ message }}</v-snackbar>
    <v-row align="center" justify="center" style="margin-top: 5%;">

    </v-row>
    <br>
    <v-card max-width="500" style="position: relative ;left: 37%">
      <v-card-title>注册</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="inputForm.username"
            :rules="nameRules"
            label="账号"
            required
            autocomplete="off"
          />

          <v-text-field
            v-model="inputForm.password"
            :rules="passwordRules"
            label="密码"
            type="password"
            required
            autocomplete="off"
          />
          <v-text-field
          v-model="inputForm.confirm"
          :rules="passwordRules"
          label="确认密码"
          type="password"
          required
          autocomplete="off"
        />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="primary" @click="onRegister">注册</v-btn>
        <v-btn text @click="onReset">重置</v-btn>
        <v-btn text @click="toLogin">返回登录</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <br>
    <div class="mt-8 text-center">Go-ChatRoom</div>

    <!-- 注册等待 -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card dark>
        <v-card-text>
          <p>登录中.....</p>
          <v-progress-linear indeterminate color="white" class="mb-0"/>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-content>
</template>

<script>
import config from '../config'

export default {
  name: 'register',
  data () {
    return {
      isLoading: false,
      messageBar: false,
      message: '',
      nameRules: [
        v => !!v || '请输入账号'
      ],
      passwordRules: [
        v => !!v || '请输入密码'
      ],
      inputForm: {
        username: '',
        password: '',
        confirm: ''
      }
    }
  },
  methods: {
    onRegister: function () {
      this.axios.post(
        "http://localhost:4444/register",
        JSON.stringify(this.inputForm)
      ).then(function(response) {
        window.console.log(response);
          const RegisterResult = response.data;
          if (RegisterResult.code === 200) {
          this.$message({
            message: '注册成功',
            type: 'success',
            onClose: () => {
              this.$router.replace({ path: '/login' })
            }
          })
        } else if (RegisterResult.code === 400) {
          this.$message.error('用户名不合法')
        }
      })
    },
    onReset () {
      this.inputForm = {
        name: '',
        password: '',
        confirm: ''
      }
    },
    toLogin () {
      this.$router.push({ path: '/login' })
    }

  }
}
</script>

<style scoped>
</style>
