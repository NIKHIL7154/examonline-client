import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, TooltipItem } from 'chart.js';
import { PieChartProp } from '../features/analytics/ScenarioChart';

// Register the required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const SimplePieChart: React.FC<PieChartProp> = ({ submissionData }) => {
    // console.log(submissionData, adjustPieChartValues(submissionData));
    // const labels= ['User Initiated', 'Inactive', 'Timeout', "Malpractice"];
    const dataValue = [
        submissionData.userSubmission,
        submissionData.inactive_autosubmit,
        submissionData.timeoutSubmission,
        submissionData.incidents_autosubmit,
    ];
    // const dataValue = [
    //     40,
    //     20,
    //     30,
    //     10,
    // ];

    // const arcColors = ['#82ca9d', '#6FA371', '#8884d8'];
    // const arcBorders = ['oklch(98.5% 0.002 247.839)', 'oklch(98.5% 0.002 247.839)', 'oklch(98.5% 0.002 247.839)'];

    // if(submissionData.incidents_autosubmit !== null){
    //     labels.push("Malpractice");
    //     dataValue.push(submissionData.incidents_autosubmit);
    //     arcColors.push("#e25d5d");
    //     arcBorders.push("oklch(98.5% 0.002 247.839)");
    // }

    const data = {
        labels: ['User Initiated', 'Inactive', 'Timeout', "Malpractice"],
        datasets: [
            {
                label: 'Scenario Chart',
                data: dataValue,
                backgroundColor: ['#82ca9d', '#6FA371', '#8884d8', "#e25d5d"],
                borderColor: ['oklch(98.5% 0.002 247.839)', 'oklch(98.5% 0.002 247.839)', 'oklch(98.5% 0.002 247.839)', "oklch(98.5% 0.002 247.839)"],
                borderWidth: 3
            },
        ],
    };

    const options = {
        responsive: true,
        layout: {
            padding: 20
        },
        plugins: {
            legend: {
                // position: 'top',
                display: false, // Hide legend (can be enabled if needed)
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: TooltipItem<"doughnut">) {
                        return tooltipItem.label + ': ' + (tooltipItem.raw as number).toFixed(2)+"%";
                    },
                },
            },
        },
        elements: {
            arc: {
                // borderWidth: 4,
                borderRadius: 6 // Set borderRadius to make the arc endings circular
            }
        },
        cutout: '82%', // Creates the "hole" in the center of the doughnut
    };

    return (
        <div className='h-48 w-47 overflow-hidden'>
            <Doughnut data={data} options={options} className='cursor-pointer mt-1 h-48 w-46 ' />
        </div>
    );
};

export default SimplePieChart;
