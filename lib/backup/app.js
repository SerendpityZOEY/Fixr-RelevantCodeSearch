import React from 'react';
import ReactDOM from 'react-dom';
import SolrConnector from 'react-solr-connector';
import SolrConnectorDemo from './demo.js';
import Navbar from './navbar.js';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchParams: null
    }
  }

  doSearch(searchParams) {
    this.setState({searchParams});
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return <div>

    <Navbar/>
    <SolrConnector searchParams={this.state.searchParams}>
      <SolrConnectorDemo doSearch={this.doSearch.bind(this)}/>
    </SolrConnector>
    </div>;
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<App/>, document.getElementById('app'));
