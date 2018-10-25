<template>
  <div id="account">
    <div class="hint">
      <span>温馨提示：</span>
      <span>如果您更改了手机号码，请输入新的手机号</span>
    </div>
    <div class="main">
      <div class="container">
        <li class="center">
          <div class="signtop">
            <label>原账号</label>
            <input type="tel" placeholder="请输入原手机号码" v-model="oldtel" maxlength="11"/>
          </div>
          <div class="signbottom">
            <label>新账号</label>
            <input type="tel" placeholder="请输入新手机号码" v-model="newtel" maxlength="11"/>
            <button @click="singIn" v-show="sendAuthCode">发送</button>
            <span v-show="!sendAuthCode">{{auth_time}}s</span>
          </div>
          <div class="signcenter">
            <label>验证码</label>
            <input type="tel" placeholder="请输入验证码" v-model="securityCode"/>
          </div>
        </li>
      </div>
    </div>
    <div class="btn">
      <button @click="btnOpera">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "account",
    data() {
      return {
        oldtel: null,
        newtel: null,
        securityCode: "",
        tokenNew: "",
        sendPwd: "发送",
        regPhone: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/,
        sendAuthCode: true,
        auth_time: 0
      };
    },
    mounted() {
      this.tokenNew = sessionStorage.getItem("Token");
    },
    updated() {
      window.scroll(0, 0);
    },
    methods: {
      singIn() {
        if (this.regPhone.test(this.oldtel) && this.regPhone.test(this.newtel)) {
          if (this.oldtel == this.newtel) {
            this.$message.warning({
              message: "两次输入手机号码一样，请检查哦！",
              duration: 6000
            });
            return;
          } else {
            this.$http({
              method: "post",
              url: "http://yinhan-media.weiyingjia.org/api/yinhan/code",
              data: {
                phone: this.newtel
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.tokenNew
              }
            }).then(res => {
              this.sendAuthCode = false;
              this.auth_time = 60;
              var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            }).catch(res => {
              console.log(res);
            });
          }
        } else {
          this.$message.error({
            message: "输入的手机格式有误，请重新输入！",
            duration: 6000
          });
        }
      },
      btnOpera() {
        let _this = this;
        if (this.oldtel == "" || this.newtel == "" || this.securityCode == "") {
          this.$message.error({
            message: "请填写手机号或验证码哦",
            duration: 6000
          });
          return;
        } else {
          this.$http({
            method: "post",
            url: "http://yinhan-media.weiyingjia.org/api/yinhan/updatephone",
            data: {
              oldphone: this.oldtel,
              phone: this.newtel,
              code: this.securityCode
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.tokenNew
            }
          }).then(res => {
            localStorage.phone = 1;
            this.$message({
              message: "修改成功",
              type: "success",
              duration: 6000
            });
            this.$router.push({
              path: "/index/mine"
            });
          }).catch(res => {
            this.$message.error({
              message: "您输入的验证码有误或验证码过期",
              duration: 6000
            });
          });
        }
      }
    }
  };
</script>

<style>
  #account {
    background: #FFFFFF !important;
  }

  #account .hint {
    padding: 2rem 3.8rem 2.3rem 3.8rem;
    display: flex;
    justify-content: space-around;
  }

  #account .hint span:nth-of-type(1) {
    width: 7rem;
    font-size: 1rem;
    color: #b674fd;
  }

  #account .hint span:nth-of-type(2) {
    color: #999;
  }

  #account .main {
    width: 94.7%;
    margin: 0 auto;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 3px;
  }

  #account .container {
    width: 95%;
    margin: 0 auto;
  }

  #account .center input {
    font-size: 1.1rem;
    letter-spacing: 0;
    opacity: 0.8;
  }

  #account .center label {
    display: inline-block;
    width: 5rem;
    color: #666666;
  }

  #account .center .signtop,
  #account .center .signbottom,
  #account .center .signcenter {
    padding: 1rem 0;
    font-size: 1.1rem;
    color: #333333;
    letter-spacing: 0;
  }

  #account .center .signbottom {
    padding: 0.5rem 0;
  }

  #account .center .signtop,
  #account .center .signbottom {
    border-bottom: 1px solid #f5f5f5;
  }

  #account .center .signbottom button,
  #account .center .signbottom span {
    width: 4.5rem;
    height: 2.5rem;
    display: inline-block;
    text-align: center;
    line-height: 2.5rem;
    background: #ffffff;
    border: 1px solid #b674fd;
    border-radius: 3px;
    color: #b674fd;
  }

  #account .btn {
    width: 100%;
    padding-top: 4rem;
  }

  #account .btn button {
    padding: 0.6rem 4rem;
    background: #b674fd;
    box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.39);
    border-radius: 3px;
    color: white;
    display: block;
    margin: 0 auto;
  }
</style>
