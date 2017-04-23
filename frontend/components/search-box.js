import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JSONP from 'jsonp';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const googleAutoSuggestURL = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';

class SearchBox extends Component {
  constructor(props) {
    super(props);
  
    this.state = { dataSource: [], inputValue: '' }

    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
  }

  performSearch() {
    const
      self = this,
      url  = googleAutoSuggestURL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      JSONP(url, function(error, data) {
        let searchResults, retrievedSearchTerms;

        if(error) return console.log(error);

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource : retrievedSearchTerms
        });
      });
    }
  }

  onUpdateInput(inputValue) {
    const self = this;

    this.setState({
      inputValue : inputValue
      },function(){
      self.performSearch();
    });
  }

  onNewRequest(searchTerm) {
    alert('test123!');
  }
  
  render() {
    const { dataSource, onUpdateInput } = this.state;
    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AutoComplete
          id = "uniqeid" // id inserted to fix known console bug
          dataSource = {this.state.dataSource}
          onUpdateInput = {this.onUpdateInput}
          onNewRequest = {this.onNewRequest} 
        />
      </MuiThemeProvider>
    );
  }
}

export default SearchBox;
