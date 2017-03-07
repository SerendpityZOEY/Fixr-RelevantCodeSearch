/**
 * Created by yue on 11/6/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import CommitList from './list.js';
import CommitDetail from './commitdetail.js';
import Editor from './editor.js';
import NewRound from './newround.js';
import GraphCard from './graphcard.js';
import Trending from './trending.js';

class Visualize extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            hiddenCard: true,
            inputList: [],
            initialCode:this.props.initialCode,
            newCode:"",
            type:"",
            index:0
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    }

    onAddBtnClick(val, multiSelection) {
        console.log('val from visualize', val);
        const inputList = this.state.inputList;
        if(multiSelection=='on'){
            inputList.pop();
        }
        const tmp = <NewRound key={this.state.index} initialCode={val}/>; //This is not an ideal solution
        this.setState({
            inputList: inputList.concat(tmp),
            initialCode: val,
            newCode: val,
            index: this.state.index+1
        });
    }

    //Pass code from cur editor to the next(to be created)
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
        }else if(type=='commit'){
            this.setState({
                content:content,
                hiddenCard:false,
                type:'commit'
            })
        }else{
            this.setState({
                content:content,
                hiddenCard:false,
                type:'trend'
            })
        }
    }

    closeDetail() {
        this.setState({
            hiddenCard:true,
        })
    }

    render(){
        var importEntered = [];
        var callsite = [];

        //Parse query was at here, this part would rendered twice to display new results,
        // first results was previous one; It doesn't affect usage for now. Just log the behavior in case.
        var numFound=0;
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

            var query = importEntered;//value from input
            console.log('see',this.props.solrConnector.response.response.docs);
            //console.log('newCode from visualize', this.state.newCode);
            //console.log('initialCode from visualize', this.state.initialCode);

            //Send all commits into list.js
            commitList = this.props.solrConnector.response.response.docs;

        }else{
            commitList = null;
        }

        if(this.state.hiddenCard) var commitDetail = null;
        else if(this.state.type=='commit') commitDetail = <CommitDetail content={this.state.content} importEntered={query} methodEntered={callsite}
                                          onAddBtnClick={this.onAddBtnClick.bind(this)} newCode={this.state.newCode}
                                          closeDetail={this.closeDetail.bind(this)}
        />;
        else if(this.state.type=='graph')commitDetail = <GraphCard content={this.state.content} onAddBtnClick={this.onAddBtnClick.bind(this)}
                                       newCode={this.state.newCode} closeDetail={this.closeDetail.bind(this)}
            />;
        else commitDetail = <Trending data={this.state.content} closeDetail={this.closeDetail.bind(this)}/>;

        return <Grid style={{marginRight:0, width:'96vw'}}>
        <Row>
        <Col xs={12} md={4} lg={4}>
        <Editor doSearch={this.props.doSearch.bind(this)} initialCode={this.state.initialCode}
                getPrevEditorCode={this.getPrevEditorCode.bind(this)}
        />
        </Col>
        <Col xs={12} md={8} lg={8}>
            <CommitList commits={commitList}
                        showDetail={this.showDetail.bind(this)} onAddBtnClick={this.onAddBtnClick.bind(this)}
                        newCode={this.state.newCode} initialCode={this.state.initialCode}
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