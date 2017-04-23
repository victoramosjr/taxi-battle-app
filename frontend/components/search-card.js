import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import { green500 } from 'material-ui/styles/colors';
import css from '../style/style.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fc4a66',
    accent1Color: green500
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

    this.buttonToggle = this.buttonToggle.bind(this);
  }
  
  buttonToggle() {
    const {
      buttonType,
      buttonText,
      buttonIcon
    } = this.props;

    
      if (buttonType === "Directions") {
        return (
          <RaisedButton
            onTouchTap={this.props.destinationSearch}
            label={buttonText}
            primary={true}
            style={styles.button}
            icon={<MapsDirections />}
          />
        )
      }

      return (
        <div>
          <RaisedButton
            onTouchTap={this.props.destinationSearch}
            label={buttonText}
            secondary={true}
            style={styles.button}
            icon={<EditorAttachMoney />}
          />
        </div>
      )
   
  }

  render() {

    const {
      floatingLabel,
      textHint,
    } = this.props;

    return (
      <div className="search__search-card">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <CardText>
              <div className="search__input-locate-container">
                
                <div className="search__input">
                  <form onSubmit={this.props.pickupSearch}>
                    <TextField
                      hintText={textHint}
                      floatingLabelText={floatingLabel}
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
                {this.buttonToggle()}
              </div>

            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>

    )
  }
}

export default SearchCard