import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  // const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        1
      </Card>
    </PageContainer>
  );
};

export default Welcome;
