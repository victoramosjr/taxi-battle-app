import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import css from '../style/style.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fc4a66',
  },
});

const styles = {
  mediumIcon: {
    width: 30,
    height: 30
  },
  medium: {
    width: 60,
    height: 60,
    padding: 15
  }  
}

class SearchCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = { showFindMe: true, searching: false }
  }
  
  searchToggle() {
    if(showFindMe) {
      return (
        <div>
          <button>FIND ME</button>
        </div>
      )
    } 
  }

  render() {
    return (
      <div className="search__search-card">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText>
              <div className="search__input-locate-container">
                
                <div className="search__input">
                  <form onSubmit={this.props.pickupSearch}>
                    <TextField
                      hintText="Enter Pickup Address"
                      floatingLabelText="Pickup Address"
                      defaultValue={this.props.address}
                      fullWidth={true}
                      onChange={this.props.onHandleChange.bind(this, "address")}
                    />
                  </form>
                </div>

                <div className="search__locate">
                  <IconButton 
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    tooltip="Find My Location"
                    onTouchTap={this.props.findMe}
                  >
                    <MapsMyLocation />
                  </IconButton> 

                  <IconButton 
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    tooltip="Address Book"
                  >
                    <SocialLocationCity />
                  </IconButton>

                </div>
              </div>

              <div className="search__button-container">
                <RaisedButton
                  target="_blank"
                  label="Enter Destination"
                  primary={true}
                  style={styles.button}
                  icon={<MapsDirections />}
                />
              </div>

            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>

    )
  }
}

export default SearchCard