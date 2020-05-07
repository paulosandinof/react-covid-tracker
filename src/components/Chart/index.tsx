import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';

import styles from './styles.module.css';

interface DailyDataState {
  confirmed: {
    total: number;
  };
  deaths: {
    total: number;
  };
  reportDate: Date;
}

interface Data {
  confirmed: {
    value: number;
  };
  recovered: {
    value: number;
  };
  deaths: {
    value: number;
  };
  lastUpdate: Date;
}

interface ChartProps {
  data: Data;
  country: string;
}

const Chart: React.FC<ChartProps> = ({ data, country }) => {
  const [dailyData, setDailyData] = useState<DailyDataState[]>([]);
  console.log('a');
  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await api.get('daily');
      setDailyData(response.data);
    }
    fetchData();
  }, []);

  const lineChart = dailyData.length && (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed.total),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths.total),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
        ],
      }}
    />
  );

  const barChart = data.confirmed && (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  );

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
