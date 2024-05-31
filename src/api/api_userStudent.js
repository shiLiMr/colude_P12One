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
  }
}
