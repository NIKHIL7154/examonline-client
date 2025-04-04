import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart: React.FC = () => {
  // Define the data for the doughnut chart
  const data = {
    labels: ['Red', 'Blue', 'Yellow'], // Labels for each slice
    datasets: [
      {
        label: 'My Doughnut Chart', // Label for the dataset
        data: [300, 50, 100], // Data values corresponding to the labels
        backgroundColor: ['#FF5733', '#337AFF', '#FFEB3B'], // Colors for each slice
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Border colors for the slices
        borderWidth: 2,
      },
    ],
  };

  // Define chart options with the correct type for legend position
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: 'top' as const, // Ensure 'top' is a valid value according to Chart.js typings
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
      },
    },
  };

  return (
    <div>
      <h2>Doughnut Chart Example</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
