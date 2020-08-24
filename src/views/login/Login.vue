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
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        size="medium"
      >
        <el-form-item label="邮箱" prop="userName">
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
                    <el-input v-model="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="9">
                    <el-button type="success" class="btn-block" @click="getSms()" minLength="6" maxLength="6" :disabled="codeBtnStatus.status">{{codeBtnStatus.text}}</el-button>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn btn-block" :disabled="loginBtnStatus" @click="submitForm('loginForm')">
              {{currentIndex === 0 ? '登录' : '注册'}}
            </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1';
import {reactive, ref, onMounted} from '@vue/composition-api';
import {validateEmail, strFilter, validatePass, validateVcode} from '@/utils/validate.js'
import {GetSms, Login, Register} from '@/service/api_2/login.js'

export default {
    name: "Login",
    setup(props, {refs, root}){
        // 验证用户名
        let validateUserName = (rule, value, callback) => {
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (value === "") {
                callback(new Error("请输入用户名"));
            }else if(!validateEmail(value)){
                callback(new Error("邮箱格式有误"));
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
                return callback(new Error("验证码为6位(数字+字母)"));
            }else{
                callback();
            }
        };
        // 基础类型
        const currentIndex = ref(0);            
        const loginBtnStatus = ref(true);   //登录按钮状态
        const timer = ref(null);            // 倒计时
        // 引用对象类型用reactive
        const menuTab = reactive([
            { text: "登录", type: 'login' },
            { text: "注册", type: 'register' }
        ])
        let codeBtnStatus = reactive({
            status: false,
            text: '获取验证码'
        })
        const ruleForm = reactive({
            userName: "2726454210@qq.com",
            password: "111111a",
            passwords: "",
            code: "",
        })
        const rules = reactive({
            userName: [{ validator: validateUserName, trigger: "blur" }],
            password: [{ validator: validatePassWord, trigger: "blur" }],
            passwords: [{ validator: validatePassWords, trigger: "blur" }],
            code: [{ validator: validateCode, trigger: "blur" }],
        })
        // 切换模块
        const toggleMenu = index =>  {
            if(currentIndex.value !== index){
                currentIndex.value = index;
                resetFromData()
                clearCountDown()
            }
        }
        // 获取验证码
        const getSms = () => {
            // 验证邮箱是否为空
            if(ruleForm.userName === ''){
                root.$message.error('邮箱不能为空！');
                return false
            }
            // 验证邮箱是否含有特殊字符串
            if(!validateEmail(ruleForm.userName)){
                root.$message.error('邮箱格式有误');
                return false
            }

            // 获取验证码
            let requestData = reactive({
                username: ruleForm.userName,
                module: menuTab[currentIndex.value].type
            })
            upDataBtnStatus({
                status: true,
                text: '发送中'
            })
            setTimeout(() => {
                GetSms(requestData).then(res => {
                    countDown(30)
                    loginBtnStatus.value = false
                }).catch(err => {
                    upDataBtnStatus({
                        status: false,
                        text: '重新发送'
                    })
                })
            }, 3000)
        }
        // 注册|登录
        const submitForm = (formName => {
            refs['loginForm'].validate((valid) => {
                if (valid) {
                    if(menuTab[currentIndex.value].type === 'login'){
                        let requestData = {
                            username: ruleForm.userName,
                            password: sha1(ruleForm.password),
                            code: ruleForm.code,
                        }
                        Login(requestData).then(res => {
                            root.$router.push({
                                name: 'Console'
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }else{
                        let requestData = {
                            username: ruleForm.userName,
                            password: sha1(ruleForm.password),
                            code: ruleForm.code,
                            module: 'register'
                        }
                        Register(requestData).then(res => {
                            // 当注册成功就跳回登录模块
                            toggleMenu(0)
                        }).catch(err => {
                            toggleMenu(0)
                        })
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        })
        // 重置表单
        const resetFromData = () => {
            refs['loginForm'].resetFields();
        }
        // 更新按钮
        const upDataBtnStatus = (params) => {
            codeBtnStatus.status = params.status;
            codeBtnStatus.text = params.text;
        }
        // 倒计时
        const countDown = (number) => {
            timer.value = setInterval(() => {
                number--;
                if(number === 0){
                    upDataBtnStatus({
                        status: false,
                        text: `重新发送`
                    })
                    clearInterval(timer.value)
                }else{
                    upDataBtnStatus({
                        status: true,
                        text: `倒计时${number}秒`
                    })
                }
            }, 1000)
        }
        // 切换模块并清除倒计时
        const clearCountDown = (() => {
            codeBtnStatus.status = false;
            codeBtnStatus.text = '获取验证码';
            clearInterval(timer.value)
        })

        // 挂载完成后
        onMounted(() => {
        })

        return {
            menuTab,
            ruleForm,
            rules,
            currentIndex,
            loginBtnStatus,
            codeBtnStatus,
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
