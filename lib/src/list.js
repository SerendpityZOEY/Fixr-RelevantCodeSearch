import React from 'react';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Cards from './card.js';

const style = {
    paperstyle:{
        width: '100%',
        height:300,
        textAlign: 'left',
        padding: 10,
        overflowY:'auto',
        overflowX:'scroll',
        whiteSpace:'nowrap'
    }
};

class CommitList extends React.Component{
    render(){
        if(this.props.commits==null) var commit = null;
        else commit = <Cards commit={this.props.commits} showDetail={this.props.showDetail.bind(this)}/>;

        return <Paper style={style.paperstyle} zDepth={1}>
            {commit}
        </Paper>
    }
}

export default CommitList;