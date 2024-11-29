// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 视频管理 - 获取列表 */
export async function getVideoList(params: {
  keyword?: string;
  current?: number;
  pageSize?: number;
  pageNum?: number;
  status?: number;
}) {
  return request<API.ResponseResult>(`${API_URL}/video/list`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 账号管理 - 添加 */
export async function addVideo(params: API.AddVideoParams) {
  return request<API.ResponseResult>(`${API_URL}/video/add`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 账号管理 - 编辑 */
export async function editVideo(params: API.AddVideoParams) {
  return request<API.ResponseResult>(`${API_URL}/video/update`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/** 视频管理 - 删除 */
export async function deleteVideo(params: { id: number }) {
  return request<API.ResponseResult>(`${API_URL}/video/delete`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 视频管理 - 发布 */
export async function publishVideo(params: { id: number }) {
  return request<API.ResponseResult>(`${API_URL}/video/publish`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 视频管理 - 下架 */
export async function outVideo(params: { id: number }) {
  return request<API.ResponseResult>(`${API_URL}/video/out`, {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 视频管理 - 获取长链接 */
export async function getVideoLongLink(params: { id: number }) {
  return request<API.ResponseResult>(`${API_URL}/video/longLink`, {
    method: 'GET',
    data: {
      ...params,
    },
  });
}
