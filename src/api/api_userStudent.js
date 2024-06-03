// 学员管理接口
import * as API from './'

export default {
  // 获取学员所属小区数据  /api/getLoginUser?
  getLoginUserSchool: () => {
    return API.GET('/api/getLoginUser')
  },
  // 获取会员等级数据 /api/vip/basis?limit=999999&
  getVipBasisApi: () => {
    return API.GET('/api/vip/basis?limit=999999')
  },
  //获取所属标签数据 /api/label?limit=999999&
  getLabelApi: () => {
    return API.GET('/api/label?limit=999999')
  },
  // 获取table 学员列表数据 /api/user?
  //   1&limit=10&status=&nickname=&mobile=&start_time=&end_time
  //=&school_id=&vip_id=&wework_user_nickname=&wework_room_name=&wx_nickname=&is_bind_wx=&label_ids=&
  getUserStudentListAPI: (params) => {
  return API.GET(`/api/user`, params)
  },
  //获取 年份数据 /api/module/attribute/1?
  getYearListAPI: () => {
    return API.GET(`/api/module/attribute/1`)
  },
  // 获取省数据信息  /api/sonArea/0?
  getProvinceListAPI: () => {
    return API.GET(`/api/sonArea/0`)
  },
  // 获取市数据信息  /api/sonArea/110000?
  getCityListAPI: (id) => {
    return API.GET(`/api/sonArea/${id}`)
  },
  // 获取区数据信息 /api/sonArea/110100?
  getAreaListAPI: (id) => {
    return API.GET(`/api/sonArea/${id}`)
  },
  // 添加 学员 /api/user
  addUserStudentAPI: (params) => {
    return API.POST(`/api/user`, params)
  },
  // 请求编辑回填数据  /api/user/482?
  getUserStudentEditAPI: (id) => {
    return API.GET(`/api/user/${id}`)
  },
  // 修改 学员 /api/user/482
  editUserStudentAPI: (id, params) => {
    return API.PUT(`/api/user/${id}`, params)
  },
  // 删除 学员 /api/user/482
  deleteUserStudentAPI: (id) => {
    return API.DELETE(`/api/user/${id}`)
  }
}
