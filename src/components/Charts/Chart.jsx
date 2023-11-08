import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#fff';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Informations du jour',
        },
    }
};

function Chart({ d }) {

    const labels = d.labels.map(l => l.split(' ')[1])

    const data = {
        labels,
        datasets: [
            {
                label: 'Températures',
                data: d.datas.temp,
                borderColor: 'rgba(255, 255, 0, .35)',
                backgroundColor: 'rgb(255, 255, 0)',
            },
            {
                label: 'Humidité',
                data: d.datas.humidity,
                borderColor: 'rgba(0, 0, 255, .35)',
                backgroundColor: 'rgb(0, 0, 255)',
            }
        ],
    };

    return <Line options={options} data={data} />;
}

export default Chart