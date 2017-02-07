import React from 'react';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
    cards:{
    padding:0,
    height:'100%',
    marginLeft:10,
    marginRight:10,
    display:'inline-block',
    }
};

class CommitList extends React.Component{
    render(){
        return <Paper style={style.paperstyle} zDepth={1}>
          <Card style={style.cards}>
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
            />
          </Card>

        <Card style={style.cards}>
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
            />
        </Card>
        <Card style={style.cards}>
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
            />
        </Card>

        <Card style={style.cards}>
            <CardHeader
              title="Without Avatar"
              subtitle="Subtitle"
            />
        </Card>
        </Paper>
    }
}

export default CommitList;