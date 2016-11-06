import React from 'react';
/*Material UI for collapsible list*/
import {List, ListItem} from 'material-ui/List';
/*Material UI for Tab*/
import {Tabs, Tab} from 'material-ui/Tabs';
/*Material UI for auto complete*/
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

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
};

class Searchpanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            solrSearchUrl: "http://192.12.243.133:8983/solr/fixr_delta/select",
            query: "*:*",
            filter: "",
            fetchFields: "",
            offset:0,
            rows: 10,
            //newly added
            importEntered:"",

            callsite:"", //input of callsites

            callsiteAction: "modified",
            importAction: "modified",

        }
    }

    onSubmit(event) {
        event.preventDefault();
        /*
         ======================================================
         Parse query
         ======================================================
         */
        //TODO: Rephrase the query filter
        var initialFilter=[];
        if(this.state.importEntered != ''){
            switch(this.state.importAction){
                case 'added':
                    var importFl = 'c_imports_added_t:'+this.state.importEntered;
                    break;
                case 'removed':
                    importFl = 'c_imports_removed_t:'+this.state.importEntered;
                    break;
                case 'all':
                    importFl = 'c_imports_t:'+this.state.importEntered;
                    importFl += ' OR c_imports_added_t:'+this.state.importEntered;
                    importFl += ' OR c_imports_removed_t:'+this.state.importEntered;
                    break;
                default:
                    importFl = 'c_imports_added_t:'+this.state.importEntered;
                    importFl += ' OR c_imports_removed_t:'+this.state.importEntered;
            }
            initialFilter.push(importFl);
        }

        if(this.state.callsite != ''){
            switch(this.state.callsiteAction){
                case 'added':
                    var callsiteFl = 'c_callsites_added_t:'+this.state.callsite;
                    break;
                case 'removed':
                    callsiteFl = 'c_callsites_removed_t:'+this.state.callsite;
                    break;
                case 'all':
                    callsiteFl = 'c_callsites_t:'+this.state.callsite;
                    callsiteFl += ' OR c_callsites_added_t:'+this.state.callsite;
                    callsiteFl += ' OR c_callsites_removed_t:'+this.state.callsite;
                    break;
                default:
                    callsiteFl = 'c_callsites_added_t:'+this.state.callsite;
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

    handleChange(event, index, value){
        event.preventDefault();
        this.setState({
            callsiteAction:value,
        })
    };

    handleimChange(event, index, value){
        this.setState({
            importAction:value,
        })
    };

    render(){
        return   <div className="row">
            <div className="col s12 m12 l12">
                <div className="row">
                        <form className="inputForm">
                            <h4>Search Parameters:</h4>

                            <div className="col s12 m12 l12">
                                Imports: {" "}
                                <DropDownMenu value={this.state.importAction} onChange={this.handleimChange.bind(this)} labelStyle={styles.customWidth}>
                                    <MenuItem value="modified" primaryText="Modified" />
                                    <MenuItem value="added" primaryText="Added" />
                                    <MenuItem value="removed" primaryText="Removed" />
                                    <MenuItem value="all" primaryText="All" />
                                </DropDownMenu>
                                <input type="text" value={this.state.importEntered}
                                       onChange={e => {this.setState({ importEntered: e.target.value })}} />
                            </div>

                            <div className="col s12 m12 l12">
                                Method Calls: {" "}
                                <DropDownMenu value={this.state.callsiteAction} onChange={this.handleChange.bind(this)} labelStyle={styles.customWidth}>
                                    <MenuItem value="modified" primaryText="Modified" />
                                    <MenuItem value="added" primaryText="Added" />
                                    <MenuItem value="removed" primaryText="Removed" />
                                    <MenuItem value="all" primaryText="All" />
                                </DropDownMenu>
                                <input type="text" value={this.state.callsite}
                                       onChange={e => {this.setState({ callsite: e.target.value })}} />
                            </div>

                            <div className="col s12 m12 l12">
                                <p>
                                    Raw Solr Query: {" "}
                                    <input type="text" value={this.state.query}
                                           onChange={e => {this.setState({ query: e.target.value })}} />
                                    {" "}
                                </p>
                            </div>

                            <div className="col s12 m12 l12">
                                Number of Rows Displayed(start, rows): {" "}
                                <div className="row">
                                <div className="col s12 m6 l6">
                                    <input type="text" value={this.state.offset}
                                           onChange={e => {this.setState({ offset: e.target.value })}} placeholder="start(0)"/>
                                </div>
                                <div className="col s12 m6 l6">
                                    <input type="text" value={this.state.rows}
                                           onChange={e => {this.setState({ rows: e.target.value })}} placeholder="rows(10)"/>
                                </div>
                                </div>
                            </div>


                            <div className="col s12 m12 l12">
                                <p>
                                    solrSearchUrl: {" "}
                                    <input type="text" value={this.state.solrSearchUrl}
                                           onChange={e => {this.setState({ solrSearchUrl: e.target.value })}} />
                                </p>
                            </div>

                            <p className="submit">
                                <button className="waves-effect waves-light btn deep-purple darken-3" type="submit" onClick={this.onSubmit.bind(this)}>Search</button>
                            </p>
                        </form>
                </div>
            </div>
        </div>;
    }
}

export default Searchpanel;