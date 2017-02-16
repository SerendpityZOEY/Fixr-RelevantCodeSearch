/**
 * Created by yue on 2/16/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Graph from 'react-graph-vis';

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
};

class GraphCard extends React.Component{
    render(){
        var options = {
            autoResize: true,
            height: '100%',
            width: '150%',
            clickToUse: false,
            layout: {
                hierarchical: true,
                improvedLayout:true,
            },
            edges: {
                color: "#000000"
            },
            nodes: {
                size: 10,
            }
        };

        var events = {
            select: function(event) {
                var { nodes, edges } = event;
            }
        }
        return <Card>
            <CardHeader
                title={'Cluster'}
            />
            <CardText>
                <Graph graph={this.props.content} options={options} events={events} />
            </CardText>
        </Card>
    }
}

export default GraphCard;