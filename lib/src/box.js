/**
 * Created by yue on 2/23/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import Graph from 'react-graph-vis';
import FlatButton from 'material-ui/FlatButton';
import {LineChart, Line} from 'recharts';

const style = {
    cards:{
        padding:-10,
        height:'100%',
        width:150,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:5,
        display:'inline-block',
    },
    cardText:{
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        height:110,
        fontSize: 12,
        overflowY:'auto',
        overflowX:'hidden',
        padding: 0
    },
    cardHeader:{
        fontSize:'0.3vw',
        height:30,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowY:'auto',
        overflowX:'hidden',
        paddingBottom:0
    }
};

const TinyLineChart = React.createClass({
    render () {
        return (
            <LineChart width={150} height={100} data={this.props.data}>
                <Line type='monotone' dataKey='freq' stroke='#8884d8' strokeWidth={2} />
            </LineChart>
        );
    }
});

class Box extends React.Component{
    render(){
        if(this.props.type=='trend') var obj = <TinyLineChart data={this.props.data}/>;
        else if(this.props.type=='graph') obj = <Graph graph={this.props.data} events={this.props.events} options={this.props.options}/>;
        return <Card style={style.cards}>
            <CardHeader
                title={this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)}
                style={style.cardHeader}
                titleStyle={{fontSize:10,}}
                textStyle={{paddingRight:0}}
            />
            <CardText style={style.cardText}>{obj}</CardText>
            <CardActions>
                <FlatButton label="Detail" style={{minWidth:8, paddingTop:0, height:30}} labelStyle={{fontSize:12}} onClick={() => this.props.handleChange(this.props.data, this.props.type)}/>
                <FlatButton label="Fix" style={{minWidth:8, paddingTop:0, height:30}} labelStyle={{fontSize:12}}/>
            </CardActions>
        </Card>
    }
}

export default Box;