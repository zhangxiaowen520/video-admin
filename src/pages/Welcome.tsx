import SalesCard from '@/components/SalesCard';
import { getCountInfo } from '@/services/video/api';
import { PageContainer, StatisticCard } from '@ant-design/pro-components';
import { message } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import React, { useEffect, useState } from 'react';

const { Statistic, Divider } = StatisticCard;

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

type CountInfo = {
  historyCount: number;
  memberUserNums: number;
  orderCount: number;
  preTotalPrice: number;
  totalPrice: number;
  totalUserNums: number;
  userNums: number;
};

const Welcome: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [countInfo, setCountInfo] = useState<CountInfo>({
    historyCount: 0,
    memberUserNums: 0,
    orderCount: 0,
    preTotalPrice: 0,
    totalPrice: 0,
    totalUserNums: 0,
    userNums: 0,
  });

  // const { initialState } = useModel('@@initialState');

  const getCountInfoClick = async () => {
    try {
      const res = await getCountInfo();
      if (res.code === 200) {
        setCountInfo(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('获取统计信息失败');
    }
  };

  useEffect(() => {
    getCountInfoClick();
  }, []);

  return (
    <PageContainer>
      <div style={{ marginBottom: 24 }}>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
            <StatisticCard
              statistic={{
                title: '收入总额',
                value: countInfo.totalPrice,
                icon: (
                  <img
                    style={imgStyle}
                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                    alt="icon"
                  />
                ),
              }}
            />
            <StatisticCard
              statistic={{
                title: '昨日收入',
                value: countInfo.preTotalPrice,
                icon: (
                  <img
                    style={imgStyle}
                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                    alt="icon"
                  />
                ),
              }}
            />
            <StatisticCard
              statistic={{
                title: '总订单数',
                value: countInfo.orderCount,
                icon: (
                  <img
                    style={imgStyle}
                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                    alt="icon"
                  />
                ),
              }}
            />
            <StatisticCard
              statistic={{
                title: '总浏览量',
                value: countInfo.historyCount,
                icon: (
                  <img
                    style={imgStyle}
                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                    alt="icon"
                  />
                ),
              }}
            />
          </StatisticCard.Group>
        </RcResizeObserver>
      </div>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '总注册人数',
              value: countInfo.totalUserNums,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '付费会员',
              value: countInfo.memberUserNums,
              description: (
                <Statistic
                  title="占比"
                  value={`${((countInfo.memberUserNums / countInfo.totalUserNums) * 100).toFixed(
                    2,
                  )}%`}
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: '免费会员',
              value: countInfo.totalUserNums - countInfo.memberUserNums,
              description: (
                <Statistic
                  title="占比"
                  value={`${(
                    ((countInfo.totalUserNums - countInfo.memberUserNums) /
                      countInfo.totalUserNums) *
                    100
                  ).toFixed(2)}%`}
                />
              ),
            }}
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <SalesCard />
    </PageContainer>
  );
};

export default Welcome;
