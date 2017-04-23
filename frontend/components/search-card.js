import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class SearchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({ expanded });
  }

  handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  }

  handleExpand() {
    this.setState({ expanded: true });
  }

  handleReduce() {
    this.setState({ expanded: false });
  }

  render() {
    return (
      <div>
        SEARCH CARD
      </div>  
    );
  }
}
