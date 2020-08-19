<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{current: index === currentIndex}"
          @click="toggleMenu(index)"
        >{{item.text}}</li>
      </ul>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        size="medium"
      >
        <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minLength="6" maxLength="20"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="passwords" v-show="currentIndex !== 0">
            <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minLength="6" maxLength="20"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
            <el-row :gutter="10">
                <el-col :span="15">
                    <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="9">
                    <el-button type="success" class="btn-block" @click="submitForm('ruleForm')" minLength="6" maxLength="6">获取验证码</el-button>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn btn-block" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {validateEmail, strFilter, validatePass, validateVcode} from '@/utils/validate.js'
export default {
  name: "Login",
  data() {
    // 验证用户名
    var validateUserName = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (value === "") {
            callback(new Error("请输入用户名"));
        }else if(!validateEmail(value)){
            callback(new Error("用户名格式有误"));
        } else {
            callback();
        }
    };
    // 验证密码
    var validatePassWord = (rule, value, callback) => {
        if(value === ""){
            callback(new Error("请输入密码"));
        }else if(strFilter(value)){
            callback(new Error("密码不能含有特殊字符"));
        }else{
            if (!validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母!"));
            }else{
                callback();
            }
        }
    };
    // 验证二次密码
    var validatePassWords = (rule, value, callback) => {
        if(this.currentIndex === 0){callback()}
        if(value === ""){
            callback(new Error("请输入密码"));
        }else if(strFilter(value)){
            callback(new Error("密码不能含有特殊字符"));
        }else{
            if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致"));
            }else{
                callback();
            }
        }
    };
    // 验证码
    var validateCode = (rule, value, callback) => {
        if (value === '') {
            return callback(new Error("验证码不能为空"));
        }else if(!validateVcode(value)){
            return callback(new Error("验证码为6位数字"));
        }else{
            callback();
        }
    };
    return {
      currentIndex: 0,
      menuTab: [{ text: "登录" }, { text: "注册" }],
      ruleForm: {
        userName: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassWord, trigger: "blur" }],
        passwords: [{ validator: validatePassWords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleMenu(index) {
      this.currentIndex = index;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
};
</script>
<style lang="less" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current {
  background: rgba(0, 0, 0, 0.1);
}

</style>

<style>
    .el-form--label-top .el-form-item__label{
        color: white!important;
    }
    .btn-block{
        width:100%;display: block;
    }
    .login-btn{
        margin-top: 20px;
    }
</style>
