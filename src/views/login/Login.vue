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
                    <el-button type="success" class="btn-block" @click="getSms()" minLength="6" maxLength="6">获取验证码</el-button>
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
import {reactive, ref, onMounted} from '@vue/composition-api';
import {validateEmail, strFilter, validatePass, validateVcode} from '@/utils/validate.js'
import {GetSms} from '@/service/api_2/login.js'

export default {
    name: "Login",
    setup(props, context){
        // 验证用户名
        let validateUserName = (rule, value, callback) => {
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
        let validatePassWord = (rule, value, callback) => {
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
        let validatePassWords = (rule, value, callback) => {
            if(currentIndex.value === 0){callback()}
            if(value === ""){
                callback(new Error("请输入第二次密码"));
            }else if(strFilter(value)){
                callback(new Error("密码不能含有特殊字符"));
            }else{
                if (value !== ruleForm.password) {
                    callback(new Error("两次输入密码不一致"));
                }else{
                    callback();
                }
            }
        };
        // 验证码
        let validateCode = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error("验证码不能为空"));
            }else if(!validateVcode(value)){
                return callback(new Error("验证码为6位数字"));
            }else{
                callback();
            }
        };
        // 基础类型
        const currentIndex = ref(0)
        // 引用对象类型用reactive
        const menuTab = reactive([
            { text: "登录" },
            { text: "注册" }
        ])
        const ruleForm = reactive({
            userName: "",
            password: "",
            passwords: "",
            code: "",
        })
        const rules = reactive({
            userName: [{ validator: validateUserName, trigger: "blur" }],
            password: [{ validator: validatePassWord, trigger: "blur" }],
            passwords: [{ validator: validatePassWords, trigger: "blur" }],
            code: [{ validator: validateCode, trigger: "blur" }],
        })
        const toggleMenu = index =>  {
            currentIndex.value = index;
        }

        const getSms = () => {
            // console.log(ruleForm.userName)

            GetSms({username: ruleForm.userName})
        }

        const submitForm = (formName => {
            axios.get('user?ID=123456').then(function(res){
                console.log(res)
            }).catch(function(err){
                console.log(err)
            })

            context.refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        })

        // 挂载完成后
        onMounted(() => {
        })

        return {
            menuTab,
            ruleForm,
            rules,
            currentIndex,
            toggleMenu,
            getSms,
            submitForm
        }
    }
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
