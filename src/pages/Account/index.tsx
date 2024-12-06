import {
  addAccount,
  deleteAccount,
  editAccount,
  editAccountPassword,
  enableAccount,
  getAccountList,
} from '@/services/account/api';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Flex, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

/**
 * 账号管理
 */

export default function Account() {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const addFormRef = useRef<ProFormInstance>();
  const editFormRef = useRef<ProFormInstance>();

  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();

  const confirmDelete = async (value: number) => {
    if (value) {
      const data = await deleteAccount({ id: value });
      if (data.code === 200) {
        message.success('删除成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(data.message);
      }
    }
  };

  const confirmStatus = async (id: number, status: 0 | 1) => {
    const data = await enableAccount({ id: id, status: status === 0 ? 1 : 0 });
    if (data.code === 200) {
      message.success('操作成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      message.error(data.message);
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '登录账号',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '已启用', status: 'Success' },
        0: { text: '已禁用', status: 'Error' },
      },
    },
    {
      title: '上次登录时间',
      dataIndex: 'loginTime',
      render: (_, record) => {
        if (record.loginTime) {
          return `${dayjs(record.loginTime).format('YYYY-MM-DD HH:mm:ss')}`;
        }
        return '-';
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '320px',
      render: (_, record) => [
        <Flex key="option" wrap="wrap" gap="small">
          <Popconfirm
            title={record.status === 1 ? '确认禁用？' : '确认启用？'}
            description={`是否${record.status === 1 ? '禁用' : '启用'}【${record.username}】?`}
            onConfirm={() => confirmStatus(record.id, record.status)}
            okText="确认"
            cancelText="取消"
          >
            <Button>{record.status === 1 ? '禁用' : '启用'}</Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setFormData(record);
              setEditModalOpen(true);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              setFormData(record);
              setPasswordModalOpen(true);
            }}
          >
            重置密码
          </Button>
          <Popconfirm
            title="确认删除？"
            description={`是否删除【${record.username}】?`}
            onConfirm={() => confirmDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Flex>,
      ],
    },
  ];

  useEffect(() => {
    if (formData && passwordModalOpen) {
      formRef?.current?.setFieldsValue({
        ...formData,
      });
    }
  }, [formData]);

  useEffect(() => {
    if (formData && editModalOpen) {
      editFormRef?.current?.setFieldsValue({
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
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setAddModalOpen(true)}>
            添加
          </Button>,
        ]}
        request={async (params: API.PageParams) => {
          params.pageNum = params.current;
          const data = await getAccountList(params);
          console.log(data);
          return {
            data: data.data?.list,
            success: data.code === 200,
            total: data.data?.total,
          };
        }}
        columns={columns}
      />

      <ModalForm
        title={'添加'}
        width="380px"
        formRef={addFormRef}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (value: any) => {
          const data = await addAccount({ ...value });
          if (data.code === 200) {
            message.success('添加成功');
            addFormRef.current?.resetFields();
            setAddModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          width="md"
          label="登录账号"
          name="username"
          rules={[{ required: true }]}
          placeholder={'请输入字母+数字的组合'}
        />
        <ProFormText width="md" label="昵称" name="nickName" rules={[{ required: true }]} />
        <ProFormText width="md" label="密码" name="password" rules={[{ required: true }]} />
      </ModalForm>
      <ModalForm
        title={'编辑'}
        formRef={editFormRef}
        width="380px"
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onFinish={async (value: any) => {
          value.id = formData.id;
          const data = await editAccount({ ...value });
          if (data.code === 200) {
            message.success('编辑成功');
            setEditModalOpen(false);
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
        <ProFormText width="md" label="昵称" name="nickName" rules={[{ required: true }]} />
        <ProFormText width="md" label="备注" name="note" rules={[{ required: true }]} />
      </ModalForm>
      <ModalForm
        title={'重置密码'}
        formRef={formRef}
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
