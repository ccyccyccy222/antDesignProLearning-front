// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  console.log(body)
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}


//获取菜单
export async function getFoodList(options) {
  return request('/api/food', {
    method: 'GET',
    ...(options || {}),
  });
}

//获取原材料菜单
export async function getMaterialList(options){
  return request('/api/materialList',{
    method:'GET',
    ...(options||{})
  })
}

//修改原材料菜单
export async function updateMaterialList(body,options){
  console.log(body)
  return request('/api/updateMaterialList',{
    //修改一般使用put
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

//请求外卖列表
export async function getTakeoutList(options) {
  return request('/api/takeoutList', {
    method: 'GET',
    ...(options || {}),
  });
}

//修改外卖菜单
export async function updateTakeoutList(body,options){
  console.log(body)
  return request('/api/updateTakeoutList',{
    //修改一般使用put
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

//请求人事列表
export async function getLaborList(options) {
  return request('/api/laborList', {
    method: 'GET',
    ...(options || {}),
  });
}

//修改人事列表
export async function updateLaborList(body,options){
  console.log(body)
  return request('/api/updateLaborList',{
    //修改一般使用put
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

//请求水电煤气费列表
export async function getUtilitiesList(options) {
  return request('/api/utilitiesList', {
    method: 'GET',
    ...(options || {}),
  });
}

//修改水电煤气费列表
export async function updateUtilitiesList(body,options){
  console.log(body)
  return request('/api/updateUtilitiesList',{
    //修改一般使用put
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

//添加新的水电煤气项列表
export async function addUtilities(body,options){
  console.log(body)
  return request('/api/addUtilities',{
    //修改一般使用put
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
