import React from 'react';
import ReactDOM from 'react-dom';
import SolrConnector from 'react-solr-connector';
import SolrConnectorDemo from './demo.js';
import Navbar from './navbar.js';


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

  render() {
    return <div>

    <Navbar/>
    <SolrConnector searchParams={this.state.searchParams}>
      <SolrConnectorDemo doSearch={this.doSearch.bind(this)}/>
    </SolrConnector>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
