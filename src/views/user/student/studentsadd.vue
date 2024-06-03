<template>
  <div class="layout-main-adddeit">
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user/student' }">学员管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="">新增 / 编辑学员</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="hr"></div>
      <div class="jibenmessage">基本信息</div>

      <!-- form 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属校区" prop="school_id">
          <el-select size="small" v-model="ruleForm.school_id" placeholder="请选择">
            <el-option v-for="(item, index) in SchoolData" :key="item.id" :label="item.org_name"
              :value="item.id"></el-option></el-select>
        </el-form-item>
        <el-form-item label="学员昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" maxlength="15" placeholder="请输入昵称，最多可添加15个字"></el-input>
          <span style="margin-left: 10px;">{{ ruleForm.name ? ruleForm.name.length : 0
            }}/15</span>
        </el-form-item>
        <el-form-item label="学员手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="学员头像" prop="name">
          <el-upload class="avatar-uploader" action="https://devwx.baijiayun.com/api/public/img" method="POST"
            :headers="headers" :on-success="handleAvatarSuccess" :show-file-list="false">
            <div class="updateImg">
              <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
              <div class="Imgcontent">
                <el-button size="small" icon="el-icon-plus">点击上传</el-button>
                <p class="note">300*300像素或1:1，支持jpg、jpeg、png,小于5M</p>
              </div>
            </div>

          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="">
          <el-select size="small" v-model="ruleForm.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
            <el-option label="保密" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所在城市" prop="">
          <div class="citychoose">
            <el-select v-model="ruleForm.province_id" placeholder="请选择" @change="changeProvice">
              <el-option v-for="item in provinceData" :key="item.id" :label="item.area_name"
                :value="item.id"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city_id" placeholder="请选择" @change="changeCity">
              <el-option v-for="item in cityData" :key="item.id" :label="item.area_name" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="ruleForm.district_id" placeholder="请选择">
              <el-option v-for="item in districtData" :key="item.id" :label="item.area_name"
                :value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="年份" prop="year_id">
          <el-select v-model="ruleForm.year_id" placeholder="请选择" @change="changeYear">
            <el-option v-for="item in YearData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="area_id">
          <el-select v-model="ruleForm.area_id" placeholder="请选择" @change="changeArea">
            <el-option v-for="item in addressData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="所属标签" prop="label_ids">
          <el-select multiple size="small" v-model="ruleForm.label_ids" placeholder="请选择" @change="asss">
            <el-option v-for="(item, index) in tagData" :key="item.id" :label="item.label_name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="$router.push({ path: '/user/student' })">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import API from '../../../api/api_userStudent.js'
export default {
  data () {
    var validateMobile = (rule, value, callback) => {//手机号验证
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (/^(?:(?:\+|00)86)?1\d{10}$/.test(value) === false) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
    };
    return {
      attrs: [],
      // imageUrl:'',//头像
      headers: { Authorization: 'Bearer ' + localStorage.getItem('adminToken') },
      ruleForm: {
        year_id: '',//年份
        area_id: '',//地区
        attr: [],
        avatar: "",//头像
        birthday: "",// 出生日期
        province_id: '', //省
        city_id: '',//市
        district_id: '',//区
        label_ids: "",// 所属标签
        mobile: "",//手机号码
        nickname: "",//学员昵称
        school_id: '',//所属学校
        sex: 3,//性别
        user_attr: "",
      },
      rules: {
        school_id: [{ required: true, message: '请选择所属校区', trigger: 'change' }],
        nickname: [{ required: true, message: '请选择所属校区', trigger: 'blur' },
        { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, required: true, trigger: 'blur' }
        ],
        area_id: [{ required: true, message: '请选择地区', trigger: 'change' }],
        year_id: [{ required: true, message: '请选择年份', trigger: 'change' }]
      },
      SchoolData: [],//所属学校数据
      tagData: [],//所属标签数据
      YearData: [],//年份数据
      addressData: [],//地址数据
      YearAreaData: [],// 年份 地址数据
      provinceData: [],//省数据
      cityData: [],//市数据
      districtData: [],//区数据
    };
  },

  created () {
    this.getData()
    if (this.$route.query.id) {
      console.log(this.$route.query.id);
      API.getUserStudentEditAPI(this.$route.query.id).then(res => {
        console.log(res);
        this.ruleForm = { ...res.data }
        this.ruleForm.city_id = res.data.city
        this.ruleForm.province_id = res.data.province
        this.ruleForm.district_id = res.data.district
        this.ruleForm.label_ids = res.data.user_label.map(item=>item.id)
        this.ruleForm.year_id = res.data.attr[0].attr_text
        this.ruleForm.area_id = res.data.attr[1].attr_text
      })
    }

  },
  watch () {

  },


  methods: {
    asss(e){
      console.log(e);
    },
    async getData () {
      //获取学员所属学校数据
      let res = await API.getLoginUserSchool()
      this.SchoolData = res.data.school
      // 获取所属标签数据
      let res3 = await API.getLabelApi()
      this.tagData = res3.data.list
      //获取年份数据信息
      let res4 = await API.getYearListAPI()
      this.YearData = res4.data[0].value
      this.addressData = res4.data[1].value
      this.YearAreaData = res4.data
      // 获取省数据信息
      // 省市级三级联动
      API.getProvinceListAPI().then(res => {
        // console.log(res); //
        this.provinceData = res.data

      })

    },
    // 通过省 id 请求市数据
    changeProvice (id) {
      // console.log(id);
      this.cityData = []
      this.districtData = []
      this.ruleForm.city_id = ''
      this.ruleForm.district_id = ''
      if (id) {
        API.getCityListAPI(id).then(res => {
          // console.log(res);
          this.cityData = res.data
        })
      }
    },
    // 通过市 id 请求区id
    changeCity (id) {
      // console.log(id);
      if (id) {
        API.getAreaListAPI(id).then(res => {
          // console.log(res);
          this.districtData = res.data
        })
      }
    },
    changeYear (id) { // 获取选中年份
      console.log(id);
      this.attrs.push({
        attr_id: this.YearAreaData[0].id,
        attr_val_id: id
      })
    },
    changeArea (id) { // 获取选中地区
      console.log(id);
      this.attrs.push({
        attr_id: this.YearAreaData[0].id,
        attr_val_id: id
      })
    },
    // 所属标签
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.ruleForm.label_ids = value.join(',')
    },
    // 所属学校
    handleCheckedSchoolChange (value) {
      let checkedCount = value.length;
      this.ruleForm.school_id = value.join(',')
    },
    // 所属标签
    handleCheckedYearChange (value) {
    },
    handleAvatarSuccess (response, file) {// 图片上传
      // console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.avatar = file.response.data.path
    },
    submitForm (formName) { //确定添加
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        // 删除对象某个属性
        if (this.$route.params.type == 'add') { //添加
          delete this.ruleForm.year_id
          delete this.ruleForm.area_id
          if ((typeof this.ruleForm.label_ids) != 'string') {
            this.ruleForm.label_ids = this.ruleForm.label_ids.join(',')
            console.log(this.ruleForm.label_ids);
          }
          this.ruleForm.birthday = new Date(this.ruleForm.birthday).toDateString()
          // console.log(this.attrs);
          this.ruleForm.user_attr = JSON.stringify(this.attrs)
          // console.log(this.ruleForm);
          let res = await API.addUserStudentAPI(this.ruleForm)
          if (res.code == 200) {
            this.$message.success('添加成功')
            this.$router.push('/user/student')
          } else {
            this.$message.error(res.msg)
          }
        }else{
          // console.log('编辑');
          // console.log(this.ruleForm);
          this.deitruleForm()
        }
      })
    },
    async deitruleForm () {
      let res =await API.editUserStudentAPI(this.$route.query.id,this.ruleForm)
      // console.log(res);
      if (res.code == 200) {
        this.$message.success('编辑成功')
        this.$router.push('/user/student')
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  mounted () {
    /*
      思路：通过document文档，选中日期时间选择器元素，然后创建一个i标签，  并指定其类名为el-icon-date，并将其插入到日期时间选择器元素中
            然后通过样式的控制调整其到时间选择器尾部的位置
     */
    let keyNode = document.querySelector(".el-date-editor");
    let iNode = document.createElement("i");
    iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
    keyNode.appendChild(iNode);
    iNode.style.position = "absolute";
    iNode.style.top = "13px";
    iNode.style.right = "32px";
  }

}


</script>

<style lang="scss" scoped>
.jibenmessage {
  border-left: 3px solid #b24901;
  margin: 15px 0;
  box-sizing: border-box;
  padding-left: 10px;
}


.updateImg {
  display: flex;
  align-items: center;

  >img {
    width: 95px;
    width: 95px;
    border: 1PX solid #cccccc;
    margin-right: 15px;
  }

  .Imgcontent {
    text-align: left;

    .note {
      font-size: 13px;
      color: #cccccc;
    }
  }
}
</style>
