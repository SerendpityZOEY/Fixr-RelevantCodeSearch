import React from 'react';
/*Material UI for collapsible list*/
import {List, ListItem} from 'material-ui/List';

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
  customWidth: {
      paddingLeft: 9,
  },
  listItemAdded:{
    backgroundColor:'#c8e6c9'
  },
};

import Compare from './visualize.js';
import Diff from './diff.js';
import Detail from './detail.js';
import FieldList from './fieldlist.js';
import Contents from './contents.js';

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
      queryImport:"all", //value get from checkbox
      importEntered:"",

      queryCallsites:"", //value get from checkbox
      callsite:"", //input of callsites

      queryMethods:"", //value get from checkbox
      callsiteAction: "all",
      importAction: "all",
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
        switch(this.state.importAction){
            case 'added':
                var importFl = 'c_imports_added_t:'+this.state.importEntered;
                break;
            case 'removed':
                importFl = 'c_imports_removed_t:'+this.state.importEntered;
                break;
            case 'modified':
                importFl = 'c_imports_added_t:'+this.state.importEntered;
                importFl += ' OR c_imports_removed_t:'+this.state.importEntered;
                break;
            default:
                importFl = 'c_imports_t:'+this.state.importEntered;
                importFl += ' OR c_imports_added_t:'+this.state.importEntered;
                importFl += ' OR c_imports_removed_t:'+this.state.importEntered;
        }
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

  handleimChange(event, index, value){
      this.setState({
          importAction:value,
          queryImport: 'imports',
      })
  };


    render() {

    var commitObjs;
    var compareObjs;
    var allFields=[];
    var numFound=0;

    var tmpCommitObjs;

    var commitContents;

    if(this.props.solrConnector.response!=null){
      console.log('see',this.props.solrConnector.response.response.docs);

      numFound = this.props.solrConnector.response.response.numFound;
      var fieldsArray = Object.keys(this.props.solrConnector.response.response.docs[0]);

      //state.fetchFields is for fl parameters
      if(this.state.fetchFields.length!=0){
          //var objs = this.props.solrConnector.response.response.docs;
          commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
              return <FieldList commit={s} key={i}/>
          });

      }else if(this.state.fetchFields.length==0){
          //all fields commits, not used anymore
          //commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
          //    return <Detail commit={s} key={i}/>
          //});
          //for diff.js
          var query = this.state.importEntered;//value from input
          var importsChecked = this.state.queryImport;//value from checkbox
          var callsite = this.state.callsite;
          var queryCallsites = this.state.queryCallsites;

          tmpCommitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
              return <Diff commit={s} data={query} key={i} queryImport={importsChecked} callsite={callsite}
                           queryCallsites={queryCallsites}
              />
          });
          //for contents.js
          commitContents = this.props.solrConnector.response.response.docs.map(function(s,i){
              return <Contents commit={s} key={i} data={query}/>
          });
      }

      compareObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <Compare commit={s} key={i}/>
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
            <span>
            <DropDownMenu value={this.state.importAction} onChange={this.handleimChange.bind(this)} labelStyle={styles.customWidth}>
                <MenuItem value="all" primaryText="All Imports" />
                <MenuItem value="added" primaryText="Added" />
                <MenuItem value="removed" primaryText="Removed" />
                <MenuItem value="modified" primaryText="Modified" />
            </DropDownMenu>
            <input className="with-gap" name="group3" type="checkbox" id="methods" value="methods"
                   onChange={e => {this.setState({ queryMethods: 'methods' })}}/>
            <label htmlFor="methods">Methods</label>
            <DropDownMenu value={this.state.callsiteAction} onChange={this.handleChange.bind(this)} labelStyle={styles.customWidth}>
                <MenuItem value="all" primaryText="All Callsites" />
                <MenuItem value="added" primaryText="Added" />
                <MenuItem value="removed" primaryText="Removed" />
                <MenuItem value="modified" primaryText="Modified" />
            </DropDownMenu>
                </span>
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

          </Tab>

          <Tab label="Compare" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
            <div>
                <Subheader>Compare Versions</Subheader>
                {compareObjs}
            </div>
          </Tab>

          <Tab label="Source Code" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
              <div>
                  <Subheader>Code Snippet</Subheader>
                  {commitContents}
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
