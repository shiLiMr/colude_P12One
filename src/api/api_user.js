/**
 * Created by yqr on 2018/4/13.
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/api/adminUser/login', params)
  },
  //登出
  logout: params => {
    return "success";
    //return API.GET('/api/users/logout', params)
  }
}
