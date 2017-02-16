import React from 'react';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Cards from './card.js';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import GraphCard from './graphcard.js';

const style = {
    paperstyle:{
        width: '100%',
        height:300,
        textAlign: 'left',
        padding: 10,
        overflowY:'auto',
        overflowX:'scroll',
        whiteSpace:'nowrap'
    },
};

class CommitList extends React.Component{
    render(){
        if(this.props.commits==null) var commit = null;
        else
            commit = <Cards commit={this.props.commits} showDetail={this.props.showDetail.bind(this)}
                            onAddBtnClick={this.props.onAddBtnClick.bind(this)}
                            newCode={this.props.newCode}
            />;

        return <Paper style={style.paperstyle} zDepth={1}>
                {commit}
            </Paper>
    }
}

export default CommitList;