import { ERROR_IMAGE } from '@/constants';
import { editAccountPassword } from '@/services/account/api';
import { getCustomerList } from '@/services/customer/api';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Flex, Image, message, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

/**
 * 账号管理
 */

export default function Account() {
  const actionRef = useRef<ActionType>();
  const passwordFormRef = useRef<ProFormInstance>();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [formData, setFormData] = useState<any>();

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
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    // },
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
      width: '100px',
      render: (_, record) => [
        <Flex key="option" wrap="wrap" gap="small">
          <Button
            onClick={() => {
              setFormData(record);
              setPasswordModalOpen(true);
            }}
          >
            修改密码
          </Button>
        </Flex>,
      ],
    },
  ];

  useEffect(() => {
    if (formData && passwordModalOpen) {
      passwordFormRef?.current?.setFieldsValue({
        ...formData,
      });
    }
  }, [formData]);

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
      <ModalForm
        title={'重置密码'}
        formRef={passwordFormRef}
        width="380px"
        open={passwordModalOpen}
        onOpenChange={setPasswordModalOpen}
        onFinish={async (value: any) => {
          const data = await editAccountPassword({ ...value });
          if (data.code === 200) {
            message.success('密码修改成功');
            setPasswordModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(data.message);
          }
        }}
      >
        <ProFormText
          width="md"
          disabled
          label="登录账号"
          name="username"
          rules={[{ required: true }]}
        />
        <ProFormText width="md" label="新密码" name="newPassword" rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  );
}
