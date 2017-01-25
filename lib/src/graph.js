import React from 'react';

class Graph extends React.Component{
    render(){
        return <div></div>
    }

    componentDidMount(){
        function showMessage(s) {
            console.log('select: ',s);
        }

        function diff(node1, node2) {
            var arr1=[], arr2=[];
            for(var i=0;i<node1.length;i++) arr1.push(node1[i].name);
            for(i=0;i<node2.length;i++) arr2.push(node2[i].name);

            var ret = [];
            for(var i in arr1) {
                if(arr2.indexOf( arr1[i] ) > -1){
                    node1[i]["color"] = "red";
                    node2[arr2.indexOf( arr1[i] )]["color"] = "red";
                    ret.push( arr1[i] );
                }
            }
            return ret;
        }

        var $ = go.GraphObject.make;

        var node1 = [
            { key: "1", name: "This:=@this", color:'red'},
            { key: "2", name: "$r0=this.mDbHelper"},
            { key: "3", name: "Db=$r0.getWritableDatabase()"},
            { key: "4", name: "Db.beginTransaction()"},
            { key: "5", name: "Db.setTransactionSuccessful()"},
            { key: "6", name: "Db.endTransaction()"},
            { key: "7", name: "return"}
        ];

        var link1 = [
            {from:"1", to:"2"},
            {from:"2", to:"3"},
            {from:"3", to:"4"},
            {from:"4", to:"5"},
            {from:"5", to:"6"},
            {from:"6", to:"7"}
        ];

        var node2 = [
            { key: "1", name: "This:=@this"},
            { key: "2", name: "$r0=this.mDbHelper"},
            { key: "3", name: "Db=$r0.getWritableDatabase()"},
            { key: "4", name: "Db.beginTransaction()"},
            { key: "5", name: "nop"},
            { key: "6", name: "label3:e:=@caughtexception"},
            { key: "7", name: "e.printStackTrace()"},
            { key: "8", name: "label4:db.endTransaction()"},
            { key: "9", name: "goto label6"},
            { key: "10", name: "label6: return"},

            { key: "11", name: "label1: db.setTransactionSuccessful()"},
            { key: "12", name: "label2: db.endTransaction()"},
            { key: "13", name: "goto label6"},

            { key: "14", name: "label5:l3:=@caughtexception"},
            { key: "15", name: "db.endTransaction()"},
            { key: "16", name: "throw l3"},

        ];

        var link2 = [
            { from: "1", to: "2" },
            { from: "2", to: "3" },
            { from: "3", to: "4" },
            { from: "4", to: "5" },
            { from: "5", to: "6" },
            { from: "6", to: "7" },
            { from: "7", to: "8" },
            { from: "8", to: "9" },
            { from: "9", to: "10" },

            { from: "5", to: "11" },
            { from: "11", to: "12" },
            { from: "12", to: "13" },
            { from: "13", to: "10" },

            { from: "5", to: "14" },
            { from: "14", to: "15" },
            { from: "15", to: "16" },
            { from: "16", to: "10" },

        ];

        var res = diff(node1, node2);

        if(this.props.version=="prev"){
            var myDiagram =
                $(go.Diagram, "myDiagramDiv",
                    {
                        initialContentAlignment: go.Spot.Center, // center Diagram contents
                        initialDocumentSpot: go.Spot.TopCenter,
                        initialViewportSpot: go.Spot.TopCenter,
                        initialAutoScale: go.Diagram.Uniform,
                        "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                        layout: $(go.LayeredDigraphLayout, // specify a Diagram.layout that arranges trees
                            { angle: 90, layerSpacing: 35 }),
                    });
            // the template we defined earlier
            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    $(go.Shape, "RoundedRectangle", { fill: "#44CCFF", strokeWidth: 2 },
                        // when this Part.isSelected changes value, change this Shape.fill value:
                        new go.Binding("fill", "isSelected", function(sel) {
                            if (sel) return "#cddc39"; else return "#44CCFF";
                        }).ofObject(""),// The object named "" is the root visual element, the Node itself
                        new go.Binding("stroke", "color")),
                    {
                        click: function(e, obj) { showMessage("Clicked on " + obj.part.data.name); },
                        selectionChanged: function(part) {
                            var shape = part.elt(0);
                            shape.fill = part.isSelected ? "#cddc39" : "#44CCFF";
                        }
                    },
                    $(go.TextBlock, "Default Text",
                        { margin: 12, stroke: "white", font: "16px sans-serif" },
                        new go.Binding("text", "name"))
                );

            // define a Link template that routes orthogonally, with no arrowhead
            myDiagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

            var model = $(go.GraphLinksModel);
            model.nodeDataArray = node1;

            model.linkDataArray = link1;
            myDiagram.model = model;
        }

        if(this.props.version=="curr"){

            var myDiagram2 =
                $(go.Diagram, "version2",
                    {
                        initialContentAlignment: go.Spot.Center, // center Diagram contents
                        initialDocumentSpot: go.Spot.TopCenter,
                        initialViewportSpot: go.Spot.TopCenter,
                        initialAutoScale: go.Diagram.Uniform,
                        "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                        layout: $(go.LayeredDigraphLayout, // specify a Diagram.layout that arranges trees
                            { angle: 90, layerSpacing: 35 }),
                    });

            // the template we defined earlier
            myDiagram2.nodeTemplate =
                $(go.Node, "Auto",
                    $(go.Shape, "RoundedRectangle", { fill: "#44CCFF", strokeWidth: 2 },
                        // when this Part.isSelected changes value, change this Shape.fill value:
                        new go.Binding("fill", "isSelected", function(sel) {
                            if (sel) return "#cddc39"; else return "#44CCFF";
                        }).ofObject(""),// The object named "" is the root visual element, the Node itself
                        new go.Binding("stroke", "color")),
                    {
                        click: function(e, obj) { showMessage("Clicked on " + obj.part.data.name); },
                        selectionChanged: function(part) {
                            var shape = part.elt(0);
                            shape.fill = part.isSelected ? "#cddc39" : "#44CCFF";
                        }
                    },
                    $(go.TextBlock, "Default Text",
                        { margin: 12, stroke: "white", font: "16px sans-serif" },
                        new go.Binding("text", "name"))
                );

            // define a Link template that routes orthogonally, with no arrowhead
            myDiagram2.linkTemplate =
                $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

            var model2 = $(go.GraphLinksModel);
            model2.nodeDataArray = node2;

            model2.linkDataArray = link2;

            myDiagram2.model = model2;
        }


    }
}

export default Graph;