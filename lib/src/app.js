import React from 'react';
import ReactDOM from 'react-dom';
import SolrConnector from 'react-solr-connector';
import Navbar from './navbar.js';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Visualize from './visualize.js';

injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchParams: null,
      initialCode: "/*\nExample:\nImport Search:\nimport android.app.Fragment; or\nandroid.app.Fragment;\nMethod Search: " +
      "getTag()\n*/",
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
      <SolrConnector searchParams={this.state.searchParams}>
        <Navbar doSearch={this.doSearch.bind(this)} />
        <Visualize doSearch={this.doSearch.bind(this)} initialCode={this.state.initialCode}/>
      </SolrConnector>
    </div>;
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<App/>, document.getElementById('app'));
