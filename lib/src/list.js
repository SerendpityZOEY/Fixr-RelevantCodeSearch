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
        var commit = this.props.commits;
        var CommitObjs;
        console.log(commit)

        CommitObjs = commit.map(function(s,i){
            return <Cards commit={s}
            />
        });

        return <Paper style={style.paperstyle} zDepth={1}>
            {CommitObjs}
        </Paper>
    }
}

export default CommitList;