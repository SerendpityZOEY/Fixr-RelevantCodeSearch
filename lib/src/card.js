/**
 * Created by yue on 2/8/17.
 */
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';

const style = {
    cards:{
        padding:0,
        height:'100%',
        marginLeft:10,
        marginRight:10,
        display:'inline-block',
    }
};

class Cards extends React.Component{
    render(){
        console.log('commitObj', this.props.commit);
        var repo = this.props.commit.repo_sni;
        var msg = this.props.commit.c_subject_t;

        return <Card style={style.cards}>
            <CardHeader
                title={repo}
                subtitle={msg}
            />
        </Card>;
    }
}

export default Cards;