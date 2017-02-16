/**
 * Created by yue on 2/16/17.
 */
import React from 'react';
import Graph from 'react-graph-vis';

class Graphiso extends React.Component{
    render(){
        var graph = {
            nodes: [
                {id: 1, label: 'this := @this'},
                {id: 2, label: '$r0 = this.mDbHelper'},
                {id: 3, label: 'db = $r0.getWritableDatabase()'},
                {id: 4, label: 'db.beginTransaction()'},
                {id: 5, label: 'db.setTransactionSuccessful()'},
                {id: 6, label: 'db.endTransaction()'},
                {id: 7, label: 'return'}
            ],
            edges: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 3, to: 4},
                {from: 4, to: 5},
                {from: 5, to: 6},
                {from: 6, to: 7}
            ]
        };

        var options = {
            autoResize: true,
            height: '150',
            width: '150',
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

        return <Graph graph={graph} options={options} events={events} />;
    }
}

export default Graphiso;