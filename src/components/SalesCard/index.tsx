import { getCountGantt } from '@/services/video/api';
import { Column } from '@ant-design/plots';
import { Card, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import useStyles from './style.style';

const { RangePicker } = DatePicker;

const SalesCard = () => {
  const [startDate, setStartDate] = useState(dayjs().startOf('week').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [countGanttData, setCountGanttData] = useState<any[]>([]);
  const [isYear, setIsYear] = useState(0); // year=0 不按月份 year=1按月份

  const getCountGanttClick = async () => {
    try {
      const res = await getCountGantt({
        endDate: endDate,
        startDate: startDate,
        year: isYear,
      });
      if (res.code === 200) {
        setCountGanttData(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('获取统计数据失败');
    }
  };

  const getTime = (type: string) => {
    const end = dayjs().format('YYYY-MM-DD');
    let start = '';

    if (type === 'week') {
      start = dayjs().startOf('week').format('YYYY-MM-DD');
    } else if (type === 'month') {
      start = dayjs().startOf('month').format('YYYY-MM-DD');
    } else if (type === 'year') {
      start = dayjs().startOf('year').format('YYYY-MM-DD');
    }

    return {
      startDate: start,
      endDate: end,
    };
  };

  useEffect(() => {
    getCountGanttClick();
  }, [startDate, endDate]);

  const { styles } = useStyles();
  const config = {
    data: countGanttData,
    xField: 'date',
    yField: 'quantity',
    colorField: 'name',
    group: true,
    style: {
      // 矩形四个方向的内边距
      inset: 5,
      // 矩形单个方向的内边距
      // insetLeft:5,
      // insetRight:20,
      // insetBottom:10
      // insetTop:10
    },
  };
  return (
    <Card
      title="注册会员趋势图"
      extra={
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                const timeRange = getTime('week');
                setStartDate(timeRange.startDate);
                setEndDate(timeRange.endDate);
                setIsYear(0);
              }}
            >
              本周
            </a>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                const timeRange = getTime('month');
                setStartDate(timeRange.startDate);
                setEndDate(timeRange.endDate);
                setIsYear(0);
              }}
            >
              本月
            </a>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                const timeRange = getTime('year');
                setStartDate(timeRange.startDate);
                setEndDate(timeRange.endDate);
                setIsYear(1);
              }}
            >
              本年
            </a>
          </div>
          <RangePicker
            value={[dayjs(startDate), dayjs(endDate)]}
            onChange={(e) => {
              if (e) {
                setStartDate(dayjs(e[0]).format('YYYY-MM-DD'));
                setEndDate(dayjs(e[1]).format('YYYY-MM-DD'));
                setIsYear(0);
              }
            }}
            style={{
              width: 256,
            }}
          />
        </div>
      }
      style={{ marginTop: 24 }}
    >
      <Column {...config} />
    </Card>
  );
};

export default SalesCard;
