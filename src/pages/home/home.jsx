import React, {useState} from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles, MenuItem, Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {apiKey, baseUrl} from '../../utils/config';
import Hidden from '@material-ui/core/Hidden';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => {
  // console.info(`Theme`, theme);
  return ({
    root: {
      minHeight: '90vh',
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
    }
  });
})

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({non_field_errors: null});
  const [alert, setAlert] = useState(false);
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);


  const onSearchCity = async () => {
    try {
      setAlert(false);
      const {data} = await axios.get(`${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=new`);
      console.info('Res', data);
      setCities(data.map(city => ({})));
    } catch (e) {
      console.error(e)
      setAlert(true);
    }
  };

  const onSelectCity = async (city) => {
    try {
      console.info('City', city.target.value)
      setAlert(false);
      const {data} = await axios.get(`${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=new`);
      console.info('Res', data);
      setCities(data.map(city => ({
        id: city.Key,
        name: city.LocalizedName || city.EnglishName || 'noname'
      })));
    } catch (e) {
      console.error(e)
      setAlert(true);
    }
  };

  const WeatherForm = () => (
    <Container maxWidth="xl" className={classes.formContainer}>

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
      {
        cities.length > 0 && (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={city}
              onChange={onSelectCity}
              label="Age"
            >
              <MenuItem value="">
                <em>Choose city</em>
              </MenuItem>
              {
                cities.map(item => (
                  <MenuItem key={item.Key} value={item.Key}>Ten</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        )
      }
    </Container>
  );

  return (
    <>
      <Hidden only={["xs"]}>
        <Grid container direction={"column"} justifyContent={"center"} alignContent={"center"}
              alignItems={"center"} className={classes.root}>
          <Grid item xs={12} md={4} className={classes.container}>
            <WeatherForm/>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <WeatherForm/>
      </Hidden>
    </>
  )
    ;
};

Home.propTypes = {};

export default Home;
