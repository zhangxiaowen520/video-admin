import { getMemberList, updateMemberPrice } from '@/services/customer/api';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormDigit,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Flex, message } from 'antd';
import { useRef, useState } from 'react';

/**
 * 账号管理
 */

export default function Member() {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const [id, setId] = useState<number>();
  const [priceModalOpen, setPriceModalOpen] = useState<boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      title: '套餐',
      dataIndex: 'tags',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '100px',
      render: (_, record) => [
        <Flex key="option" wrap="wrap" gap="small">
          <Button
            type="primary"
            onClick={() => {
              setId(record.id);
              setPriceModalOpen(true);
            }}
          >
            修改价格
          </Button>
        </Flex>,
      ],
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
            data: data.data,
            success: data.code === 200,
            total: data.data.length,
          };
        }}
        columns={columns}
      />
      <ModalForm
        title={'修改价格'}
        formRef={formRef}
        width="380px"
        open={priceModalOpen}
        onOpenChange={setPriceModalOpen}
        onFinish={async (value: any) => {
          value.id = id;
          const data = await updateMemberPrice({ ...value });
          if (data.code === 200) {
            message.success('价格修改成功');
            setPriceModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(data.message);
          }
        }}
      >
        <ProFormDigit width="md" label="价格" name="price" rules={[{ required: true }]} />
      </ModalForm>
    </PageContainer>
  );
}
