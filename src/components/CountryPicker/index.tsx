import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './styles.module.css';
import api from '../../services/api';

interface CountriesState {
  name: string;
}

interface CountryPickerProps {
  handleCountryChange: Function;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  handleCountryChange,
}) => {
  const [countries, setCountries] = useState<CountriesState[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const { data } = await api.get('countries');
      setCountries(data.countries);
    }
    fetchData();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={e => handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {countries.map(country => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
