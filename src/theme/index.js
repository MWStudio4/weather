import { createTheme } from '@material-ui/core';
import { grey, yellow, blue } from '@material-ui/core/colors';
import shadows from './shadows';
import typography from './typography';

const LightTheme = createTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: grey,
    paper: '#ffffff',
  },
  shadows,
  typography,
});

const OnhireTheme = createTheme({
  palette: {
    type: 'light',
    primary: yellow,
    secondary: grey,
    paper: '#ffffff',
  },
  shadows,
  typography,
});

const DarkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: yellow,
    secondary: grey,
    paper: '#ffffff',
  },
  shadows,
  typography,
});

export { OnhireTheme, LightTheme, DarkTheme };
