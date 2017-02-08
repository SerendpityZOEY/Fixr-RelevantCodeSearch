/**
 * Created by yue on 2/8/17.
 */
import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
    cards:{
        padding:0,
        height:'100%',
        marginLeft: 10,
        marginRight: 10,
        display:'inline-block',
    }
};

class Cards extends React.Component{

    handleChange(index){
        console.log('click',index)
        this.props.showDetail(index);
    };

    render(){
        var CommitObjs;
        CommitObjs = this.props.commit.map(function(s,i){
            var repo = s.repo_sni;
            var msg = s.c_subject_t;
            return <Card style={style.cards} key={i}>
                <CardHeader
                    title={repo}
                    subtitle={msg}
                />
                <CardActions>
                    <FlatButton label="View Detail" onClick={() => this.handleChange(s)}/>
                </CardActions>
            </Card>
        }, this);
        return <div style={style.cards}>{CommitObjs}</div>;
    }
}

export default Cards;