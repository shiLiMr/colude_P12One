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
                    <div class="grid-content bg-purple"><el-form-item label="学员状态">
                        <el-select size="small" v-model="formInline.region" placeholder="请选择">
                          <el-option label="禁用" value="1"></el-option>
                          <el-option label="启用" value="1"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="学员昵称">
                        <el-input size="small" v-model="formInline.nickname" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="学员手机号">
                        <el-input size="small" v-model="formInline.mobile" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="是否绑定微信">
                        <el-select size="small" v-model="formInline.is_bind_wx" placeholder="请选择">
                          <el-option label="否" value="0"></el-option>
                          <el-option label="是" value="1"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="微信昵称">
                        <el-input size="small" v-model="formInline.wx_nickname" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属企微员工">
                        <el-input size="small" v-model="formInline.wework_user_nickname" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属客户微信群">
                        <el-input size="small" v-model="formInline.wework_room_name" placeholder="请输入"></el-input>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"><el-form-item label="会员等级">
                        <el-select size="small" v-model="formInline.vip_id" placeholder="请选择">
                          <el-option v-for="(item, index) in vipData" :key="index" :label="item.name"
                            :value="item.id"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="创建时间">
                        <el-date-picker size="small" @change="changecreateTime" v-model="create_timevalue" type="daterange"
                          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="学员所属校区">
                        <el-select size="small" v-model="formInline.school_id" placeholder="请选择">
                          <el-option v-for="(item, index) in SchoolData" :key="index" :label="item.org_name"
                            :value="item.id"></el-option></el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> <el-form-item label="所属标签">
                        <el-select size="small" v-model="formInline.label_ids" placeholder="请选择">
                          <el-option v-for="(item, index) in tagData" :key="index" :label="item.label_name"
                            :value="item.id"></el-option>
                        </el-select>
                      </el-form-item></div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item>
                        <el-button type="primary">查询</el-button>
                        <el-button type="">重置</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>

          </el-row>

        </div>

      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import API from '../../../api/api_userStudent.js'
export default {
  data () {
    return {
      formInline: {
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
    }
  },
  created () {
    this.getgetLoginUserSchool()//学员所属学校数据  会员等级数据
  },
  methods: {
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
    changecreateTime (time) { // 创建时间与结束时间
      console.log(time);
      // this.formInline.start_time = time[0]
      // this.formInline.end_time = time[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.statusSearch {
  .el-form-item {
    width: 110%;
  }

  .el-form-item__content {
    width: 200px !important;
  }
}



.hr {
  height: 2px;
  background-color: #ccc;
  margin: 20px -200px;
}
</style>
