<template>
    <Row>
      <Col :md="12" :xs="24">
        <Row>
          <Col :md={span:10,offset:7} :xs={span:16,offset:4}  class="login">
            <img class="logo" src="../assets/logo.png" />
            <div class="login-content">
              <h1>律师事务所在线管理系统 - 注册账号</h1>
              <Form ref="login" :model="login" :label-width="80" :rules="ruleInline" @submit.prevent="submit">
                <FormItem prop="org" label="组织机构">
                  <Select name="org" v-model="login.org" style="width:300px" placeholder="请选择组织机构">
                    <Option v-for="item in orglist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem prop="username" label="账号">
                  <Input type="text" name="username"  v-model="login.username"  style="width:300px;" placeholder="用户名、手机号、邮箱">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password" label="密码">
                  <Input type="password" name="password" v-model="login.password" style="width:300px;" placeholder="用户名、手机号、邮箱">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="rememberme" label="记住我">
                  <CheckboxGroup>
                    <Checkbox name="rememberme" v-model="login.rememberme" label="七日内不在登陆"></Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click='handleSubmit("login")' >登陆</Button>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
        <div id="main" class="app-main">
          <router-view></router-view>
        </div>
      </Col>
      <Col :md="12" :xs=24 class="banner">
        <Carousel :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :loop="setting.loop" :height="setting.height">
          <CarouselItem>
              <div class="demo-carousel"><img src="../assets/images/login_bg1.jpg" alt=""></div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel"><img src="../assets/images/login_bg2.jpg" alt=""></div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel"><img src="../assets/images/login_bg3.jpg" alt=""></div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel"><img src="../assets/images/login_bg4.jpg" alt=""></div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel"><img src="../assets/images/login_bg5.jpg" alt=""></div>
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>
</template>

<script>
export default {
  data () {
    return {
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover',
        loop: true,
        height: 'auto'
      },
      orglist: [
        {
          value: '0',
          label: '北京京师'
        },
        {
          value: '1',
          label: '天津京师'
        },
        {
          value: '2',
          label: '唐山京师'
        }
      ],
      login: {
        userNameOrEmailAddress: '',
        password: '',
        rememberClient: ''
      },
      ruleInline: {
        org: [
          {required: true, message: '请选择组织机构', trigger: 'change'}
        ],
        userNameOrEmailAddress: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (event) {
      let that = this
      this.$refs.login.validate((valid) => {
        if (valid) {
          if (this.login.rememberClient === '') {
            this.login.rememberClient = false
          }
          let formData = JSON.stringify(this.login)
          let data = JSON.parse(formData)
          this.axios.post('/TokenAuth/Authenticate', data, {headers: {'Abp.TenantId': 1}})
          .then((response) => {
            if (response.status === 200) {
              that.$cookies.set('token', response.data.result.accessToken)
              that.$router.push('/index')
            } else {
              // 由后端抛出的错误
            }
          })
          .catch(function (error) {
            console.log(error.message)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  .logo{
    position: relative;
    top:80px;
  }
  .login-content{
    margin-top:140px;
  }
  Form{
    margin-top:80px;
  }
}
</style>
