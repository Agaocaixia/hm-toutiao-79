<template>
  <div class="container">
    <!-- 卡片 -->
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- status-icon 校验结果右边的图标  element文档 -->
      <el-form ref="loginForm" status-icon :rules="rules" :model="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- login  -> 注册点击事件 点击登录的时候对整个表单进行验证 在methods中声明方法  -->
          <el-button style="width:100%;background-color:skyblue" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      // 对整个表单进行校验
      // 给整个表单加 ref 属性 ref="loginForm"
      // 获取组件实例（dom对象） 调用校验函数
      // 函数名 validate valid值 判断是否调用成功
      this.$refs.loginForm.validate((valid) => {
        // 判断 如果 valid为true 代表成功，进行登录即可
        if (valid) {
          // 成功登录即可
          // 登录的时候需要调用接口，简单配置axios,
          // 需要接口文档 ->URL地址 请求类型 传参 返回数据
          // post方法返回一个  对象 then表示拿到成功的结果 catch表示拿到失败的结果
          // 成功 跳转到首页 失败 提示错误
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  },
  data () {
    // 定义校验函数 先声明在调用使用
    // 需要三个参数 rule(校验规则对象) value(当前字段值) callback(校验后回调函数)
    // callback() ==调用时表示成功    callback(new Error('显示失败的文字')) ==表示失败
    var checkAge = (rule, value, callback) => {
      // 写自己的校验逻辑，手机号格式 11位，第一个数字1开头，第二个数字3-9，第三个到最后一个任意数字都可以
      // 使用正则表达式   ^（开始） $(结尾)  test(测试)
      if (!/^1[3-9]\d{9}$/.test(value)) {
        // ! 非 表示不是这样的话证明格式不对  调用callback
        return callback(new Error('手机号格式错误'))
      }
      // 如果格式正确 直接调用callback就好
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '13051182325',
        code: '246810'
      },
      // 校验规则对象    rules写校验规则
      rules: {
        mobile: [ // trigger 触发的事机  blur 失去焦点时
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // 调用函数 checkAge   trigger: 'change'可不写
          { validator: checkAge, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位验证码', trigger: 'blur' }
        ]
      }
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.box-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
