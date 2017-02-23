/**
 * Created by yue on 2/8/17.
 */
import React from 'react';

import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
    cardtext:{
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        height:50,
        fontSize: 12,
        overflowY:'auto',
        overflowX:'hidden'
    },
    cardHeader:{
        fontSize:'0.3vw',
        height:150,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowY:'auto',
        overflowX:'hidden',
    }
};

const TinyBarChart = React.createClass({

    render () {
        return (
            <BarChart width={30} height={30} data={this.props.data}>
                <Bar dataKey='add' fill='#c8e6c9'/>
                <Bar dataKey='remove' fill='#ffcdd2'/>
            </BarChart>
        );
    }
});

const graph = {
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

const graph_2 = {
    nodes: [
        {id: 1, label: 'this := @this'},
        {id: 2, label: '$r0 = this.mDbHelper'},
        {id: 3, label: 'db = $r0.getWritableDatabase()'},
        {id: 4, label: 'db.beginTransaction()'},
        {id: 5, label: 'nop'},
        {id: 6, label: 'label1:db.setTransactionSuccessful()'},
        {id: 7, label: 'label2: db.endTransaction()'},
        {id: 8, label: 'goto label6'},
        {id: 9, label: 'label6: return'},
        {id: 10, label: 'label3:e:=@caughrexception'},
        {id: 11, label: 'e.printStackTrace()'},
        {id: 12, label: 'label4:db.endTransaction()'},
        {id: 13, label: 'goto label6'},
        {id: 14, label: 'label5:l3:=@caughtexception'},
        {id:15, label: 'db.endTransaction()'},
        {id: 16, label: 'throw l3'},
    ],
    edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 4, to: 5},

        {from: 5, to: 6},
        {from: 6, to: 7},
        {from: 7, to: 8},
        {from: 8, to: 9},

        {from: 5, to: 10},
        {from: 10, to: 11},
        {from: 11, to: 12},
        {from: 12, to: 13},
        {from: 13, to: 9},

        {from: 5, to: 14},
        {from: 14, to: 15},
        {from: 15, to: 16},
        {from: 16, to: 9},
    ]
}

const options = {
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
    },
    interaction:{
        zoomView: false,
    }
};

const events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
}

const add = <Card style={style.cards}>
    <CardHeader
        title={'Cluster'}
        style={{
            height:50,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowY:'auto',
            overflowX:'hidden',
            paddingBottom:0}}
        titleStyle={{fontSize:10,}}
        textStyle={{paddingRight:0}}
    />
    <CardText style={{
        height:150,
        overflowY:'auto',
        overflowX:'hidden',
        padding:0
    }}><Graph graph={graph} options={options} events={events} /></CardText>
    <CardActions>
        <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(graph, 'graph')}/>
        <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}}/>
    </CardActions>
</Card>;

const add_2 = <Card style={style.cards}>
    <CardHeader
        title={'Cluster'}
        style={{
            height:50,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowY:'auto',
            overflowX:'hidden',
            paddingBottom:0}}
        titleStyle={{fontSize:10,}}
        textStyle={{paddingRight:0}}
    />
    <CardText style={{
        height:150,
        overflowY:'auto',
        overflowX:'hidden',
        padding:0
    }}><Graph graph={graph_2} options={options} events={events} /></CardText>
    <CardActions>
        <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(graph_2, 'graph')}/>
        <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}}/>
    </CardActions>
</Card>;

class Cards extends React.Component{

    handleChange(index, type){
        this.props.showDetail(index, type);
    };

    handleClick(val, q, c){
        var hitlines=[];
        var prevlines=[];
        //collect hit lines
        console.log('q',q);
        c.c_patch_t[0].split('\n').forEach( function(line, index) {
            if(line.length>0 && q!=undefined){
                for(var item=0;item<q.length;item++){
                    //check if this q[item] is a method
                    if(!q[item].includes('.')) var tmp = '.'+q[item]+'(';
                    else tmp = q[item];
                    if(line.includes(tmp)){
                        var ind = index;
                        //following lines
                        while(!check('following',c.c_patch_t[0].split('\n')[index+1])){
                            index+=1;
                        }
                        hitlines.push(c.c_patch_t[0].split('\n')[index+1]);
                        //previous lines
                        while(!check('prev',c.c_patch_t[0].split('\n')[ind-1])){
                            ind-=1;
                        }
                        prevlines.push(c.c_patch_t[0].split('\n')[ind-1]);
                        /*
                        q.forEach(function(word, i){
                            if(line.includes(word)) hitlines.push(c.c_patch_t[0].split('\n')[index+1]);
                        })
                        */
                    }
                }
            }
        });
        console.log('val', val)
        console.log('prev', prevlines);
        console.log('foll', hitlines);
        var following = '';
        hitlines.forEach( function(item, index){
            if(item!=undefined && item!=' '){
                item=item.substr(1).trim(); //remove -/+ signs
                following+='\n'+'// =>'+item;
            }
        });
        var comments = val.split('*/')[0];
        var inputs = val.split('*/')[1];
        var previous = '';
        prevlines.forEach( function(item, index){
            if(item!=undefined && item!=' '){
                item=item.substr(1).trim(); //remove -/+ signs
                previous+='\n'+'// =>'+item;
            }
        });
        this.props.onAddBtnClick(comments+'*/'+previous+inputs+following);

        //if the next line only has whitespace or }
        function check(type, str){
            console.log('str', str)
            if(str==undefined) return true;
            if(str[0]=='+' || str[0]=='-')
                str = str.substr(1).trim();
            else str = str.trim();
            return !(str.length==0 || str.length==1);
        }
    }

    render(){
        //if the last editor has sth
        if(this.props.newCode!=''){
            var code = this.props.newCode;
            var str = "/*\nExample:\nImport Search:\nimport android.app.Fragment; or\nandroid.app.Fragment;\nMethod Search: " +
                "getTag()\n*/";
            if(code.includes(str)) code = code.split(str)[1];
            var queries = code.trim().split('\n');
            //remove ();
            for(var i=0;i<queries.length;i++){
                if(queries[i].includes('.') && !queries[i].includes('(')) { //import
                    queries[i] = queries[i].substr(1).trim();
                }else{
                    if(queries[i].includes('.')){ //method
                        queries[i] = queries[i].split('.')[1]; //db.delete()
                        queries[i] = queries[i].substr(0, queries[i].indexOf('('))
                    }
                    else queries[i] = queries[i].substr(0,queries[i].indexOf('('));//delete()
                }
            }

        }

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

        var graph_2 = {
            nodes: [
                {id: 1, label: 'this := @this'},
                {id: 2, label: '$r0 = this.mDbHelper'},
                {id: 3, label: 'db = $r0.getWritableDatabase()'},
                {id: 4, label: 'db.beginTransaction()'},
                {id: 5, label: 'nop'},
                {id: 6, label: 'label1:db.setTransactionSuccessful()'},
                {id: 7, label: 'label2: db.endTransaction()'},
                {id: 8, label: 'goto label6'},
                {id: 9, label: 'label6: return'},
                {id: 10, label: 'label3:e:=@caughrexception'},
                {id: 11, label: 'e.printStackTrace()'},
                {id: 12, label: 'label4:db.endTransaction()'},
                {id: 13, label: 'goto label6'},
                {id: 14, label: 'label5:l3:=@caughtexception'},
                {id:15, label: 'db.endTransaction()'},
                {id: 16, label: 'throw l3'},
            ],
            edges: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 3, to: 4},
                {from: 4, to: 5},

                {from: 5, to: 6},
                {from: 6, to: 7},
                {from: 7, to: 8},
                {from: 8, to: 9},

                {from: 5, to: 10},
                {from: 10, to: 11},
                {from: 11, to: 12},
                {from: 12, to: 13},
                {from: 13, to: 9},

                {from: 5, to: 14},
                {from: 14, to: 15},
                {from: 15, to: 16},
                {from: 16, to: 9},
            ]
        }

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
            },
            interaction:{
                zoomView: false,
            }
        };

        var events = {
            select: function(event) {
                var { nodes, edges } = event;
            }
        }

        var add = <Card style={style.cards}>
            <CardHeader
                title={'Cluster'}
                style={{
                    height:50,
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    overflowY:'auto',
                    overflowX:'hidden',
                    paddingBottom:0}}
                titleStyle={{fontSize:10,}}
                textStyle={{paddingRight:0}}
            />
            <CardText style={{
                height:150,
                overflowY:'auto',
                overflowX:'hidden',
                padding:0
            }}><Graph graph={graph} options={options} events={events} /></CardText>
            <CardActions>
                <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(graph, 'graph')}/>
                <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}}/>
            </CardActions>
        </Card>;

        var add_2 = <Card style={style.cards}>
            <CardHeader
                title={'Cluster'}
                style={{
                    height:50,
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    overflowY:'auto',
                    overflowX:'hidden',
                    paddingBottom:0}}
                titleStyle={{fontSize:10,}}
                textStyle={{paddingRight:0}}
            />
            <CardText style={{
                height:150,
                overflowY:'auto',
                overflowX:'hidden',
                padding:0
            }}><Graph graph={graph_2} options={options} events={events} /></CardText>
            <CardActions>
                <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(graph_2, 'graph')}/>
                <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}}/>
            </CardActions>
        </Card>;

        var CommitObjs;
        CommitObjs = this.props.commit.map(function(s,i){
            var repo = 'Repo: '+s.repo_sni.split('/')[1];
            var user = 'User: '+s.repo_sni.split('/')[0];
            var msg = s.c_subject_t;
            var add=0, remove=0;

            s.c_patch_t[0].split("\n").forEach( function (line, index) {
                if (line.match(/^\+/)) {
                    add++;
                }
                if (line.match(/^\-/)) {
                    remove++;
                }
            });

            console.log('key', i)
            if(i==3){
                return <Card style={style.cards}>
                    <CardHeader
                        title={'Cluster'}
                        style={{
                            height:50,
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            overflowY:'auto',
                            overflowX:'hidden',
                            paddingBottom:0}}
                        titleStyle={{fontSize:10,}}
                        textStyle={{paddingRight:0}}
                    />
                    <CardText style={{
                        height:150,
                        overflowY:'auto',
                        overflowX:'hidden',
                        padding:0
                    }}><Graph graph={graph} options={options} events={events} /></CardText>
                    <CardActions>
                        <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(graph, 'graph')}/>
                        <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}}/>
                    </CardActions>
                    </Card>;
            } else {
                return <Card style={style.cards} key={i}>
                    <CardHeader
                        title={repo}
                        subtitle={user}
                        avatar={<TinyBarChart data={[{name:'Page A', add: add, remove: remove},]}/>}
                        style={style.cardHeader}
                        titleStyle={{fontSize:10,}}
                        subtitleStyle={{fontSize:10,}}
                        textStyle={{paddingRight:0}}
                    />
                    <CardText style={style.cardtext}>{msg}</CardText>
                    <CardActions>
                        <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(s, 'commit')}/>
                        <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleClick(this.props.newCode, queries, s)}/>
                    </CardActions>
                </Card>
            }
        }, this);

        return <div style={style.cards}>{add_2}{CommitObjs}</div>;
    }
}

export default Cards;