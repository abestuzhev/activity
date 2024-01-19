import React, {useMemo} from 'react';
import styles from './index.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const ChartPie = ( ) => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                // backgroundColor: [
                //     '#111',
                //     '#333',
                //     '#444',
                //     '#555',
                //     '#666',
                //     '#777',
                // ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ],
                borderWidth: 1,
            },
        ],
    };

    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 400,
                easing: 'easeOutCubic',
            },
            layout: {
                padding: 0
            },
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        fontColor: "#ccc",
                        boxWidth: 12,
                    },
                },
            },

            tooltips: {
                displayColors: false,
                callbacks: {
                    label: (
                        tooltipItem, data
                    ) => {
                        const { index } = tooltipItem
                        return `${data.labels[index]}: ${data.datasets[0].data[index]}%`
                    },
                },
            },
        }),
        [],
    )


    return (
        <div className={styles.pie}>
            <Pie
                data={data}
                options={options}
            />
        </div>

    );
};

export default ChartPie;