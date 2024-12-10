import VideoViewer from '@/components/VideoViewer';
import { ERROR_IMAGE } from '@/constants';
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
  ProFormTextArea,
  ProFormUploadButton,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Flex, Image, Popconfirm, message } from 'antd';
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

  const confirmStatus = async (id: number, status: API.StatusType) => {
    if (status === 0) {
      const data = await publishVideo({ id: id });
      if (data.code === 200) {
        message.success('操作成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(data.message);
      }
    } else {
      const data = await outVideo({ id: id });
      if (data.code === 200) {
        message.success('操作成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(data.message);
      }
    }
  };

  const columns: ProColumns<API.VideoItemType>[] = [
    {
      title: '视频标题',
      dataIndex: 'title',
      search: {
        transform: (value) => ({ keyword: value }),
      },
    },
    {
      title: '视频描述',
      dataIndex: 'reduce',
      search: false,
    },
    {
      title: '视频封面',
      dataIndex: 'picture',
      search: false,
      render: (_, record) => {
        return <Image width={100} height={50} src={record.picture} fallback={ERROR_IMAGE} />;
      },
    },
    {
      title: '视频标签',
      dataIndex: 'tags',
      search: false,
    },
    {
      title: '30s视频链接',
      dataIndex: 'longUrl',
      search: false,
      render: (_, record) => {
        if (record.longUrl) {
          return <VideoViewer width={100} height={50} videoSrc={record.longUrl} />;
        } else {
          return '-';
        }
      },
    },
    {
      title: 'VIP视频链接',
      dataIndex: 'shortUrl',
      search: false,
      render: (_, record) => {
        if (record.shortUrl) {
          return <VideoViewer width={100} height={50} videoSrc={record.shortUrl} />;
        } else {
          return '-';
        }
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '100px',
      valueEnum: {
        0: { text: '已下架', status: 'Error' },
        1: { text: '已发布', status: 'Success' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '230px',
      search: false,
      render: (_, record) => [
        <Flex key="option" wrap="wrap" gap="small">
          <Popconfirm
            title={record.status === 0 ? '确认发布？' : '确认下架？'}
            description={`是否${record.status === 0 ? '发布' : '下架'}【${record.title}】?`}
            onConfirm={() => confirmStatus(record.id, record.status)}
            okText="确认"
            cancelText="取消"
          >
            <Button>{record.status === 0 ? '发布' : '下架'}</Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setFormData(record);
              setEditModalOpen(true);
            }}
          >
            编辑
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
        width="500px"
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
        <ProFormText width="lg" label="视频标题" name="title" rules={[{ required: true }]} />
        <ProFormTextArea width="lg" label="视频描述" name="reduce" rules={[{ required: true }]} />
        <ProFormText width="lg" label="视频封面" name="picture" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.png、.jpg、.jpeg"
          label="选择图片"
          name="pictureFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  addFormRef.current?.setFieldsValue({
                    picture: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              addFormRef.current?.setFieldsValue({
                picture: '',
              });
            },
          }}
        />
        <ProFormText
          width="lg"
          label="视频标签,多个用英文逗号隔开"
          name="tags"
          rules={[{ required: true }]}
        />
        <ProFormText width="lg" label="30s视频链接" name="longUrl" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.mp4"
          label="选择视频"
          name="longFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  addFormRef.current?.setFieldsValue({
                    longUrl: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              addFormRef.current?.setFieldsValue({
                longUrl: '',
              });
            },
          }}
        />
        <ProFormText width="lg" label="VIP视频链接" name="shortUrl" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.mp4"
          label="选择视频"
          name="shortFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  addFormRef.current?.setFieldsValue({
                    shortUrl: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              addFormRef.current?.setFieldsValue({
                shortUrl: '',
              });
            },
          }}
        />
      </ModalForm>
      <ModalForm
        title={'编辑'}
        formRef={editFormRef}
        width="500px"
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onFinish={async (value: any) => {
          value.id = formData.id;
          delete value.pictureFile;
          delete value.longFile;
          delete value.shortFile;
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
        <ProFormText width="lg" label="视频标题" name="title" rules={[{ required: true }]} />
        <ProFormTextArea width="lg" label="视频描述" name="reduce" rules={[{ required: true }]} />
        <ProFormText width="lg" label="视频封面" name="picture" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.png、.jpg、.jpeg"
          label="选择图片"
          name="pictureFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  editFormRef.current?.setFieldsValue({
                    picture: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              editFormRef.current?.setFieldsValue({
                picture: '',
              });
            },
          }}
        />
        <ProFormText
          width="lg"
          label="视频标签,多个用英文逗号隔开"
          name="tags"
          rules={[{ required: true }]}
        />
        <ProFormText width="lg" label="30s视频链接" name="longUrl" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.mp4"
          label="选择视频"
          name="longFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  editFormRef.current?.setFieldsValue({
                    longUrl: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              editFormRef.current?.setFieldsValue({
                longUrl: '',
              });
            },
          }}
        />
        <ProFormText width="lg" label="VIP视频链接" name="shortUrl" rules={[{ required: true }]} />
        <ProFormUploadButton
          extra="支持扩展名：.mp4"
          label="选择视频"
          name="shortFile"
          title="上传文件"
          action={`${API_URL}/aliyun/oss/upload`}
          max={1}
          fieldProps={{
            onChange: (e) => {
              try {
                if (e.file.status === 'done' && e.file.response) {
                  editFormRef.current?.setFieldsValue({
                    shortUrl: e.file.response.data,
                  });
                }
              } catch (error) {
                message.error('上传失败,请重新上传');
              }
            },
            onRemove: () => {
              editFormRef.current?.setFieldsValue({
                shortUrl: '',
              });
            },
          }}
        />
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
