/**
 * Created by yue on 2/16/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Graph from 'react-graph-vis';
import IconButton from 'material-ui/IconButton';

class GraphCard extends React.Component{

    handleClick(){
        this.props.closeDetail();
    };

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
                    var prev = this_2.props.onAddBtnClick('//'+label.substr(0).trim());
                }else{
                    prev = this_2.props.onAddBtnClick(this_2.props.newCode+'\n'+'//'+label.substr(0).trim());
                }
                console.log('prev', prev)
                //var prevandnewline = this_2.props.newCode+'\n'+'=>'+label;
                //this_2.props.onAddBtnClick(prevandnewline);
            },
        }

        return <Card style={{padding:0,position:'relative', height:'25vw',marginTop:10}}>
            <IconButton iconClassName="fa fa-times fa-lg" style={{position:'absolute',zIndex:1, top:0, right:0,}}
                        iconStyle={{fontSize:15, color:'#000'}} onClick={() => this.handleClick()}/>
            <CardHeader
                title={'Cluster'}
                style={{height:'1vw'}}
            />
            <CardText style={{height:'22vw', overflow:'auto'}}>
                <Graph graph={this.props.content} options={options} events={events} />
            </CardText>
        </Card>
    }
}

export default GraphCard;