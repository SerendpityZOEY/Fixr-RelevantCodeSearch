/**
 * Created by yue on 11/6/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Diff from './diff.js';
import CommitList from './list.js';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import Editor from './editor.js';

class Visualize extends React.Component{

    render(){
        var importEntered = []
        var callsite = [];

        //Parse query was at here, this part would rendered twice to display new results,
        // first results was previous one; It doesn't affect usage for now. Just log the behavior in case.
        var numFound=0;
        var CommitObjs;

        if(this.props.solrConnector.response!=null){

            //Parse the query
            if(this.props.solrConnector.searchParams!=null && this.props.solrConnector.searchParams.filter!=null){
                var filters = this.props.solrConnector.searchParams.filter;
                filters.forEach(function(item,index){
                    if(item.includes('import')){
                        var token = item.split(' ')[0];
                        //Fragment, FragmentManager would both satisfy search if no ; added
                        importEntered.push(token.substr(token.indexOf(':')+1)+';');
                        //importEntered = token.substr(token.indexOf(':')+1)
                    }
                    if(item.includes('callsite')){
                        token = item.split(' ')[0];
                        callsite.push(token.substr(token.indexOf(':')+1))
                    }
                })
            }

            numFound = this.props.solrConnector.response.response.numFound;

            //for diff.js
            var query = importEntered;//value from input
            var callsite = callsite;
            console.log('see',this.props.solrConnector.response.response.docs);

            CommitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
                return <Diff commit={s} data={query} key={i} callsite={callsite}
                />
            });

        }else{
            CommitObjs = null;
        }

        return <Grid>
        <Row>
        <Col xs={12} md={6} lg={6}>
        <Editor/>
        </Col>
        <Col xs={12} md={6} lg={6}>
        <CommitList/>
        </Col>
        </Row>
        <Row>
        <Col xs={12} md={12} lg={12}>
            <List>
                <Subheader>{numFound} results fetched.</Subheader>
                {CommitObjs}
            </List>
        </Col>    
        </Row>
        </Grid>
    }
}

export default Visualize;