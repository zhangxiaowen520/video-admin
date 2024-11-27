const TOKEN_NAME = 'video-admin-token';

/* 缓存本地token */
export function setToken(value: string) {
  localStorage.setItem(TOKEN_NAME, value);
}

/* 获取本地缓存Token */
export function getToken() {
  return localStorage.getItem(TOKEN_NAME) || 0;
}

/* 删除本地缓存token */
export function removeToken() {
  localStorage.removeItem(TOKEN_NAME);
}

/* 处理URL 查询字符串 */
export function jsonToQueryString(json: Record<string, string | number | boolean | any>) {
  const qString = Object.keys(json)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
    .join('&');
  return qString;
}

/* 缓存 */
export function setLocalStorage(name: string, value: string) {
  localStorage.setItem(name, value);
}

/* 获取缓存 */
export function getLocalStorage(name: string) {
  return localStorage.getItem(name) || '0';
}

/* 删除本地缓存 */
export function removeLocalStorage(name: string) {
  localStorage.removeItem(name);
}
