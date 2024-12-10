import { getHistoryList } from '@/services/customer/api';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useRef } from 'react';

/**
 * 浏览记录
 */

export default function History() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '账号',
      dataIndex: 'userName',
      search: {
        transform: (value) => ({ keyword: value }),
      },
    },
    {
      title: '视频名称',
      dataIndex: 'videoName',
      search: false,
    },
    {
      title: '视频描述',
      dataIndex: 'videoReduce',
      search: false,
    },
    {
      title: '浏览时间',
      dataIndex: 'createDate',
      search: false,
      render: (_, record) => {
        if (record.createDate) {
          return `${dayjs(record.createDate).format('YYYY-MM-DD HH:mm:ss')}`;
        }
        return '-';
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<any, API.PageParams>
        headerTitle={'列表'}
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        request={async (params: API.PageParams) => {
          params.pageNum = params.current;
          const data = await getHistoryList(params);
          return {
            data: data.data?.list,
            success: data.code === 200,
            total: data.data?.total,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
}
