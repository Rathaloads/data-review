<template>
  <div class="wrapper">
    <div class="login-wrap">
      <div class="login">
        <div class="title">登录</div>
        <Form
          ref="form"
          :model="form"
          :label-width="60">
          <FormItem label="用户名:">
            <Input
              v-model="form.account"
              size="small"
              style="width: 300px;"
              type="text"
              placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="密码:">
            <Input
              v-model="form.password"
              size="small"
              style="width: 300px;"
              type="password"
              placeholder="请输入用户名" />
          </FormItem>

          <FormItem>
            <Button
              size="small"
              type="primary"
              @click.native="onSubmit">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { APPS } from '@/routers/route-names'
import { mapGetters } from 'vuex'
import { find } from 'lodash'

export default {
  name: 'Login',

  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      users: 'appData/getUsers'
    })
  },

  methods: {
    onSubmit () {
      const { account, password } = this.form
      if (account === '' || password === '') return this.$Message.error('请输入账号密码')
      let finder = find(this.users, { account })
      if (!finder) return this.$Message.error('账号不存在')
      this.jumpApp()
    },

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
