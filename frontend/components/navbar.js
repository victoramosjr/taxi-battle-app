import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import css from '../style/style.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fc4a66',
  },
});

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Taxi Battle" showMenuIconButton={false} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Navbar;
