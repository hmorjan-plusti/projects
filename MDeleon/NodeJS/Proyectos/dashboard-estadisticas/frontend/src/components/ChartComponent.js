import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartComponent = ({ stats }) => {
  const data = {
    labels: stats.map((s) => s.title),
    datasets: [
      {
        label: 'Valor',
        data: stats.map((s) => s.value),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default ChartComponent;
