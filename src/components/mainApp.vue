<template>
  <div class="content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="主题" min-width="140" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送者" min-width="180" show-overflow-tooltip header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.messageFromUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接收时间" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.receivedTime | local}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="con.subject" :visible.sync="show" width="60%">
      <div class="text-left" v-html="content"></div>
      <div class="time_class">
        <span style="font-weight:600">接收时间:&nbsp;</span>
        <span>{{con.receivedTime |local}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="show = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getEmailList } from '@/api'
import xss from 'xss'
export default {
  name: 'MainApp',
  props: {
    name: String
  },
  data() {
    return {
      tableData: [],
      content: '',
      con: '',
      show: false
    }
  },
  created() {
    this.$ws.sub({
      NEW_EMAIL: this.newEmail,
      LIST_MAIL: this.listMail
    })
    setTimeout(() => {
      this.$ws.dispatchEvent('LIST_MAIL')
    })
  },
  methods: {
    listMail(data) {
      this.tableData = data
    },
    newEmail(data) {
      this.tableData.unshift(data)
    },
    handleView(con) {
      this.content = xss(con.content)
      this.con = con
      this.show = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-left {
  text-align: left;
}
.time_class {
  text-align: left;
  padding-top: 20px;
  border-top: 1px solid #eee;
  margin-top: 20px;
}
</style>
