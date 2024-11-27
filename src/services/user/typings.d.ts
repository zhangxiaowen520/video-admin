// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginParams = {
    username: string;
    password: string;
  };
  type LoginResult = {
    token: string;
    tokenHead: string;
  };
  type ResponseResult<T = any> = {
    code: number;
    message: string;
    data: T;
  };
  type CurrentUser = {
    icon: string;
    username: string;
    menus: any[];
    roles: string[];
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
    pageNum?: number;
  };
}
