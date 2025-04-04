import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

// Define the shape of each data item in the dataset
interface DataItem {
  name: string;
  value: number;
}

// Sample data
const data: DataItem[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// Type the props for the renderActiveShape function (using the PieSector type from Recharts)
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // Ensure cx and outerRadius are numbers
  const outerRadiusValue = outerRadius ?? 0; // Provide fallback if undefined
  const cxValue = typeof cx === 'string' ? parseFloat(cx) : cx; // Ensure cx is a number

  // Calculate coordinates for the shapes
  const sx = cxValue + (outerRadiusValue + 10) * cos;
  const sy = cy + (outerRadiusValue + 10) * sin;
  const mx = cxValue + (outerRadiusValue + 30) * cos;
  const my = cy + (outerRadiusValue + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cxValue} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cxValue}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadiusValue}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cxValue}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadiusValue + 6}
        outerRadius={outerRadiusValue + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Functional component
const Example: React.FC = () => {
  // State to track the active index
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Handler for mouse enter event
  const onPieEnter = (_: React.MouseEvent<SVGPathElement>, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Example;
