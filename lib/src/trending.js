/**
 * Created by yue on 2/23/17.
 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

class Trending extends React.Component{

    render() {
        return (
            <Card style={{padding:0,position:'relative', height:'25vw',marginTop:10}}>
                <IconButton iconClassName="fa fa-times fa-lg" style={{position:'absolute',zIndex:1, top:0, right:0,}}
                            iconStyle={{fontSize:15, color:'#000'}} onClick={() => this.props.closeDetail()}/>
                <CardHeader
                    title={'Trending Analysis'}
                    style={{height:'1vw'}}
                />
                <CardText style={{height:'22vw', overflow:'auto'}}>
                    <LineChart width={800} height={300} data={this.props.data}
                               margin={{top: 5, right: 50, left: 100, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="freq" stroke="#8884d8" activeDot={{r: 8}}/>
                    </LineChart>
                </CardText>
            </Card>
        );
    }
};

export default Trending;