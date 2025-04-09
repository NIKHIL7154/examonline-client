import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { testAnalyticsType } from '../features/analytics/AnalyticsBox';
import { format, isSameDay } from 'date-fns';

// Sample data for the Bar Chart
const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page H', uv: 3490, pv: 4300, amt: 2100 },
    // { name: 'Page I', uv: 2490, pv: 4300, amt: 2100 },
    // { name: 'Page J', uv: 5490, pv: 4300, amt: 2100 },
];
interface Props {
    testAnalytics: testAnalyticsType[];
}

const formatDataForChart = (testAnalytics: testAnalyticsType[]) => {
    // Group records by the date
    const allDates = Array.from(new Set(testAnalytics.map(item => item.testAt)));

    return allDates.map(date => {
        // Filter the testAnalytics data to include only tests that occurred on the same date
        // const filteredTests = testAnalytics.filter(test => format(new Date(test.testAt), "yyyy-MM-dd") === date);
        const filteredTests = testAnalytics.filter(test => isSameDay(test.testAt, date));

        // Calculate the average attendance percentage for the filtered tests
        const avgAttdPercent = filteredTests.reduce((acc, cur) => {
            const attendancePercent = (cur.attendance / cur.expectedAttendance) * 100;
            return acc + attendancePercent;
        }, 0) / filteredTests.length;

        const formattedAttendancePercent = parseFloat(avgAttdPercent.toFixed(2));

        return {
            label: format(new Date(date), "MMM dd"),
            attendancePercent: formattedAttendancePercent
        };
    });
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      // Retrieve the data for the label and values
      const { attendancePercent, label } = payload[0].payload;
      // console.log(name);
  
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <h4 className='text-sm mb-1'>{label}</h4>
          <p className='text-sm'>Participation: {attendancePercent.toFixed(2)}%</p>
        </div>
      );
    }
  
    return null;
  };


const SimpleBarChart: React.FC<Props> = ({testAnalytics}) => {
    // console.log(formatDataForChart(testAnalytics));
    const chartData = formatDataForChart(testAnalytics);
    
    return (
        <ResponsiveContainer width="100%" height="80%" className={""} >
            <BarChart data={chartData}
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
                barCategoryGap={"20%"}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: "13px" }} /> */}
                {/* <YAxis /> */}
                <Tooltip content={<CustomTooltip/>}/>
                {/* <Legend /> */}
                <Bar dataKey="attendancePercent" fill="#8884d8" radius={[50, 50, 0, 0]} style={{ cursor: "pointer" }} />
                {/* <Bar dataKey="pv" fill="#82ca9d" radius={[50, 50, 50, 50]} /> */}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SimpleBarChart;
