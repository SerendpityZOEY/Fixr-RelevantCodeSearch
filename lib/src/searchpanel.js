import React from 'react';
/*Material UI for collapsible list*/
import {List, ListItem} from 'material-ui/List';
/*Material UI for Tab*/
import {Tabs, Tab} from 'material-ui/Tabs';
/*Material UI for auto complete*/
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

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

class MethodInput extends React.Component {

    //this is a local var for updating action only
    constructor(props) {
        super(props);
        this.state = {
            callsiteAction:"modified",
        }

    }

    dropdownHandler(event, index, value) {
        event.preventDefault();
        this.setState({callsiteAction:value});
        this.props.onChange(value, index, 'method');
    };

    render() {
        return <div>
            {this.props.index+2} Method Calls:
            <DropDownMenu value={this.state.callsiteAction} onChange={this.dropdownHandler.bind(this)} labelStyle={styles.customWidth}>
                <MenuItem value="modified" primaryText="Modified" />
                <MenuItem value="added" primaryText="Added" />
                <MenuItem value="removed" primaryText="Removed" />
                <MenuItem value="all" primaryText="All" />
            </DropDownMenu>
            <input type="text" name={ `document-${ this.props.index }-document` }
                   onChange={this.props.InputonChange}/>
        </div>
    }
}

class ImportInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importAction:"modified",
        }
    }

    dropdownHandler(event, index, value) {
        event.preventDefault();
        this.setState({importAction:value});
        this.props.onChange(value, index);
    };

    render() {
        return <div>
            {this.props.index+2} Imports:
            <DropDownMenu value={this.state.importAction} onChange={this.dropdownHandler.bind(this)} labelStyle={styles.customWidth}>
                <MenuItem value="modified" primaryText="Modified" />
                <MenuItem value="added" primaryText="Added" />
                <MenuItem value="removed" primaryText="Removed" />
                <MenuItem value="all" primaryText="All" />
            </DropDownMenu>
            <input type="text" name={ `document-${ this.props.index }-document` }
                   onChange={this.props.ImportsonChange}/>
        </div>
    }
}

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
            callsiteEntered:"", //input of callsites

            callsiteAction: "modified",
            importAction: "modified",

            dynamicInputs: [],
            tmpcallsite:"",
            tmpcallsiteAction:"",

            dynamicImportInputs:[],
            tmpimport:"",
            tmpimportAction:"",
        }

        //this is allow function to access state value, since onclick don't support bind this
        this.addInput = this.addInput.bind(this);
        this.removeInput = this.removeInput.bind(this);

        this.addImport = this.addImport.bind(this);
        this.removeImport = this.removeImport.bind(this);

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

        if(this.state.callsiteEntered != ''){
            switch(this.state.callsiteAction){
                case 'added':
                    var callsiteFl = 'c_callsites_added_t:'+this.state.callsiteEntered;
                    break;
                case 'removed':
                    callsiteFl = 'c_callsites_removed_t:'+this.state.callsiteEntered;
                    break;
                case 'all':
                    callsiteFl = 'c_callsites_t:'+this.state.callsiteEntered;
                    callsiteFl += ' OR c_callsites_added_t:'+this.state.callsiteEntered;
                    callsiteFl += ' OR c_callsites_removed_t:'+this.state.callsiteEntered;
                    break;
                default:
                    callsiteFl = 'c_callsites_added_t:'+this.state.callsiteEntered;
                    callsiteFl += ' OR c_callsites_removed_t:'+this.state.callsiteEntered;
            }
            if(initialFilter==null) initialFilter = callsiteFl;
            else initialFilter.push(callsiteFl);
        }
        /*
         ======================================================
         Process additional method query
         ======================================================
         */
        for(var key in this.state.tmpcallsite){
            var action = this.state.tmpcallsiteAction[key];
            var extraMethods = methodQuery(this.state.tmpcallsite[key], action);
            initialFilter.push(extraMethods);
        }

        for(var key in this.state.tmpimport){
            var action = this.state.tmpimportAction[key];
            var extraImports = importQuery(this.state.tmpimport[key], action);
            initialFilter.push(extraImports);
        }
        console.log('filter:',initialFilter);

        function methodQuery(methodCall, action){
            if(action==undefined) action='modified';
            console.log(methodCall, action)
            switch(action){
                case 'added':
                    var callsiteFl = 'c_callsites_added_t:'+methodCall;
                    break;
                case 'removed':
                    callsiteFl = 'c_callsites_removed_t:'+methodCall;
                    break;
                case 'all':
                    callsiteFl = 'c_callsites_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_added_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_removed_t:'+methodCall;
                    break;
                default:
                    callsiteFl = 'c_callsites_added_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_removed_t:'+methodCall;
            }
            return callsiteFl;
        }

        function importQuery(importStatement, action){
            if(action==undefined) action='modified';
            switch(action){
                case 'added':
                    var importsFl = 'c_imports_added_t:'+importStatement;
                    break;
                case 'removed':
                    importsFl = 'c_imports_removed_t:'+importStatement;
                    break;
                case 'all':
                    importsFl = 'c_imports_t:'+importStatement;
                    importsFl += ' OR c_imports_added_t:'+importStatement;
                    importsFl += ' OR c_imports_removed_t:'+importStatement;
                    break;
                default:
                    importsFl = 'c_imports_added_t:'+importStatement;
                    importsFl += ' OR c_imports_removed_t:'+importStatement;
            }
            return importsFl;
        }

        this.state.query = '*:*';

        let searchParams = {
            solrSearchUrl: this.state.solrSearchUrl,
            query: this.state.query,
            filter: initialFilter,
            fetchFields: this.state.fetchFields.split(" "),
            offset: this.state.offset,
            limit: this.state.rows-this.state.offset,
            highlightParams: {
                "hl": "true",
                "hl.fl": "name manu",
                "hl.snippets": 1,
                "hl.fragsize": 500
            }
        };

        this.props.doSearch(searchParams);
        if(initialFilter.length!=0)
            this.recoverQuery(initialFilter);
    }

    recoverQuery(filters){
        var result='';
        for(var i=0;i<filters.length;i++){
            result+='(';
            result+=filters[i];
            result+=') AND ';
        }
        result = result.slice(0,-5)
        this.setState({query:result})
    }

    /*
    Useless code for auto complete
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
    */

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

    /*
     ======================================================
     Dynamic Fields
     ======================================================
     */
    addInput(){
        const dynamicInputs = this.state.dynamicInputs.concat(MethodInput);
        console.log(dynamicInputs);
        this.setState({ dynamicInputs });
    };

    removeInput(){
        const dynamicInputs = this.state.dynamicInputs;
        var cutted = dynamicInputs.splice(-1,1);
        //remove callsite from state var
        console.log('callsite',this.state.tmpcallsite)
        var size = Object.keys(this.state.tmpcallsite).length;
        delete this.state.tmpcallsite[size-1];
        this.setState({ dynamicInputs });
    };

    addImport(){
        const dynamicImportInputs = this.state.dynamicImportInputs.concat(ImportInput);
        this.setState({ dynamicImportInputs });
    }

    removeImport(){
        const dynamicImportInputs = this.state.dynamicImportInputs;
        var cutted = dynamicImportInputs.splice(-1,1);
        var size = Object.keys(this.state.tmpimport).length;
        delete this.state.tmpimport[size-1]
        this.setState({ dynamicImportInputs });
    }

    inputChangeHandler(event, index) {
        console.log('index1',index)
        var stateObject = function() {
            var returnObj = {};
            returnObj[index] = this.target.value;
            return returnObj;
        }.bind(event)();
        var prev = this.state.tmpcallsite
        this.setState({tmpcallsite:jQuery.extend(prev,stateObject)});
    };

    importChangeHandler(event, index) {
        var stateObject = function() {
            var returnObj = {};
            returnObj[index] = this.target.value;
            return returnObj;
        }.bind(event)();
        var prev = this.state.tmpimport;
        this.setState({tmpimport:jQuery.extend(prev,stateObject)});
    };

    dropdownHandler(value, index, type) {
        event.preventDefault();
        if(type=='method'){
            var prev = this.state.tmpcallsiteAction;
            var curr = {[index]:value};
            this.setState({tmpcallsiteAction:jQuery.extend(prev,curr)});
        }else if(type=='import'){
            prev = this.state.tmpimportAction;
            curr = {[index]:value};
            this.setState({tmpimportAction:jQuery.extend(prev,curr)});
        }

    };

    render(){
        const dynamicInputs = this.state.dynamicInputs.map((Element, index) => {
            return <Element key={ index } index={ index } InputonChange={e => {this.inputChangeHandler(e, index)}}
                    onChange={e =>{this.dropdownHandler(e, index, 'method')}}/>
        });

        const dynamicImportInputs = this.state.dynamicImportInputs.map((Element, index) => {
            return <Element key={index} index={index} ImportsonChange={e => {this.importChangeHandler(e, index)}}
                            onChange={e =>{this.dropdownHandler(e, index, 'import')}}/>
        });

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
                                <IconButton onClick={this.addImport} iconStyle={{fontSize:14, fontWeight:100}}>
                                    <FontIcon className="fa fa-plus"/>
                                </IconButton>
                                <IconButton onClick={this.removeImport} iconStyle={{fontSize:14, fontWeight:100}}>
                                    <FontIcon className="fa fa-minus"/>
                                </IconButton>
                                <input type="text" value={this.state.importEntered}
                                       onChange={e => {this.setState({ importEntered: e.target.value })}} />
                                <div className="imports">
                                    { dynamicImportInputs }
                                </div>
                            </div>

                            <div className="col s12 m12 l12">
                                Method Calls: {" "}
                                <DropDownMenu value={this.state.callsiteAction} onChange={this.handleChange.bind(this)} labelStyle={styles.customWidth}>
                                    <MenuItem value="modified" primaryText="Modified" />
                                    <MenuItem value="added" primaryText="Added" />
                                    <MenuItem value="removed" primaryText="Removed" />
                                    <MenuItem value="all" primaryText="All" />
                                </DropDownMenu>
                                <IconButton onClick={this.addInput} iconStyle={{fontSize:14, fontWeight:100}}>
                                    <FontIcon className="fa fa-plus"/>
                                </IconButton>
                                <IconButton onClick={this.removeInput} iconStyle={{fontSize:14, fontWeight:100}}>
                                    <FontIcon className="fa fa-minus"/>
                                </IconButton>
                                <input type="text" value={this.state.callsiteEntered}
                                       onChange={e => {this.setState({ callsiteEntered: e.target.value })}} />
                                <div className="inputs">
                                    { dynamicInputs }
                                </div>
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

                                <div className="row">
                                <div className="col s12 m6 l6">
                                    Index ranging from:
                                    <input type="text" value={this.state.offset}
                                           onChange={e => {this.setState({ offset: e.target.value })}} placeholder="start(0)"/>
                                </div>
                                <div className="col s12 m6 l6">
                                    to:
                                    <input type="text" value={this.state.rows}
                                           onChange={e => {this.setState({ rows: e.target.value })}} placeholder="end(10)"/>
                                </div>
                                </div>
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