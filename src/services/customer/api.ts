// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 客户管理 - 获取列表 */
export async function getCustomerList(params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
  pageNum?: number;
}) {
  return request<API.ResponseResult>(`${API_URL}/admin/normalList`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 浏览记录 */
export async function getHistoryList(params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
  pageNum?: number;
}) {
  return request<API.ResponseResult>(`${API_URL}/history/list`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 订单记录 */
export async function getOrderList(params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
  pageNum?: number;
}) {
  return request<API.ResponseResult>(`${API_URL}/order/list`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 会员配置 - 获取列表 */
export async function getMemberList() {
  return request<API.ResponseResult>(`${API_URL}/member/list`, {
    method: 'GET',
  });
}

/** 会员配置 - 修改会员价格 */
export async function updateMemberPrice(params: { id: number; price: number }) {
  return request<API.ResponseResult>(`${API_URL}/member/updatePrice`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
