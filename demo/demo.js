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
import DropDownMenu from 'material-ui/DropDownMenu';

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
  },
  listItemAdded:{
    backgroundColor:'#c8e6c9'
  },
  listItemRemoved:{
    backgroundColor:'#ffccbc'
  },
  customWidth: {
      width: 200,
  },
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

    parseData: function(commit,field,token) {
        var rest = commit[field].toString().split(token);
        var restCommits=rest[0];
        for(var i=1;i<rest.length;i++){
            //TODO: parent imports contains the added/removed line
            restCommits += rest[i]+'\n';
        }
        return restCommits;
    },

    render(){
        var commit = this.props.commit;

        var field = this.props.queryImport; //field is 'imports'
        var repo=commit.repo_sni;
        var contents = this.parseData(commit,"c_contents_t","\n");
        //TODO: later field can be callsites
        /*
        if(!field.includes("added") && !field.includes("removed")){
            field = 'c_imports_added_t';
        }
        var query = this.props.data; //query is a particular import statement
        var importAdded = commit[field].toString();

        var importRemoved = commit[field.replace("added","removed")].toString();
        var linesAdded=null;
        var linesRemoved=null;
        var repo=commit.repo_sni;
        var action;

        var restCommits = this.parseData(commit,"p_imports_t"," ");

        var methods = this.parseData(commit,"c_methods_t"," ");

        var contents = this.parseData(commit,"c_contents_t","\n");
        //TODO: Simplify Code
        if(importAdded.includes(query) && !importRemoved.includes(query)){
            linesAdded = commit[field];
            linesRemoved = commit[field.replace("added","removed")];
            action = "ADD";
        }else if(!importAdded.includes(query) && importRemoved.includes(query)){
            linesAdded = commit[field];
            linesRemoved = commit[field.replace("added","removed")];
            action = "REMOVE";
        }else if(importAdded.includes(query) && importRemoved.includes(query)){
            linesAdded = commit[field];
            linesRemoved = commit[field.replace("added","removed")];
        }
        else{
            return null;
        }
        */
        return(
            <div>
                <ListItem
                    primaryText={repo}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                        <ListItem
                            key={0}
                            primaryText={contents.split("\n").map(i => {
                                return <div>{i}</div>;
                            })}
                        />,
                    ]}
                />
            </div>
        )
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
      rows: 10,
      //newly added
      queryImport:"", //value get from checkbox
      importEntered:"",

      queryCallsites:"", //value get from checkbox
      callsite:"", //input of callsites

      queryMethods:"", //value get from checkbox
      callsiteAction: "all"
    }
  }

  onSubmit(event) {
    event.preventDefault();
    /*
    ======================================================
    Parse query
    ======================================================
    */
    /*
    var initialQuery = this.state.query;

    var field = this.state.queryImport;
    var imports = this.state.query;
    var af=null, rf = null;
    if(field === 'imports'){
        af = 'c_imports_added_t';
        rf = 'c_imports_removed_t';
        initialQuery = af+':'+imports+' OR '+rf+':'+imports;
        //console.log(initialQuery)
    }
    //console.log('filter:',this.state.filter);
    */
    //TODO: Rephrase the query filter
    var initialFilter=[];
    if(this.state.queryImport === 'imports'){
        var importFl = 'c_imports_added_t:'+this.state.importEntered;
        importFl += ' OR c_imports_removed_t:'+this.state.importEntered;
        importFl += ' OR c_imports_t:'+this.state.importEntered;
        initialFilter.push(importFl);
    }
    if(this.state.queryMethods === 'methods'){
        switch(initialFilter){
            case null:
                initialFilter = 'c_methods_t:'+this.state.filter;
                break;
            default:
                initialFilter += ' AND c_methods_t:'+this.state.filter;
        }
    }
    if(this.state.queryCallsites === 'callsites'){
        switch(this.state.callsiteAction){
            case 'added':
                var callsiteFl = 'c_callsites_added_t:'+this.state.callsite;
                break;
            case 'removed':
                callsiteFl = 'c_callsites_removed_t:'+this.state.callsite;
                break;
            case 'modified':
                callsiteFl = 'c_callsites_added_t:'+this.state.callsite;
                callsiteFl += ' OR c_callsites_removed_t:'+this.state.callsite;
                break;
            default:
                callsiteFl = 'c_callsites_t:'+this.state.callsite;
                callsiteFl += ' OR c_callsites_added_t:'+this.state.callsite;
                callsiteFl += ' OR c_callsites_removed_t:'+this.state.callsite;
        }
        if(initialFilter==null) initialFilter = callsiteFl;
        else initialFilter.push(callsiteFl);
    }
    console.log('filter:',initialFilter);
    let searchParams = {
      solrSearchUrl: this.state.solrSearchUrl,
      query: this.state.query,
      filter: initialFilter,
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

  handleChange(event, index, value){
      event.preventDefault();
      this.setState({
          callsiteAction:value,
          queryCallsites: 'callsites',
      })
  };


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
          if(this.state.queryCallsites != "" || this.state.queryImport != "" || this.state.queryMethods != ""){
              var query = this.state.importEntered;
              var importsChecked = this.state.queryImport;

              tmpCommitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                  return <MyComponents.Added commit={s} data={query} key={i} queryImport={importsChecked}/>
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
                <input className="with-gap" name="group3" type="checkbox" id="imports" value="imports"
                       onChange={e => {this.setState({ queryImport: 'imports' })}}/>
                <label htmlFor="imports">Imports</label>
                &nbsp;&nbsp;
                <input className="with-gap" name="group3" type="checkbox" id="methods" value="methods"
                       onChange={e => {this.setState({ queryMethods: 'methods' })}}/>
                <label htmlFor="methods">Methods</label>
                <DropDownMenu value={this.state.callsiteAction} onChange={this.handleChange.bind(this)}>
                    <MenuItem value="all" primaryText="All Callsites" />
                    <MenuItem value="added" primaryText="Added" />
                    <MenuItem value="removed" primaryText="Removed" />
                    <MenuItem value="modified" primaryText="Modified" />
                </DropDownMenu>
          <p>
          query: {" "}
          <input type="text" value={this.state.query}
            onChange={e => {this.setState({ query: e.target.value })}} />
          {" "}
          </p>
          <p>
            imports(fq): {" "}
            <input type="text" value={this.state.importEntered}
            onChange={e => {this.setState({ importEntered: e.target.value })}} />
            {" "}
          </p>
          <p>
            callsites(fq): {" "}
            <input type="text" value={this.state.callsite}
              onChange={e => {this.setState({ callsite: e.target.value })}} />
            {" "}
          </p>

        </div>
        <div className="col s12 m12 l12">
        <p>
          method(fq): {" "}
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
              {tmpCommitObjs}
          </List>

          <div>
              {commitObjs}
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
