<template>
  <div class="content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="主题" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送者" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fromUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.row.htmlContent)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="内容" :visible.sync="content" width="60%">
      <div v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="content = ''">取 消</el-button>
        <el-button type="primary" @click="content = ''">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEmailList } from '@/api'
import xss from 'xss'
export default {
  name: 'MainApp',
  props: {
    name: String
  },
  data() {
    return {
      tableData: [],
      content: ''
    }
  },
  watch: {
    name: {
      handler(ne) {
        if (ne) {
          this.reverTime(ne)
        }
      }
    }
  },
  methods: {
    getListByEmail(name) {
      getEmailList(name).then(res => {
        this.tableData = res.data
      })
    },
    reverTime(name) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.getListByEmail(name)
      this.timer = setInterval(() => {
        this.getListByEmail(name)
      }, 10000)
    },
    handleView(con) {
      this.content = xss(con)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
