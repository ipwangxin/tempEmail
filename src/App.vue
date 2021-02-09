<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="content mail_header">
          <img alt="mail" height="60px" src="./assets/logo.svg" />
          <div>
            <el-input align="right" disabled v-model="name">
              <el-tooltip class="item" slot="prepend" effect="dark" content="复制邮箱" placement="top-start">
                <el-button icon="el-icon-copy-document" @click="goCopy"></el-button>
              </el-tooltip>
              <template slot="append">{{domain}}</template>
            </el-input>
            <el-button class="mgl-5" @click="newEmail" type="primary">新邮箱</el-button>
            <el-button @click="open">自定义</el-button>
          </div>
          <div class="refresh">
            <!-- <div class="reverse">{{timer.rest}}s</div> -->
            <el-tooltip class="item" slot="prepend" effect="dark" content="刷新列表" placement="top-start">
              <el-button icon="el-icon-refresh" @click="$ws.dispatchEvent('LIST_MAIL')"></el-button>
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <el-main>
        <mainApp :name="name" ref="main"></mainApp>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mainApp from './components/mainApp.vue'
import handleClipboard from '@/utils/clipboard'
// import { createEmail, registerEmail } from '@/api'
const TEMPKEY = 'tempName'
export default {
  name: 'App',
  components: {
    mainApp
  },
  data() {
    return {
      name: '',
      domain: '',
      timer: {
        rest: 0,
        timer: null
      }
    }
  },
  mounted() {
    const name = sessionStorage.getItem(TEMPKEY)
    this.$ws.sub({
      GEN_USER: this.dealGen,
      REFRESH: this.dealGen,
      DOMAIN_NAME: this.dealDomain
    })
    if (name) {
      this.$ws.dispatchEvent('REGISTER', { userName: name })
      this.name = name
    } else {
      this.$ws.dispatchEvent('GEN_USER')
    }
  },
  methods: {
    goCopy(e) {
      handleClipboard(this.name + this.domain, e)
    },
    dealDomain(data) {
      this.domain = `@${data}`
    },
    newEmail() {
      this.$ws.dispatchEvent('REFRESH')
    },
    dealGen(data) {
      sessionStorage.setItem(TEMPKEY, data)
      this.name = data
    },
    open() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '输入邮箱前半部分',
        inputPattern: /[a-zA-Z0-9_]{1,20}/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        this.$ws.dispatchEvent('REGISTER', { userName: value })
        this.name = value
        sessionStorage.setItem(TEMPKEY, value)
        this.$ws.dispatchEvent('LIST_MAIL')
      }).catch(e => {
        console.log(e)
      })
    }
  }

}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  // line-height: 60px;
}
header.el-header {
  background: #1183fb linear-gradient(-90deg, #0a48d1 0, #1183fb 100%);
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 60px);
  // line-height: 160px;
}
::v-deep div.el-input-group {
  width: auto;
}
::v-deep input {
  text-align: right;
}
.mail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.refresh {
  display: flex;
  align-items: center;

  .reverse {
    background: #fff;
    padding: 6px;
    margin-right: 10px;
    border-radius: 30px;
  }
  ::v-deep .el-button {
    padding: 10px;
    line-height: auto;
    .el-icon-refresh {
      font-size: 20px;
    }
  }
}
</style>
