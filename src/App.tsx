import React, { useEffect, useState, useCallback } from 'react';

import Cards from './components/Cards';
import Chart from './components/Chart';
import CountryPicker from './components/CountryPicker';

import styles from './styles.module.css';

import image from './assets/image.png';

import api from './services/api';

interface DataState {
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

const App: React.FC = () => {
  const [data, setData] = useState<DataState>({} as DataState);
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await api.get('');

      setData(response.data);
    }
    fetchData();
  }, []);

  const handleCountryChange = useCallback(async (newCountry: string) => {
    if (newCountry === 'global') {
      const response = await api.get('');

      setData(response.data);
      setCountry('');
    } else {
      const response = await api.get(`countries/${newCountry}`);

      setData(response.data);
      setCountry(newCountry);
    }
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
