/**
 * Created by yue on 11/6/16.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Compare from './compare.js';
import Diff from './diff.js';
import Contents from './contents.js';


class Visualize extends React.Component{

    render(){
        var importEntered = ""
        var callsite = [];
        //Parse the query
        if(this.props.solrConnector.searchParams!=null && this.props.solrConnector.searchParams.filter!=null){
            var filters = this.props.solrConnector.searchParams.filter;
            filters.forEach(function(item,index){
                if(item.includes('import')){
                    var token = item.split(' ')[0]
                    importEntered = token.substr(token.indexOf(':')+1)
                }
                if(item.includes('callsite')){
                    token = item.split(' ')[0]
                    callsite.push(token.substr(token.indexOf(':')+1))
                }
            })
        }
        var compareObjs;
        var numFound=0;

        var tmpCommitObjs;

        var commitContents;

        if(this.props.solrConnector.response!=null){

            numFound = this.props.solrConnector.response.response.numFound;
            var fieldsArray = Object.keys(this.props.solrConnector.response.response.docs[0]);


            //for diff.js
            var query = importEntered;//value from input
            var callsite = callsite;
            console.log('see',this.props.solrConnector.response.response.docs);

            tmpCommitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                return <Diff commit={s} data={query} key={i} callsite={callsite}
                />
            });
            //for contents.js
            //commitContents = this.props.solrConnector.response.response.docs.map(function(s,i){
            //    return <Contents commit={s} key={i} data={query} commitNum={i} selected={selected}/>
            //});
            commitContents = <Contents commit={this.props.solrConnector.response.response.docs} data={query}/>;

            compareObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                return <Compare commit={s} key={i}/>
            });

        }else{
            compareObjs = 'null';
            tmpCommitObjs = 'null';
        }

        var test ="var Pretty = React.createClass({"


        return <div className="row">
        <div className="col s12 m12 l12">
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
                        <Subheader>Code Snippet</Subheader>
                        {commitContents}
                </Tab>

            </Tabs>
        </div>
            </div>
    }
}

export default Visualize;