import { createMuiTheme } from '@material-ui/core/styles';
import { red,deepPurple } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    deepPurple:{
      main:deepPurple.A200
    },
    pinko:{
      main:'#e7b3b3'
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;