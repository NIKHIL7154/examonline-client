// PieChart.tsx (Use `.tsx` for TypeScript files)
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartOptions } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
    // Data for the Pie chart
    const data = {
        labels: ['Pass', 'Incomplete', 'Disputed', 'Fail'], // Labels for each slice
        datasets: [
            {
                data: [300, 80, 50, 50], // Data values for each slice
                backgroundColor: ['#91D794', '#6FA371', '#5A765B', '#D1F1D3'], // Colors for the slices
                // Optionally: hoverBackgroundColor for hover effects
                // hoverBackgroundColor: ['#91D794', '#6FA371', '#5A765B', '#D1F1D3'], // Colors on hover
            },
        ],
    };

    // Options for chart customization
    const options: ChartOptions<'pie'> = { // Specify 'pie' as the chart type
        responsive: true, // Make the chart responsive to window resizing
        maintainAspectRatio: false, // Allow width/height customization
        plugins: {
            legend: {
                position: 'right', // Valid positions: 'top', 'left', 'right', 'bottom', 'center'
                labels: {
                    color: '#000', // Change legend text color to red
                  },
            },
        },
    };

    return (
        <div className='w-[500px] h-[300px]'>
            {/* Pie chart with specific width and height */}
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
