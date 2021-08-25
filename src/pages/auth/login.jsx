import React, {useState} from 'react';
import {Box, Button, Container, Grid, makeStyles, TextField, Typography,} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {baseHeaders, baseUrl} from '../../utils/config';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
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
  rightChild: {
    marginLeft: "auto"
  },
  logo: {
    margin: "auto"
  }
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({non_field_errors: null});
  const {handleSubmit, control} = useForm();

  const onSubmit = (values) => {
    axios.post(`${baseUrl}/auth-token/`, values, baseHeaders)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        history.push('/users');
      }).catch((err) => setError(err.response.data));
  };

  const SignInForm = () => (
    <Container maxWidth="sm" className={classes.formContainer}>
      <Box display={"flex"} justifyContent={"center"}>
        <img src="logo512.png" alt="logo" height={64}/>
      </Box>
      <Typography variant="h4" gutterBottom align={"center"}>
        Sign in
      </Typography>
      {error.non_field_errors ? <Typography color="error">{error.non_field_errors}</Typography> : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <TextField
              /* eslint react/jsx-props-no-spreading: */
              {...field}
              fullWidth
              variant="outlined"
              color="primary"
              label="Username"
              placeholder="Username"
              type="text"
              size="small"
              className={classes.field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <TextField
              /* eslint react/jsx-props-no-spreading: */
              {...field}
              fullWidth
              variant="outlined"
              color="primary"
              label="Password"
              placeholder="Password"
              type="password"
              size="small"
              autoComplete="true"
              className={classes.field}
            />
          )}
        />
        <Box className={classes.buttonHandlers}>
          <Button variant="text" color="primary" component={Link} className={classes.button}>Create Account</Button>
          <Box className={classes.rightChild}>
            <Button variant="contained" color="primary" className={classes.button} type="submit">Login</Button>
          </Box>
        </Box>
      </form>
    </Container>
  );

  return (
    <>
      <Hidden only={["xs"]}>
        <Grid container xs={12} direction={"column"} justify={"center"} alignContent={"center"}
              alignItems={"center"} className={classes.root}>
          <Grid item xs={12} md={4} className={classes.container}>
            <SignInForm/>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <SignInForm/>
      </Hidden>
    </>
  )
    ;
};

Login.propTypes = {};

export default Login;
