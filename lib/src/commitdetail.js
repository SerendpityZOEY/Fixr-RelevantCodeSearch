/**
 * Created by yue on 2/8/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem, NestedList} from 'material-ui/List';

import DetailCard from './detailcard.js';

class CommitDetail extends React.Component{
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


        return <Card>
            <CardHeader
                title={repo}
                subtitle={user}
                avatar={"https://github.com/"+user+".png"}
            />
            <CardText>
                <List>
                <DetailCard commit={commit} importEntered={this.props.importEntered} methodEntered={this.props.methodEntered}/>
                </List>
            </CardText>
        </Card>;
    }
}

export default CommitDetail;