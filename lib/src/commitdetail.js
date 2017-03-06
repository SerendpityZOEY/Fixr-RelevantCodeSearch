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
            var repo = commit.repo_sni.split('/')[1];
            var user = commit.repo_sni.split('/')[0];
        }else{
            repo = "repo";
            msg = "msg";
            user = "user";
        }

        return <Card style={{padding:0,position:'relative'}}>
            <IconButton iconClassName="fa fa-times fa-lg" style={{position:'absolute',zIndex:1, top:0, right:0,}}
                        iconStyle={{fontSize:15, color:'#000'}} onClick={() => this.handleClick()}/>
            <CardHeader
                title={repo}
                subtitle={user}
                avatar={"https://github.com/"+user+".png"}
            />
            <CardText>
                <List>
                <DetailCard commit={commit} importEntered={this.props.importEntered} methodEntered={this.props.methodEntered}
                            onAddBtnClick={this.props.onAddBtnClick.bind(this)} newCode={this.props.newCode}
                />
                </List>
            </CardText>
        </Card>;
    }
}

export default CommitDetail;