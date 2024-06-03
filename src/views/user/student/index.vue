<template>
  <div class="layout-main">
    <el-scrollbar>
      <el-card>
        学员管理
        <div class="hr"></div>
        <!-- 查询 -->
        <div class="statusSearch">
          <el-row :gutter="20">
            <el-col :span="24" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="学员状态" prop="status">
                        <el-select size="small" v-model="formInline.status" placeholder="请选择">
                          <el-option label="禁用" value="0"></el-option>
                          <el-option label="启用" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="学员昵称" prop="nickname">
                        <el-input clearable size="small" v-model="formInline.nickname" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="学员手机号" prop="mobile">
                        <el-input clearable size="small" v-model="formInline.mobile" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="是否绑定微信" prop="is_bind_wx">
                        <el-select size="small" v-model="formInline.is_bind_wx" placeholder="请选择">
                          <el-option label="否" value="0"></el-option>
                          <el-option label="是" value="1"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="微信昵称" prop="wx_nickname">
                        <el-input clearable size="small" v-model="formInline.wx_nickname" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属企微员工" prop="wework_user_nickname">
                        <el-input clearable size="small" v-model="formInline.wework_user_nickname"
                          placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属客户微信群" prop="wework_room_name">
                        <el-input clearable size="small" v-model="formInline.wework_room_name"
                          placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="会员等级" prop="vip_id">
                        <el-select size="small" v-model="formInline.vip_id" placeholder="请选择">
                          <el-option v-for="(item, index) in vipData" :key="index" :label="item.name"
                            :value="item.id"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="创建时间" prop="create_timevalue">
                        <el-date-picker size="small" @change="changecreateTime" v-model="create_timevalue"
                          type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="学员所属校区" prop="school_id">
                        <el-select size="small" v-model="formInline.school_id" placeholder="请选择">
                          <el-option v-for="(item, index) in SchoolData" :key="index" :label="item.org_name"
                            :value="item.id"></el-option></el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属标签" prop="label_ids">
                        <el-select multiple size="small" v-model="formInline.label_ids" placeholder="请选择">
                          <el-option v-for="(item, index) in tagData" :key="index" :label="item.label_name"
                            :value="item.id"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item>
                        <el-button type="danger" @click="onSubmit">查询</el-button>
                        <el-button type="" @click="resetForm('formInline')">重置</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>

          </el-row>

        </div>
        <!-- 按钮 -->
        <div class="studentsBtn">
          <el-button type="danger" @click="gotoaddStudents">新增学员</el-button>
          <el-button type="danger">批量导入</el-button>
          <el-button type="danger">批量导出</el-button>
          <el-button type="danger">查看导出</el-button>
          <el-button type="text" style="color: #f56c6c;" icon="el-icon-s-tools">资料采集</el-button>
          <el-button type="text" style="color: #f56c6c;" icon="el-icon-refresh-right">企业微信数据同步</el-button>
          <el-checkbox v-model="OpenChecked">开启列表展示资料采集数据</el-checkbox>
        </div>
        <!-- table 列表表格 -->
        <el-table class="abcde" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
          v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中"
          element-loading-background="rgba(0, 0, 0, 0)" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="学员昵称" width="200">
            <template slot-scope="scope">
              <div class="studentsTable">
                <img :src="scope.row.avatar" alt="">
                <p>{{ scope.row.nickname }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="130" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="mobile" label="所属标签" width="160">
            <template slot-scope="scope">
              <div class="tagsStyle" v-if="scope.row.user_label.length == 1">
                <p v-for="(item, index) in scope.row.user_label" :key="item.id">{{ item.label_name }}</p>
              </div>
              <el-tooltip v-else-if="scope.row.user_label.length > 1" placement="right" effect="light">
                <div slot="content">{{ getTagsContent(scope.row.user_label) }}</div>
                <div class="tagsStyle">
                  <p v-for="(item, index) in scope.row.user_label" :key="item.id">{{ item.label_name }},</p>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="学员所属校区" show-overflow-tooltip width="160">
            <template slot-scope="scope">
              <p>{{ getSchool(scope.row.school_id) }}</p>
              <!-- <p >{{ scope.row.school_id}}</p> -->
            </template>
          </el-table-column>
          <el-table-column prop="vip_name" label="会员等级" show-overflow-tooltip width="170">
            <template slot-scope="scope">
              <p v-if="scope.row.vip_name == null">非会员</p>
              <p v-else>{{ scope.row.vip_name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="wx_nickname" label="微信昵称" show-overflow-tooltip width="160">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status == 1 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="200">
            <template slot-scope="scope">
              {{ new Date(scope.row.created_at * 1000).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="280" class="optionsBtns">
            <template slot-scope="scope">
              <el-button type="text" size="small">详情</el-button>
              <el-button type="text" size="small" @click="gotoEdit(scope.row.uid)">编辑</el-button>
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small" @click="deleteStudents(scope.row.uid)">删除</el-button>
              <el-button type="text" size="small">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="formInline.page" :page-sizes="[10, 20, 30, 50]" :page-size="formInline.limit"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import API from '../../../api/api_userStudent.js'
export default {
  data () {
    return {
      tagContext: '',//渲染所属标签表格数据
      loading: false,// loading 加载动画
      formInline: {
        page: 1,
        limit: 10,
        status: '',//学员状态
        nickname: '',// 学院昵称
        mobile: '',// 学院手机号
        is_bind_wx: '',// 是否绑定微信
        wx_nickname: '',//微信名称
        wework_user_nickname: '',// 所属企微员工
        wework_room_name: '',// 所属客户微信群
        vip_id: '',// 会员等级
        school_id: '',// 学员所属校区
        label_ids: '',// 所属标签
        start_time: '',// 开始时间
        end_time: '',// 结束时间
      },
      create_timevalue: [], //创建时间
      SchoolData: [],//所属学校数据
      vipData: [],//会员等级数据
      tagData: [],//所属标签数据
      OpenChecked: false,//是否开启列表展示资料采集数据
      tableData: [],//table 表格数据
      total: 0,// 总条数
    }
  },
  created () {
    this.getgetLoginUserSchool()//学员所属学校数据  会员等级数据
    this.getTabledata()//table 表格数据列表请求
  },
  computed: {

  },

  methods: {
    getTagsContent (val) { //渲染所属标签表格数据
      // console.log(val);
      let sum = ''
      if (val.length > 0) {
        val.forEach(item => {
          // if (item.id == val) {
          sum += item.label_name + ','
          // }
        })
      }
      this.tagContext = sum
      return sum
    },
    getSchool (val) { //渲染所属学校表格数据
      let sum = ''
      this.SchoolData.forEach(item => {
        if (item.id == val) {
          sum = item.org_name
        }
      })
      return sum
    },
    async getgetLoginUserSchool () {
      //获取学员所属学校数据
      let res = await API.getLoginUserSchool()
      this.SchoolData = res.data.school
      // 获取会员等级 数据
      let res2 = await API.getVipBasisApi()
      this.vipData = res2.data.list
      // 获取所属标签数据
      let res3 = await API.getLabelApi()
      this.tagData = res3.data.list
    },
    getTabledata () { // table 表格数据列表请求
      this.loading = true
      API.getUserStudentListAPI(this.formInline).then(res => {
        console.log(res);
        this.tableData = res.data.list
        this.total = res.data.total
        this.loading = false
      })

    },
    changecreateTime (time) { // 创建时间与结束时间
      console.log(time);
      this.formInline.start_time = time[0]
      this.formInline.end_time = time[1]
    },
    handleSelectionChange (e) { //table 表格全选触发事件
      console.log(e);
    },
    onSubmit () { // 查询按钮
      console.log('submit!');
      this.getTabledata()
    },
    resetForm (formName) { // 重置按钮
      // this.$refs[formName].resetFields();
      location.reload()
      this.getTabledata()
    },
    handleSizeChange (val) {
      console.log(typeof val);
      this.formInline.limit = val
      this.getTabledata()
    },
    handleCurrentChange (val) {
      // console.log(val);
      this.formInline.page = val
      this.getTabledata()
    },
    gotoaddStudents () { // 添加学员按钮 跳转至添加页面
      this.$router.push({
        name: 'userstudent-edit',
        params: {
          type: 'add'
        }
      })
    },
    gotoEdit (id) { // 跳转至 编辑页面
      // console.log(id);
      this.$router.push({
        name: 'userstudent-edit',
        query: {
          id: id,
        }
      })
    },
    dotoaddStudentsLabel () { // 添加学员标签按钮
      this.$router.push({
        path: '/user/student/addStudentsLabel'
      })
    },
    deleteStudents (id) {
      console.log(id);
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.deleteUserStudentAPI(id).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getTabledata()
        }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.tagsStyle {
  width: 50px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.studentsTable {
  display: flex;
  align-items: center;

  >img {
    width: 30%;
    height: 30%;
    border-radius: 100%;
    margin-right: 3px;
    text-align: center;
    vertical-align: middle;
  }
}

.statusSearch {
  .el-form-item {
    width: 110%;
  }

  .el-form-item__content {
    width: 200px !important;
  }
}
</style>
