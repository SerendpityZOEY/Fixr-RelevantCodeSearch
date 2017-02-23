/**
 * Created by yue on 2/23/17.
 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

class Trending extends React.Component{
    render() {
        console.log('data', this.props.data)
        return (
            <Card>
                <CardHeader
                    title={'Trending Analysis'}
                />
                <CardText>
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