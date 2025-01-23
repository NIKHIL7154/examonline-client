// BarChart.tsx
import { Bar } from 'react-chartjs-2'; // Import the Bar chart component from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ChartOptions } from 'chart.js';  // Correct import for ChartOptions

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  // Data for the Bar chart
  const data = {
    labels: ["", "", "" , "", "", "", "", "", ""], // X-axis labels (months)
    datasets: [
      {
        // label: 'Sales', // Label for the dataset
        data: [40, 15, 10, 22, 22, 28, 8, 32], // Data for each bar (monthly sales)
        backgroundColor: '#91D794', // Bar color (light greenish)
        borderColor: '#000', // Border color (greenish)
        borderWidth: 1, // Border width for the bars
        barThickness: 15,
        categoryPercentage: 0.2,
        barPercentage: 0.2,
      },
    ],
  };

  // Options for chart customization
  const options: ChartOptions<'bar'> = {  // Ensure 'bar' is passed as the chart type
    responsive: true, // Make the chart responsive to window resizing
    maintainAspectRatio: false, // Allow width/height customization
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
      },
    },
    plugins: {
      legend: {
        // position: 'top', // Position of the legend (can be 'top', 'left', 'right', 'bottom')
        display: false,
      },
    },
  };

  return (
    <div className='flex items-center justify-center pt-6 ' style={{ width: '300px', height: '170px' }}>
      {/* Bar chart with data and options */}
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;
