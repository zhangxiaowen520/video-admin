import {
  addVideo,
  deleteVideo,
  editVideo,
  getVideoList,
  outVideo,
  publishVideo,
} from '@/services/video/api';
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
 * 视频管理
 */

export default function Video() {
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
      const data = await deleteVideo({ id: value });
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

  const confirmStatus = async (id: number, status: 1 | 2) => {
    const data = await publishVideo({ id: id, status: status === 1 ? 2 : 1 });
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
      title: '视频标题',
      dataIndex: 'title',
    },
    {
      title: '视频封面',
      dataIndex: 'cover',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '已启用', status: 'Success' },
        2: { text: '已禁用', status: 'Error' },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        if (record.createTime) {
          return `${dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}`;
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
            description={`是否${record.status === 1 ? '禁用' : '启用'}【${record.title}】?`}
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
            修改密码
          </Button>
          <Popconfirm
            title="确认删除？"
            description={`是否删除【${record.title}】?`}
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
        title: formData.title,
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
        request={async (params: any) => {
          params.pageNum = params.current;
          params.status = 1;
          params.keyword = '';
          const data = await getVideoList(params);
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
          const data = await addVideo({ ...value });
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
        <ProFormText width="md" label="视频标题" name="title" rules={[{ required: true }]} />
        <ProFormText width="md" label="视频封面" name="cover" rules={[{ required: true }]} />
        <ProFormText width="md" label="视频地址" name="url" rules={[{ required: true }]} />
        <ProFormText width="md" label="备注" name="note" rules={[{ required: true }]} />
      </ModalForm>
      <ModalForm
        title={'编辑'}
        formRef={editFormRef}
        width="380px"
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onFinish={async (value: any) => {
          value.id = formData.id;
          const data = await editVideo({ ...value });
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
          label="视频标题"
          name="title"
          rules={[{ required: true }]}
        />
        <ProFormText width="md" label="视频封面" name="cover" rules={[{ required: true }]} />
        <ProFormText width="md" label="视频地址" name="url" rules={[{ required: true }]} />
        <ProFormText width="md" label="备注" name="note" rules={[{ required: true }]} />
      </ModalForm>
      <ModalForm
        title={'修改密码'}
        formRef={formRef}
        width="380px"
        open={passwordModalOpen}
        onOpenChange={setPasswordModalOpen}
        onFinish={async (value: any) => {
          const data = await outVideo({ ...value });
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
        <ProFormText width="md" label="旧密码" name="oldPassword" rules={[{ required: true }]} />
        <ProFormText width="md" label="新密码" name="newPassword" rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  );
}
