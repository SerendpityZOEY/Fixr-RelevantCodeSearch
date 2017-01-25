import React from 'react';

class Graph extends React.Component{
    render(){
        return <div></div>
    }

    componentDidMount(){

        var $ = go.GraphObject.make;

        function showMessage(s) {
            console.log('select: ',s)
        }

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
                        }).ofObject("")),  // The object named "" is the root visual element, the Node itself
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
            model.nodeDataArray =
                [
                    { key: "1",              name: "This:=@this"},
                    { key: "2", parent: "1", name: "$r0=this.mDbHelper"},
                    { key: "3", parent: "2", name: "Db=$r0.getWritableDatabase()"},
                    { key: "4", parent: "3", name: "Db.beginTransaction()"},
                    { key: "5", parent: "4", name: "Db.setTransactionSuccessful()"},
                    { key: "6", parent: "5", name: "Db.endTransaction()"},
                    { key: "7", parent: "6", name: "return"}
                ];
            model.linkDataArray = [
                {from:"1", to:"2"},
                {from:"2", to:"3"},
                {from:"3", to:"4"},
                {from:"4", to:"5"},
                {from:"5", to:"6"},
                {from:"6", to:"7"}
            ];
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
                $(go.Node, "Horizontal",
                    { background: "#44CCFF" },
                    $(go.TextBlock, "Default Text",
                        { margin: 12, stroke: "white", font: "16px sans-serif"},
                        new go.Binding("text", "name")),
                    {
                        selectionAdornmentTemplate:
                            $(go.Adornment, "Auto",
                                $(go.Shape, "RoundedRectangle",
                                    { fill: null, stroke: "dodgerblue", strokeWidth: 2, background:"#cddc39" }),
                                $(go.TextBlock, "Default Text",
                                    { margin: 12, stroke: "white", font: "16px sans-serif" },
                                    new go.Binding("text", "name")),
                                $(go.Placeholder)
                            )  // end Adornment
                    }
                );

            // define a Link template that routes orthogonally, with no arrowhead
            myDiagram2.linkTemplate =
                $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

            var model2 = $(go.GraphLinksModel);
            model2.nodeDataArray =
                [
                    { key: "1",              name: "This:=@this"},
                    { key: "2", parent: "1", name: "$r0=this.mDbHelper"},
                    { key: "3", parent: "2", name: "Db=$r0.getWritableDatabase()"},
                    { key: "4", parent: "3", name: "Db.beginTransaction()"},
                    { key: "5", parent: "4", name: "nop"},
                    { key: "6", parent: "5", name: "label3:e:=@caughtexception"},
                    { key: "7", parent: "6", name: "e.printStackTrace()"},
                    { key: "8", parent: "7", name: "label4:db.endTransaction()"},
                    { key: "9", parent: "8", name: "goto label6"},
                    { key: "10", parent: ["9","13","16"], name: "label6: return"},

                    { key: "11", parent: "4", name: "label1: db.setTransactionSuccessful()"},
                    { key: "12", parent: "11", name: "label2: db.endTransaction()"},
                    { key: "13", parent: "12", name: "goto label6"},

                    { key: "14", parent: "4", name: "label5:l3:=@caughtexception"},
                    { key: "15", parent: "14", name: "db.endTransaction()"},
                    { key: "16", parent: "15", name: "throw l3"},

                ];
            model2.linkDataArray = [
                { from: "1", to: "2" },
                { from: "2", to: "3" },
                { from: "3", to: "4" },
                { from: "4", to: "5" },
                { from: "5", to: "6" },
                { from: "6", to: "7" },
                { from: "7", to: "8" },
                { from: "8", to: "9" },
                { from: "9", to: "10" },

                { from: "4", to: "11" },
                { from: "11", to: "12" },
                { from: "12", to: "13" },
                { from: "13", to: "10" },

                { from: "4", to: "14" },
                { from: "14", to: "15" },
                { from: "15", to: "16" },
                { from: "16", to: "10" },

            ];
            myDiagram2.model = model2;
        }


    }
}

export default Graph;