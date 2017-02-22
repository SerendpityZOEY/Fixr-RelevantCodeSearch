/**
 * Created by yue on 2/16/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Graph from 'react-graph-vis';

class GraphCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            node: ''
        }
    }

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
            },
        };

        var this_2 = this;

        var graph = {
            nodes : this_2.props.content.nodes,
            edges : this_2.props.content.edges,
        }

        var events = {
            select: function(event) {
                var { nodes, edges } = event;
                var label = graph.nodes[nodes].label;
                console.log('newCode', this_2.props.newCode);
                var prevandnewline = this_2.props.newCode+'\n'+label;
                this_2.props.onAddBtnClick(prevandnewline);
            },
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