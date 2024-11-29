// @ts-ignore
/* eslint-disable */

declare namespace API {
  type StatusType = 0 | 1;

  type AddVideoParams = {
    /*短视频连接*/
    longUrl: string;
    /* 视频封面图片*/
    picture: string;
    /**视频简介*/
    reduce: string;
    /**长视频连接;*/
    shortUrl: string;
    /**视频标签 */
    tags: string;
    /**视频标题 */
    title: string;
  };

  type VideoItemType = {
    id: number;
    longUrl: string;
    picture: string;
    publishDate: string;
    reduce: string;
    shortUrl: string;
    status: StatusType;
    tags: string;
    title: string;
    totalWatch: string;
  };
}
