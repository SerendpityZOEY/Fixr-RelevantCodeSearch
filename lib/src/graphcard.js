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
                improvedLayout:true,
                hierarchical: {
                    enabled:true,
                    levelSeparation: 100,
                    nodeSpacing: 170,
                    treeSpacing: 200,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'hubsize'   // hubsize, directed
                }
            },
            edges: {
                color: "#000000"
            },
            nodes: {
                size: 10,
            },
            interaction:{
                zoomView: false,
            }
        };

        var this_2 = this;

        var graph = {
            nodes : this_2.props.content.nodes,
            edges : this_2.props.content.edges,
        }

        var events = {
            select: function(event) {
                var { nodes, edges } = event;
                var label = graph.nodes[nodes-1].label;

                if(this_2.props.newCode.length==0){
                    var prev = this_2.props.onAddBtnClick('=>'+label.substr(0).trim());
                }else{
                    prev = this_2.props.onAddBtnClick(this_2.props.newCode+'\n'+'=>'+label.substr(0).trim());
                }
                console.log('prev', prev)
                //var prevandnewline = this_2.props.newCode+'\n'+'=>'+label;
                //this_2.props.onAddBtnClick(prevandnewline);
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