// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.LoginResult>>(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(`${API_URL}/admin/info`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${API_URL}/admin/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}
