import React from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Tabs, Tab} from 'material-ui/Tabs';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  table:{
    fontSize:12
  }
};

MyComponents.Compare = React.createClass({
  render: function(){
    return(
    <table>
      <thead>
      <tr>
        <th data-field="id">Attribute</th>
        <th data-field="name">Previous</th>
        <th data-field="price">Current</th>
      </tr>
      </thead>

      <tbody style={styles.table}>
        <tr>
          <td>
            user_sni
          </td>
          <td>
            {this.props.commit.p_user_sni}
          </td>
          <td>
            {this.props.commit.c_user_sni}
          </td>
        </tr>

        <tr>
          <td>
            email_sni
          </td>
          <td>
            {this.props.commit.p_email_sni}
          </td>
          <td>
            {this.props.commit.c_email_sni}
          </td>
        </tr>

        <tr>
          <td>
            hash_sni
          </td>
          <td>
            {this.props.commit.p_hash_sni}
          </td>
          <td>
            {this.props.commit.c_hash_sni}
          </td>
        </tr>

        <tr>
          <td>
            date_tdt
          </td>
          <td>
            {this.props.commit.p_date_tdt}
          </td>
          <td>
            {this.props.commit.c_date_tdt}
          </td>
        </tr>

      </tbody>
    </table>
    )
  }
});

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
                    key={0}
                    primaryText={"repo_sni : " + this.props.commit.repo_sni}
                />,
                <ListItem
                    key={1}
                    primaryText={"body_t: " + this.props.commit.c_body_t}
                />,
                <ListItem
                    key={2}
                    primaryText="callsites_added_cs: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_added_cs}/>,
                    ]}
                />,
                <ListItem
                    key={3}
                    primaryText="callsites_added_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_added_t}/>,
                    ]}
                />,
                <ListItem
                    key={4}
                    primaryText="callsites_cs: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_cs}/>,
                    ]}
                />,
                <ListItem
                    key={5}
                    primaryText="callsites_removed_cs: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_removed_cs}/>,
                    ]}
                />,
                <ListItem
                    key={6}
                    primaryText="callsites_removed_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_removed_t}/>,
                    ]}
                />,
                <ListItem
                    key={7}
                    primaryText="callsites_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_callsites_t}/>,
                    ]}
                />,
                <ListItem
                    key={8}
                    primaryText="comments_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_comments_t}/>,
                    ]}
                />,
                <ListItem
                    key={9}
                    primaryText="contents_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_contents_t}/>,
                    ]}
                />,
                <ListItem
                    key={10}
                    primaryText={"date_tdt: "+this.props.commit.c_date_tdt}
                />,
                <ListItem
                    key={11}
                    primaryText={"email_sni: "+this.props.commit.c_email_sni}
                />,
                <ListItem
                    key={12}
                    primaryText={"hash_sni: "+this.props.commit.c_hash_sni}
                />,
                <ListItem
                    key={13}
                    primaryText="imports_added_cs: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_imports_added_cs}/>,
                    ]}
                />,
                <ListItem
                    key={14}
                    primaryText="imports_added_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_imports_added_t}/>,
                    ]}
                />,
                <ListItem
                    key={15}
                    primaryText="imports_removed_cs: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_imports_removed_cs}/>,
                    ]}
                />,
                <ListItem
                    key={16}
                    primaryText="imports_removed_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_imports_removed_t}/>,
                    ]}
                />,
                <ListItem
                    key={17}
                    primaryText="imports_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_imports_t}/>,
                    ]}
                />,
                <ListItem
                    key={18}
                    primaryText="methods_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_methods_t}/>,
                    ]}
                />,
                <ListItem
                    key={19}
                    primaryText={"parents_ss: "+this.props.commit.c_parents_ss}
                />,
                <ListItem
                    key={20}
                    primaryText="patch_no_context_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_patch_no_context_t}/>,
                    ]}
                />,
                <ListItem
                    key={21}
                    primaryText="patch_t: "
                    nestedItems={[
                      <ListItem key={1} primaryText={this.props.commit.c_patch_t}/>,
                    ]}
                />,
                <ListItem
                    key={22}
                    primaryText={"subject_t: "+this.props.commit.c_subject_t}
                />,
                <ListItem
                    key={23}
                    primaryText={"user_sni: "+this.props.commit.c_user_sni}
                />,
                <ListItem
                    key={24}
                    primaryText={"id: "+ this.props.commit.id}
                />,
                <ListItem
                    key={25}
                    primaryText={"name_sni: "+this.props.commit.name_sni}
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
      fetchFields: "",
      rows: 10
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
      limit: this.state.rows,
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
    var compareObjs;
    if(this.props.solrConnector.response!=null){
      console.log('see',this.props.solrConnector.response.response.docs);

      commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <MyComponents.Detail commit={s} key={i}/>
      });

      compareObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <MyComponents.Compare commit={s} key={i}/>
      });

    }else{
      commitObjs = 'null';
      compareObjs = 'null';
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
        <div className="col s12 m12 l12">
          <p>
            Number of Rows Displayed: {" "}
            <input type="text" value={this.state.rows}
                   onChange={e => {this.setState({ rows: e.target.value })}} />
          </p>
        </div>
        <p>
          <button className="waves-effect waves-light btn deep-purple darken-3" type="submit">Search</button>
        </p>
      </form>
          </div>
      </div>
        </div>

      <div className="col s12 m7 l7">
        <Tabs>
          <Tab label="Commit Objects" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
          <List>
            <Subheader>Commit Objects</Subheader>
            {commitObjs}
          </List>
          </Tab>

          <Tab label="Compare" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
            <div>
              <h2 style={styles.headline}>Compare Versions</h2>
                {compareObjs}
            </div>
          </Tab>

          </Tabs>
      </div>
      </div>;
  }
}

SolrConnectorDemo.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SolrConnectorDemo;
