import React, {useState} from 'react';
import {
  Box,
  Button, Card, CardContent,
  Container,
  FormControl,
  Grid,
  makeStyles, MenuItem, Select,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import {apiKey, baseUrl} from '../../utils/config';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => {
  // console.info(`Theme`, theme);
  return ({
    root: {
      minHeight: '100vh',
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6, 2, 6, 2),
      borderRadius: 6,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.secondary[300],
    },
    formContainer: {
      padding: theme.spacing(6, 2, 6, 2),
      backgroundColor: theme.palette.background.paper,
    },
    field: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    buttonHandlers: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      textTransform: "none",
    },
    searchButton: {
      marginLeft: 20,
    },
    logo: {
      margin: "auto"
    },
    weatherWrap: {},
    weatherItemWrap: {
      minWidth: 100,
      minHeight: 100,
      width: 100,
      height: 100,
      marginBottom: 20
    },
    date: {
      marginTop: 10
    }
  });
})

const Home = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState(false);
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);
  const [weathers, setWeathers] = useState([]);


  const onSearchCity = async () => {
    if (!query) return;

    try {
      setAlert(false);
      const {data} = await axios.get(`${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=${query}`);
      if (data && Array.isArray(data) && data.length) {
        setCities(data.map(city => ({
          id: city.Key,
          name: city.LocalizedName || city.EnglishName || 'noname',
          country: city.Country?.LocalizedName || city.Country?.EnglishName || 'nocountry'
        })));
      } else {
        setCities([]);
      }
    } catch (e) {
      console.error(e)
      setAlert(true);
    }
  };

  const onSelectCity = async (event) => {
    try {
      setCity(event.target.value);
      setAlert(false);
      const {data} = await axios.get(`${baseUrl}/forecasts/v1/daily/5day/${event.target.value}?apikey=${apiKey}&metric=true`);
      console.info('Res', data);
      if (data && data.DailyForecasts && Array.isArray(data.DailyForecasts) && data.DailyForecasts.length) {
        setWeathers(data.DailyForecasts.map(item => {
          const {Temperature: tmp} = item;
          const avgTmp = Math.ceil((tmp.Minimum?.Value + tmp.Maximum?.Value) / 2);
          return {
            iconNumber: item.Day?.Icon < 10 ? `0${item.Day?.Icon}` : item.Day?.Icon,
            temp: avgTmp,
            date: dayjs(item.Date).format('DD MMMM YYYY')
          };
        }));
      }
    } catch (e) {
      console.error(e)
      setAlert(true);
    }
  };

  const WeatherForm = () => (
    <div className={classes.formContainer}>

      {alert && <Alert severity="error">There was an error fetching data!</Alert>}

      <Box display={"flex"} justifyContent={"center"}>
        <img src="logo512.png" alt="logo" height={64}/>
      </Box>
      <Typography variant="h4" gutterBottom align={"center"}>
        Weather App
      </Typography>

      <Box className={classes.buttonHandlers}>
        <SearchIcon/>
        <TextField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          fullWidth
          variant="outlined"
          color="primary"
          label="City"
          placeholder="City"
          type="text"
          size="small"
          className={classes.field}
          autoFocus
        />
        <Box className={classes.searchButton}>
          <Button variant="outlined" color="default" className={classes.button} onClick={onSearchCity}>Search</Button>
        </Box>
      </Box>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <Select
          disabled={cities.length === 0}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={city}
          onChange={onSelectCity}
          label="Choose city"
        >
          {
            cities.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}, {item.country}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );

  return (
    <Container className={classes.root} maxWidth="lg">
      <WeatherForm/>
      {
        weathers.length > 0 && (
          <Grid container spacing={1} alignContent={"center"} justifyContent="space-between" alignItems={"center"}
                className={classes.weatherWrap}>
            {
              weathers.map(item => (
                <Grid item xs={12} md={2} className={classes.weatherItemWrap}>
                  <Card className={classes.weatherItem} variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <img src={`https://developer.accuweather.com/sites/default/files/${item.iconNumber}-s.png`}
                             alt="item-temp"/>
                        <Typography className={classes.temperature} align="center" variant="h2">
                          {item.temp}°
                        </Typography>
                      </Box>
                      <Typography className={classes.date} align="center">
                        {item.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        )
      }
    </Container>
  )
    ;
};

Home.propTypes = {};

export default Home;
