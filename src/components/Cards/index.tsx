import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './styles.module.css';

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

interface CardsProps {
  data: Data;
}

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${styles.card} ${styles.infected}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              {data.confirmed && (
                <CountUp
                  start={0}
                  end={data.confirmed.value}
                  duration={2.5}
                  separator="."
                />
              )}
            </Typography>
            <Typography color="textSecondary">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${styles.card} ${styles.recovered}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              {data.recovered && (
                <CountUp
                  start={0}
                  end={data.recovered.value}
                  duration={2.5}
                  separator="."
                />
              )}
            </Typography>
            <Typography color="textSecondary">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${styles.card} ${styles.deaths}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              {data.deaths && (
                <CountUp
                  start={0}
                  end={data.deaths.value}
                  duration={2.5}
                  separator="."
                />
              )}
            </Typography>
            <Typography color="textSecondary">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths of COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
