import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import css from '../style/style.scss';

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
        <MuiThemeProvider>
          <Card>
            <CardText>
              {this.props.newAddress}
              <form onSubmit={this.props.addressSearch}>
                <TextField
                  hintText="Enter Pickup Address"
                  floatingLabelText="Pickup Address"
                  defaultValue={this.props.address}
                  fullWidth={true}
                  onChange={this.props.onHandleChange.bind(this, "address")}
                />
              </form> 
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>

    )
  }
}

export default SearchCard