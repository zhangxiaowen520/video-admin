import { Column } from '@ant-design/plots';
import { Card, DatePicker } from 'antd';
import dayjs from 'dayjs';
import useStyles from './style.style';

const { RangePicker } = DatePicker;

const SalesCard = () => {
  const { styles } = useStyles();
  const config = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
    },
    xField: '月份',
    yField: '月均降雨量',
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
            <a href="#">本周</a>
            <a href="#">本月</a>
            <a href="#">本年</a>
          </div>
          <RangePicker
            value={[dayjs(), dayjs()]}
            onChange={() => {}}
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
