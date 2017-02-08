/**
 * Created by yue on 2/8/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const style = {
    cards:{
        padding:0,
        height:300,
        width:300,
        marginLeft: 10,
        marginRight: 10,
    }
};

class CommitDetail extends React.Component{
    render(){
        console.log(this.props.content)
        if(this.props.content!=null){
            var repo = this.props.content.repo_sni;
            var msg = this.props.content.c_subject_t;
        }else{
            repo = "repo";
            msg = "msg";
        }


        return <Card style={style.cards}>
            <CardHeader
                title={repo}
                subtitle={msg}
            />
        </Card>;
    }
}

export default CommitDetail;