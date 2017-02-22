/**
 * Created by yue on 11/6/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Diff from './diff.js';
import CommitList from './list.js';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import CommitDetail from './commitdetail.js';

import Editor from './editor.js';
import NewRound from './newround.js';
import GraphCard from './graphcard.js';

class Visualize extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            hiddenCard: true,
            inputList: [],
            initialCode:this.props.initialCode,
            newCode:"",
            type:""
        }
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.getPrevEditorCode = this.getPrevEditorCode.bind(this);
    }

    onAddBtnClick(val) {
        console.log('select', val)
        const tmp = <NewRound key={this.state.inputList.length} initialCode={val}/>
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(tmp),
            initialCode: val
        });
    }

    getPrevEditorCode(code){
        this.setState({newCode:code})
    }

    showDetail(content, type) {
        if(type=='graph'){
            this.setState({
                content:content,
                hiddenCard:false,
                type:'graph'
            })
        }else{
            this.setState({
                content:content,
                hiddenCard:false,
                type:'commit'
            })
        }
    }

    render(){
        var importEntered = []
        var callsite = [];

        //Parse query was at here, this part would rendered twice to display new results,
        // first results was previous one; It doesn't affect usage for now. Just log the behavior in case.
        var numFound=0;
        var CommitObjs;
        var commitList;

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
            //Send all commits into list.js
            commitList = this.props.solrConnector.response.response.docs;

        }else{
            CommitObjs = null;
            commitList = null;
        }

        if(this.state.hiddenCard) var commitDetail = null;
        else if(this.state.type=='commit') commitDetail = <CommitDetail content={this.state.content} importEntered={query} methodEntered={callsite}
                                          onAddBtnClick={this.onAddBtnClick.bind(this)} newCode={this.state.newCode}
        />;
        else commitDetail = <GraphCard content={this.state.content} onAddBtnClick={this.onAddBtnClick.bind(this)}
                                       newCode={this.state.newCode}
            />;

        return <Grid>
        <Row>
        <Col xs={12} md={4} lg={4}>
        <Editor doSearch={this.props.doSearch.bind(this)} initialCode={this.state.initialCode}
                getPrevEditorCode={this.getPrevEditorCode.bind(this)}
        />
        </Col>
        <Col xs={12} md={8} lg={8}>
            <CommitList commits={commitList}
                        showDetail={this.showDetail.bind(this)} onAddBtnClick={this.onAddBtnClick.bind(this)}
                        newCode={this.state.newCode}
            />
        </Col>
        </Row>

        <Row>
        <Col xs={12} md={12} lg={12}>
            <Subheader>{numFound} results fetched.</Subheader>
            {commitDetail}
        </Col>
        </Row>
            {this.state.inputList}
        </Grid>
    }
}

export default Visualize;