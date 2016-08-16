import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

MyComponents.Detail = React.createClass({

  render: function() {
    return (
          <ListItem
              primaryText={this.props.commit._version_}
              leftIcon={<ContentInbox />}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                    key={1}
                    primaryText={this.props.commit.c_email_sni}
                />,
                <ListItem
                    key={2}
                    primaryText={this.props.commit.c_date_tdt}
                />,
              ]}
          />
    );
  }
});

class SolrConnectorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solrSearchUrl: "http://192.12.242.139:8983/solr/fixr_delta/select",
      query: "*:*",
      filter: "",
      fetchFields: ""
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let searchParams = {
      solrSearchUrl: this.state.solrSearchUrl,
      query: this.state.query,
      filter: [this.state.filter],
      fetchFields: this.state.fetchFields.split(" "),
      offset: 0,
      limit: 10,
      highlightParams: {
        "hl": "true",
        "hl.fl": "name manu",
        "hl.snippets": 1,
        "hl.fragsize": 500
      }
    };
    this.props.doSearch(searchParams);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {

    var commitObjs;
    if(this.props.solrConnector.response!=null){
      console.log('see',this.props.solrConnector.response.response.docs);

      commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <MyComponents.Detail commit={s} key={i}/>
      });

    }else{
      commitObjs = 'null'
    }

    return <div className="row">
      <div className="col s12 m5 l5">
      <div className="row">
        <div className="col s10 push-s1">
      <form className="inputForm" onSubmit={this.onSubmit.bind(this)}>
        <h4>searchParams:</h4>
        <div className="col s12 m12 l12">
        <p>
          solrSearchUrl: {" "}
          <input type="text" value={this.state.solrSearchUrl}
            onChange={e => {this.setState({ solrSearchUrl: e.target.value })}} />
        </p>
        </div>
        <div className="col s12 m12 l12">
        <p>
          query: {" "}
          <input type="text" value={this.state.query}
            onChange={e => {this.setState({ query: e.target.value })}} />
          {" "}
          </p>
        </div>
        <div className="col s12 m12 l12">
        <p>
          filter: {" "}
          <input type="text" value={this.state.filter}
            onChange={e => {this.setState({ filter: e.target.value })}} />
        </p>
        </div>
        <div className="col s12 m12 l12">
        <p>
          fetchFields: {" "}
          <input type="text" value={this.state.fetchFields}
            onChange={e => {this.setState({ fetchFields: e.target.value })}} />
        </p>
        </div>
        <p>
          <button className="waves-effect waves-light btn" type="submit">Search</button>
        </p>
      </form>
          </div>
      </div>
        </div>

      <div className="col s12 m7 l7">
        <List>
          <Subheader>Commit Objects</Subheader>
          {commitObjs}
        </List>
      </div>
      </div>;
  }
}

SolrConnectorDemo.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SolrConnectorDemo;
