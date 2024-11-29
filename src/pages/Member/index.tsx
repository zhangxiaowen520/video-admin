import { getMemberList } from '@/services/customer/api';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

/**
 * 账号管理
 */

export default function Member() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '套餐',
      dataIndex: 'username',
    },
    {
      title: '价格',
      dataIndex: 'nickName',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '320px',
    },
  ];

  return (
    <PageContainer>
      <ProTable<any, API.PageParams>
        headerTitle={'列表'}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={{
          defaultPageSize: 10,
        }}
        request={async () => {
          const data = await getMemberList();
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
