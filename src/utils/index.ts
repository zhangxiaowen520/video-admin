/**
 * 时间转换为yyyymmdd格式
 * @param time 时间
 * @param cFormat 类型
 * @returns 返回数据
 */
export function parseTime(time: string | number | Date, cFormat: string) {
  if (time === 0) {
    return '-';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) {
      // eslint-disable-next-line no-param-reassign
      time = parseInt(time as any) * 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * 转换时间戳
 * @param 时间（yyyy-mm-dd）
 * @returns 返回时间戳
 */
export const convertToTimestamp = (dateStr: any) => {
  if (dateStr) {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(5, 2) - 1;
    const day = dateStr.substr(8, 2);
    const date = new Date(year, month, day);
    const newTimestampMs = date.getTime();
    const timestampSec = newTimestampMs / 1000;
    return timestampSec;
  } else {
    return -1;
  }
};

/**
 * 提取值合并为数组
 * @array 数组
 * @value key值
 * @returns 返回时间戳
 */
export const getValueToArray = (array: any[], value: string) => {
  if (array.length > 0) {
    const newArray = [];
    for (let index = 0; index < array.length; index++) {
      newArray.push(array[index][value]);
    }
    return newArray;
  }
  return [];
};
