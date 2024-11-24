import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 25, color: '#D1F1D3' },
  { name: 'B', value: 25, color: '#91D794' },
  { name: 'C', value: 25, color: '#6FA371' },
  { name: 'D', value: 25, color: '#D83B22' },
];
const cx = 100;
const cy = 100;
const iR = 80;
const oR = 100;
// use value to handle the needle position
const value = 65;

interface DataItem {
  value: number;
}

const needle = (value: number, data: DataItem[], cx: number, cy: number, iR: number, oR: number, color: string) => {
  // Basic parameter validation
  if (!value || !data || data.length === 0) {
    console.error('Invalid input parameters');
    return null;
  }

  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });

  const RADIAN = Math.PI / 180;
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-base" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
    />,
  ];
};

export default class Gauge extends PureComponent {
  render() {
    return (
      <PieChart width={210} height={110}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#6FA371')}
      </PieChart>
    );
  }
}