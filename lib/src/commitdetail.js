/**
 * Created by yue on 2/8/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem, NestedList} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import DetailCard from './detailcard.js';

class CommitDetail extends React.Component{

    handleClick(){
        this.props.closeDetail();
    };

    render(){
        var commit = this.props.content;
        if(commit!=null){
            var msg = commit.c_subject_t;
        }else{
            msg = "msg";
        }

        return <Card style={{padding:0,position:'relative', height:'25vw',marginTop:10}}>
            <IconButton iconClassName="fa fa-times fa-lg" style={{position:'absolute',zIndex:1, top:0, right:0,}}
                        iconStyle={{fontSize:15, color:'#000'}} onClick={() => this.handleClick()}/>
            <CardText style={{height:'24vw', overflow:'auto'}}
            >
                <List>
                <DetailCard commit={commit} importEntered={this.props.importEntered} methodEntered={this.props.methodEntered}
                            onAddBtnClick={this.props.onAddBtnClick.bind(this)} newCode={this.props.newCode}
                            lastAction={this.props.lastAction} lineNum={this.props.lineNum}
                />
                </List>
            </CardText>
        </Card>;
    }
}

export default CommitDetail;