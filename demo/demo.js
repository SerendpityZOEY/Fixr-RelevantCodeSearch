import React from 'react';
/*Material UI for collapsible list*/
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Subheader from 'material-ui/Subheader';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
/*Material UI for Tab*/
import {Tabs, Tab} from 'material-ui/Tabs';
/*Material UI for auto complete*/
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

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
        <th data-field="id">Props</th>
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

MyComponents.List = React.createClass({
    render(){
        var commit = this.props.commit;
        var fields = Object.keys(commit);

        return(

            <ListItem
                primaryText={'Click to view details'}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <div dangerouslySetInnerHTML={{__html: '<ul>'+
                    fields.map(function(result) {
                        return '<li>'+
                            '<p style="padding:10px;word-wrap: break-word;word-break: break-all;white-space: normal;">'+
                                '<b>'+result+':'+'</b>'+
                            commit[result]+'</p>'+'</li>';
                    })
                    +'</ul>'}} />
                ]}
            />
        )
    }
});

MyComponents.Added = React.createClass({
    render(){
        var commit = this.props.commit;
        //TODO
        var field = this.props.data.split(':')[0]
        if(!field.includes("added") && !field.includes("removed")){
            field = 'c_imports_added_t';
        }
        var query = this.props.data.split(':')[1]
        //console.log(commit[field].toString());
        var importAdded = commit[field].toString();

        var importRemoved = commit[field.replace("added","removed")].toString();
        var linesAdded=null;
        var linesRemoved=null;
        var version=commit._version_;
        var action;
        //TODO: Simplify Code
        if(importAdded.includes(query) && !importRemoved.includes(query)){
            linesAdded = commit[field];
            action = "ADD";
            return(
                <div>
                    <Subheader>{action}</Subheader>
                    <ListItem
                        primaryText={version}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={0}
                                primaryText={field + " : " + linesAdded}
                            />,
                        ]}
                    />
                </div>
            )
        }else if(!importAdded.includes(query) && importRemoved.includes(query)){
            linesRemoved = commit[field.replace("added","removed")];
            action = "REMOVE";
            return(
                <div>
                    <Subheader>{action}</Subheader>
                    <ListItem
                        primaryText={version}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={0}
                                primaryText={field.replace("added","removed") +" : " + linesRemoved}
                            />,
                        ]}
                    />
                </div>
            )
        }else if(importAdded.includes(query) && importRemoved.includes(query)){
            linesAdded = commit[field];
            linesRemoved = commit[field.replace("added","removed")];
            return(
                <div>
                    <Subheader>{action}</Subheader>
                    <ListItem
                        primaryText={version}
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={0}
                                primaryText={field + " : " + linesAdded}
                            />,
                            <ListItem
                                key={1}
                                primaryText={field.replace("added","removed") +" : " + linesRemoved}
                            />,
                        ]}
                    />
                </div>
            )
        }
        else{
            return null;
        }

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
      offset:0,
      rows: 10
    }
  }

  onSubmit(event) {
    event.preventDefault();
    //Parse query
    var initialQuery = this.state.query;
          var values = initialQuery.split(':');
          var field = values[0];
          var imports = values[1];
          var af=null, rf = null;
          if(field === 'imports'){
              af = 'c_imports_added_t';
              rf = 'c_imports_removed_t';
              initialQuery = af+':'+imports+' OR '+rf+':'+imports;
              console.log(initialQuery)
          }

    let searchParams = {
      solrSearchUrl: this.state.solrSearchUrl,
      query: initialQuery,
      filter: [this.state.filter],
      fetchFields: this.state.fetchFields.split(" "),
      offset: this.state.offset,
      limit: this.state.rows,
      highlightParams: {
        "hl": "true",
        "hl.fl": "name manu",
        "hl.snippets": 1,
        "hl.fragsize": 500
      }
    };
    this.props.doSearch(searchParams);
      this.Classify();
  }

  handleUpdateInput(value) {
      this.setState({
          fetchFields: value,
      });
  };

  handleNewRequest(value) {
      this.setState({
          fetchFields: value.text,
      });
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  //Test Classify
  Classify(){
      console.log("Test")
      //console.log(this.state.query)
  }

  render() {

    var commitObjs;
    var compareObjs;
    var allFields=[];
    var numFound=0;

    var tmpCommitObjs;

    if(this.props.solrConnector.response!=null){
      console.log('see',this.props.solrConnector.response.response.docs);

      numFound = this.props.solrConnector.response.response.numFound;
      var fieldsArray = Object.keys(this.props.solrConnector.response.response.docs[0]);

      //state.fetchFields is for fl parameters
      if(this.state.fetchFields.length!=0){
          //var objs = this.props.solrConnector.response.response.docs;
          commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
              return <MyComponents.List commit={s} key={i}/>
          });



      }else if(this.state.fetchFields.length==0){
          commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
              return <MyComponents.Detail commit={s} key={i}/>
          });

          if(this.state.query != '*:*'){
              var query = this.state.query;
              tmpCommitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                  return <MyComponents.Added commit={s} data={query} key={i}/>
              });
          }
      }

      compareObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <MyComponents.Compare commit={s} key={i}/>
      });

      fieldsArray.map(function(s,i){
          allFields.push({
              text: s,
              value:(
                  <MenuItem
                    primaryText={s}
                    secondaryText="&#9786;"
                  />
              )
          })
      });

    }else{
      commitObjs = 'null';
      compareObjs = 'null';
      tmpCommitObjs = 'null';
    }

    console.log(tmpCommitObjs)

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
          filter(fq): {" "}
          <input type="text" value={this.state.filter}
            onChange={e => {this.setState({ filter: e.target.value })}} />
        </p>
        </div>
        <div className="col s12 m12 l12">
           <p>
             fetchFields(fl): {" "}
             <input type="text" value={this.state.fetchFields}
              onChange={e => {this.setState({ fetchFields: e.target.value })}} />
           </p>
        </div>

        <div className="col s12 m12 l12">
            <AutoComplete
                hintText="Filter by Props"
                filter={AutoComplete.noFilter}
                dataSource={allFields}
                onUpdateInput={this.handleUpdateInput.bind(this)}
                onNewRequest={this.handleNewRequest.bind(this)}
            /><br />
        </div>

        <div className="col s12 m12 l12">
            Number of Rows Displayed(start, rows): {" "}
            <div className="col s12 m6 l6">
            <input type="text" value={this.state.offset}
                   onChange={e => {this.setState({ offset: e.target.value })}} placeholder="start(0)"/>
                </div>
            <div className="col s12 m6 l6">
            <input type="text" value={this.state.rows}
                   onChange={e => {this.setState({ rows: e.target.value })}} placeholder="rows(10)"/>
                </div>
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
          <List id="list">
            <Subheader>{numFound} results fetched.</Subheader>
            {commitObjs}
          </List>

          <div>
              {tmpCommitObjs}
          </div>

          </Tab>

          <Tab label="Compare" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
            <div>
                <Subheader>Compare Versions</Subheader>
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
