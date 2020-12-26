/* eslint-disable */
<template>
  <v-content>
    <v-snackbar v-model="messageBar" color="error" :timeout="2000" :top="true">{{ message }}</v-snackbar>
    <v-row align="center" justify="center" style="margin-top: 5%;">
      <!--      <h1 class="display-2 font-weight-thin">ScarletWaf</h1>-->
<!--      <img src="../assets/logo.png" height="150px" width="300px">-->
    </v-row>
    <br>
    <v-card max-width="500" style="position: relative ;left: 37%">
      <v-card-title>登录</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="inputForm.username"
            :rules="nameRules"
            label="用户名"
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
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="primary" @click="onLogin">登录</v-btn>
        <v-btn text @click="onReset">重置</v-btn>
        <v-btn text @click="toRegister">去注册</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <br>
    <div class="mt-8 text-center">Go-ChatRoom</div>

    <!-- 登录等待 -->
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
        name: 'login',
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
                    password: ''
                }
            }
        },
        methods: {
            onLogin: function () {
                this.axios.post(
                    'http://127.0.0.1:4444/api/login',
                    JSON.stringify(this.inputForm)
                ).then((response) => {
                    console.log(response.data.token);
                    //console.log(typeof response.headers);
                    const LogResult = response.data;
                    //console.log(response.data.code);
                    // TODO:  莫名奇妙的原因导致response.header.get is not a function
                    // 使用new Header(xxx) 解决
                    if (LogResult.code === "200") {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            onClose: () => {
                                localStorage.setItem("token",response.data.token);
                                this.$router.replace({ path: '/chatroom' })
                            }
                        })

                    } else if (LogResult.code === "400") {
                        this.$message.error('用户名或密码错误')
                    }
                })
            },
            onReset () {
                this.inputForm = {
                    Name: '',
                    Email: '',
                    Password: ''
                }
            },
            toRegister () {
                this.$router.replace({ path: '/register' })
            }

        }
    }
</script>

<style scoped>
</style>
