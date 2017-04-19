/**
 * Created by yue on 2/16/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import Graph from 'react-graph-vis';
import IconButton from 'material-ui/IconButton';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {List, ListItem, NestedList} from 'material-ui/List';

const styles = {
    codeSnippet: {
        fontFamily: "Fira Mono",
        fontSize: 14
    },
}

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
                zoomView: true,
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
                    prev = this_2.props.onAddBtnClick(removeUnused(this_2.props.newCode)+'\n'+'//'+label.substr(0).trim());
                }
                console.log('prev', prev)
                //var prevandnewline = this_2.props.newCode+'\n'+'=>'+label;
                //this_2.props.onAddBtnClick(prevandnewline);
            },
        }

        function removeUnused(prevCode){
            var res = [];
            prevCode.split('\n').forEach( function (line, index){
                console.log('line', line);
                if(line.substr(0,2)!='//')
                    res.push(line)
            });
            return res.join("\n").substr(-1)==='\n'? res.join("\n").slice(0,-1):res.join("\n");
        }

        return <Card style={{padding:0,position:'relative', height:'30vw',marginTop:10}}>
            <IconButton iconClassName="fa fa-times fa-lg" style={{position:'absolute',zIndex:1, top:0, right:0,}}
                        iconStyle={{fontSize:15, color:'#000'}} onClick={() => this.props.closeDetail()}/>
            <CardHeader
                title={'Groum'}
                style={{height:'1vw'}}
            />
            <CardText style={{height:'27vw', overflow:'auto'}}>
                <Graph graph={this.props.content} options={options} events={events} />
            </CardText>
        </Card>
    }
}

export default GraphCard;