// @ts-ignore
/* eslint-disable */
import { jsonToQueryString } from '@/utils/request';
import { request } from '@umijs/max';

/** 账号管理 - 获取列表 */
export async function getAccountList(params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
  pageNum?: number;
}) {
  return request<API.ResponseResult>(`${API_URL}/admin/list`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 账号管理 - 添加 */
export async function addAccount(params: any) {
  return request<API.ResponseResult>(`${API_URL}/admin/register`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 账号管理 - 编辑 */
export async function editAccount(params: any) {
  return request<API.ResponseResult>(`${API_URL}/admin/update/${params.id}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 账号管理 - 修改密码 */
export async function editAccountPassword(params: any) {
  return request<API.ResponseResult>(`${API_URL}/admin/updatePassword`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 账号管理 - 删除 */
export async function deleteAccount(params: { id: number }) {
  return request<API.ResponseResult>(`${API_URL}/admin/delete/${params.id}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 账号管理 - 启用 or 禁用 */
export async function enableAccount(params: { id: number; status: 1 | 2 }) {
  return request<API.ResponseResult>(`${API_URL}/admin/updateStatus/${params.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: jsonToQueryString(params),
  });
}
