<template>
  <div class="wrapper">
    <div class="login-wrap">
      <div class="login">
        <div class="title">登录</div>
        <Form :label-width="60">
          <FormItem label="用户名:">
            <Input
              size="small"
              style="width: 300px;"
              type="text"
              placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="密码:">
            <Input
              size="small"
              style="width: 300px;"
              type="password"
              placeholder="请输入用户名" />
          </FormItem>

          <FormItem>
            <Button
              size="small"
              type="primary"
              @click.native="jumpApp">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { APPS } from '@/routers/route-names'

export default {
  name: 'Login',

  methods: {
    jumpApp () {
      this.$store.dispatch('menu/setActiveMenu', 'APPS_DATA_INPUT')
      this.$router.push({ name: APPS })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width 100%
  height 100%
  position relative

  .login-wrap {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -60%)
    background-color #F2F1F1
    border-radius 10px

    .login {
      box-sizing border-box
      padding 30px 20px 20px 0px

      .title {
        width 100%
        padding 0 10px 10px 10px
        color #333
        font-size 18px
        font-weight bold
        text-align center
      }
    }
  }
}
</style>
