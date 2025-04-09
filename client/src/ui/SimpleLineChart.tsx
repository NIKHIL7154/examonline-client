import { format, isSameDay } from 'date-fns';
import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { testAnalyticsType } from '../features/analytics/AnalyticsBox';


interface LineChartProps {
  testAnalytics: testAnalyticsType[];
}

// const data = [
//   { label: 'Jan 10', attemptRate: 30, attemptAccuracy: 50 },
//   { label: 'Jan 12', attemptRate: 45, attemptAccuracy: 30 },
//   { label: 'Jan 14', attemptRate: 20, attemptAccuracy: 10 },
//   { label: 'Jan 17', attemptRate: 25, attemptAccuracy: 50 },
//   { label: 'Jan 20', attemptRate: 30, attemptAccuracy: 40 },
//   { label: 'Feb 1', attemptRate: 60, attemptAccuracy: 60 },
//   { label: 'Feb 4', attemptRate: 90, attemptAccuracy: 20 },
// ];

const formatDataForChart = (testAnalytics: testAnalyticsType[]) => {
  // const allDates = Array.from(new Set(testAnalytics.map(item => format(item.testAt, "yyyy-MM-dd"))));
  const allDates = Array.from(new Set(testAnalytics.map(item => item.testAt)));

  return allDates.map(date => {
    // Filter the testAnalytics data to include only tests that occurred on the same date
    const filteredTests = testAnalytics.filter(test => isSameDay(test.testAt, date));

    // Calculate the average of overallAttemptRate and overallAttemptAccuracy
    const averageAttemptRate = filteredTests.reduce((acc, cur) => acc + cur.overallAttemptRate, 0) / filteredTests.length;
    const averageAttemptAccuracy = filteredTests.reduce((acc, cur) => acc + cur.overallAttemptAccuracy, 0) / filteredTests.length;

    const formattedAttemptRate = parseFloat(averageAttemptRate.toFixed(2));
    const formattedAttemptAccuracy = parseFloat(averageAttemptAccuracy.toFixed(2));

    return {
      label: format(date, "MMM dd"),
      averageAttemptRate: formattedAttemptRate,
      averageAttemptAccuracy: formattedAttemptAccuracy,
    };
  });
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Retrieve the data for the label and values
    const { averageAttemptRate, averageAttemptAccuracy, label } = payload[0].payload;
    // console.log(name);

    return (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <h4 className='text-sm mb-1'>{label}</h4>
        <p className='text-sm'>Attempt Rate: {averageAttemptRate.toFixed(2)}%</p>
        <p className='text-sm'>Attempt Accuracy: {averageAttemptAccuracy.toFixed(2)}%</p>
      </div>
    );
  }

  return null;
};


const SimpleLineChart: React.FC<LineChartProps> = ({ testAnalytics }) => {
  // console.log(formatDataForChart(testAnalytics));
  const formattedData = formatDataForChart(testAnalytics);

  return (
    <ResponsiveContainer width="95%" height="100%" className={"ml-1"}>
      <LineChart
        // className='border'
        // width={500}
        // height={200}
        data={formattedData}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 10,
        //   bottom: 5,
        // }}
        margin={{
          top: 5,
          // right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" />
        <YAxis /> */}

        {/* <XAxis dataKey="name" axisLine={false}/> */}
        {/* <YAxis axisLine={false} /> */}
        <Tooltip content={<CustomTooltip />} />
        {/* <Tooltip/> */}
        {/* <Legend /> */}
        <Line type="monotone" dataKey="averageAttemptRate" unit={"%"} dot={false} strokeWidth={3} stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="averageAttemptAccuracy" unit={"%"} dot={false} strokeWidth={3} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
