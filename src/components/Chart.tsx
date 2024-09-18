import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
    ChartDataLabels
);

type Props = {
    title: string;
    data: {
        CharacterFrequency: string;
        Percentage: number;
    }[];
    warmColor?: string;
    coolColor?: string;
};
function interpolateColor(warmColor: string, coolColor: string, percentage: number): string {
    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return (
            '#' +
            [r, g, b]
                .map((x) => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                })
                .join('')
        );
    };

    const [r1, g1, b1] = hexToRgb(warmColor);
    const [r2, g2, b2] = hexToRgb(coolColor);

    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);

    return rgbToHex(r, g, b);
}

const Chart = (props: Props) => {
    const { data: dataProps, title, warmColor: warmColorProps, coolColor: coolColorProps } = props;
    const data = {
        labels: dataProps.map((item) => item.CharacterFrequency),
        datasets: [
            {
                label: 'Phần trăm',
                data: dataProps.map((item) => item.Percentage),
                backgroundColor: dataProps.map((item, index) => {
                    const maxPercentage = Math.max(...dataProps.map((item) => item.Percentage));
                    const percentage = item.Percentage / maxPercentage;
                    const warmColor = warmColorProps || '#FF69B4'; // warm color (red)
                    const coolColor = coolColorProps || '#45A0E6'; // cool color (blue)
                    const color = interpolateColor(warmColor, coolColor, percentage);
                    return color;
                }),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },

        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: title,
            },
            datalabels: {
                color: '#fff',
                formatter: (value: number) => {
                    return value + '%';
                },
            },
        },
    };

    return (
        <div className='w-full sm:w-[90%] lg:w-[45%] mx-auto justify-center flex items-center'>
            <Pie data={data} options={options} />
        </div>
    );
};
export default Chart;
