import { ERROR_IMAGE } from '@/constants';
import { getCustomerList } from '@/services/customer/api';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Image, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';

/**
 * 账号管理
 */

export default function Account() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '头像',
      dataIndex: 'icon',
      render: (_, record) => {
        return <Image width={30} height={30} src={record.icon} fallback={ERROR_IMAGE} />;
      },
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '会员状态',
      dataIndex: 'memberId',
      render: (_, record) => {
        if (record.memberId) {
          return <Tag color="orange">VIP</Tag>;
        }
        return '当前未开通';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        if (record.createTime) {
          return `${dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}`;
        }
        return '-';
      },
    },
    {
      title: '最后登录时间',
      dataIndex: 'loginTime',
      render: (_, record) => {
        if (record.loginTime) {
          return `${dayjs(record.loginTime).format('YYYY-MM-DD HH:mm:ss')}`;
        }
        return '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '已禁用', status: 'Error' },
        1: { text: '已启用', status: 'Success' },
      },
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
        request={async (params: API.PageParams) => {
          params.pageNum = params.current;
          const data = await getCustomerList(params);
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
