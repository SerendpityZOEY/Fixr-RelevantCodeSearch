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
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import Firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyBTxRaCbvs9DWTJJ-BahjO7Fxo9F37Omz8",
    authDomain: "solrsearch-85a9e.firebaseapp.com",
    databaseURL: "https://solrsearch-85a9e.firebaseio.com/",
};
Firebase.initializeApp(config);

// Get a reference to the database service
var database = Firebase.database();

MyComponents.Detail = React.createClass({

    compute: function(c_commit, p_commit) {
        console.log('Pretend %s is animating', this.props.title);
        var c_values = c_commit.split('T');
        var p_values = p_commit.split('T');
        var c_date = c_values[0];
        var c_time = c_values[1];
        var p_date = p_values[0];
        var p_time = p_values[1];

        var c_first = c_date.split('-');
        var c_second = c_time.split(':');
        var p_first = p_date.split('-');
        var p_second = p_time.split(':');
        var year = c_first[0]-p_first[0];
        var month = c_first[1]-p_first[1];
        var day = c_first[2]-p_first[2];
        var hour = c_second[0]-p_second[0];
        if(year!=0){
            database.ref('year').push({
                c_commit: c_commit,
                p_commit: p_commit
            });
        }else if(month!=0){
            database.ref('month').push({
                c_commit: c_commit,
                p_commit: p_commit
            });
        }else if(day!=0){
            database.ref('day').push({
                c_commit: c_commit,
                p_commit: p_commit
            });
        }else{
            database.ref('less').push({
                c_commit: c_commit,
                p_commit: p_commit
            });
        }
    },

    render: function() {
        return (
            <div>
            {this.compute(this.props.commit.c_date_tdt, this.props.commit.p_date_tdt)}
            <ListItem
                primaryText={this.props.commit._version_}
                leftIcon={<ContentInbox />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={0}
                        primaryText={"c : " + this.props.commit.c_date_tdt}
                    />,
                    <ListItem
                        key={1}
                        primaryText={"p : " + this.props.commit.p_date_tdt}
                    />,
                ]}
            />
            </div>
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

class SearchResultStats extends React.Component {
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
        let searchParams = {
            solrSearchUrl: this.state.solrSearchUrl,
            query: this.state.query,
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

    render() {

        var commitObjs;
        var allFields=[];
        var numFound=0;
        if(this.props.solrConnector.response!=null){
            console.log('see',this.props.solrConnector.response.response.docs);

            numFound = this.props.solrConnector.response.response.numFound;
            var fieldsArray = Object.keys(this.props.solrConnector.response.response.docs[0]);

            if(this.state.fetchFields.length!=0){
                var objs = this.props.solrConnector.response.response.docs;
                commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                    return <MyComponents.List commit={s} key={i}/>
                });
            }else if(this.state.fetchFields.length==0){
                commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                    return <MyComponents.Detail commit={s} key={i}/>
                });
            }

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
        }

        database.ref('year').on("value", function(snap) {
            localStorage.setItem('year', JSON.stringify(snap.numChildren()))
        });
        database.ref('month').on("value", function(snap) {
            localStorage.setItem('month', JSON.stringify(snap.numChildren()))
        });
        database.ref('day').on("value", function(snap) {
            localStorage.setItem('day', JSON.stringify(snap.numChildren()))
        });
        database.ref('less').on("value", function(snap) {
            localStorage.setItem('hour', JSON.stringify(snap.numChildren()))
        });

        var year=JSON.parse(localStorage.getItem('year'));
        var month=JSON.parse(localStorage.getItem('month'));
        var day=JSON.parse(localStorage.getItem('day'));
        var hour=JSON.parse(localStorage.getItem('hour'));


        var newdata = [
            {name:'Yearly', num: year},
            {name:'Monthly', num:month},
            {name:'Daily', num:day},
            {name:'Hourly',num:hour}
        ];
        console.log(newdata)
        database.ref('year').remove();
        database.ref('month').remove();
        database.ref('day').remove();
        database.ref('less').remove();

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
                    </Tab>

                    <Tab label="Compare" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                        <BarChart width={600} height={300} data={newdata}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="num" fill="#8884d8" />
                        </BarChart>
                    </Tab>
                </Tabs>
            </div>
        </div>;
    }
}

SearchResultStats.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default SearchResultStats;
