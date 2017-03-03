/**
 * Created by yue on 2/8/17.
 */
import React from 'react';

import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {LineChart, Line} from 'recharts';
import Box from './box.js';

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

const data = [
    {name: '2013-02-06', uv: 4000, freq: 24, amt: 2400},
    {name: '2013-03-06', uv: 3000, freq: 13, amt: 2210},
    {name: '2013-04-06', uv: 2000, freq: 98, amt: 2290},
    {name: '2013-05-06', uv: 2780, freq: 39, amt: 2000},
    {name: '2014-02-06', uv: 1890, freq: 48, amt: 2181},
    {name: '2015-02-06', uv: 2390, freq: 38, amt: 2500},
    {name: '2016-02-06', uv: 3490, freq: 43, amt: 2100},
];

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
                    if(!q[item].includes('.')) var tmp = q[item]+'(';
                    else tmp = q[item];
                    if(line.includes(tmp)){
                        var ind = index;
                        //following lines
                        while(!check(c.c_patch_t[0].split('\n')[index+1])){
                            index+=1;
                        }
                        hitlines.push(c.c_patch_t[0].split('\n')[index+1]);
                        //previous lines
                        while(!check(c.c_patch_t[0].split('\n')[ind-1])){
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
        var following = '';
        hitlines.forEach( function(item, index){
            if(item!=undefined && item!=' '){
                item=item.substr(1).trim(); //remove -/+ signs
                following+='//'+item+'\n';
            }
        });
        var inputs = val;
        var previous = '';
        prevlines.forEach( function(item, index){
            if(item!=undefined && item!=' '){
                item=item.substr(1).trim(); //remove -/+ signs
                previous+='//'+item+'\n';
            }
        });
        this.props.onAddBtnClick(previous+inputs+'\n'+following);

        //if the next line only has whitespace or }
        function check(str){
            if(str==undefined) return true;
            if(str[0]=='+' || str[0]=='-')
                str = str.substr(1).trim();
            else str = str.trim();
            return !(str.length==0 || str.length==1);
        }
    }

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

        var code = this.props.newCode;
        console.log('newCode', code);
        var queries = code.trim().split('\n');
        var resQueries = [];
        //remove (); and comment
        for(var i=0;i<queries.length;i++){
            if(!queries[i].includes('//')){
                if(queries[i].includes('.') && !queries[i].includes('(')) { //import
                    resQueries.push(queries[i].substr(1).trim());
                }else{
                    if(queries[i].includes('.')){ //method
                        var tmp = queries[i].split('.')[1]; //db.delete()
                        resQueries.push(tmp.substr(0, tmp.indexOf('(')));
                    }
                    else resQueries.push(queries[i].substr(0,queries[i].indexOf('(')));//delete()
                }
            }

        }

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

            if(i%3==0){
                return <span>
                    <Box type={'graph'} data={graph} events={events} options={options}
                                  handleChange={this.handleChange.bind(this)} key={i*20+16}/>
                    <Card style={style.cards} key={i}>
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
                    <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleClick(this.props.newCode, resQueries, s)}/>
                    </CardActions>
                    </Card></span>;
            }else if(i%4==0){
                return <span>
                    <Box type={'trend'} handleChange={this.handleChange.bind(this)}
                                  data={data} key={i*20+16}/>
                    <Card style={style.cards} key={i}>
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
                    <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleClick(this.props.newCode, resQueries, s)}/>
                    </CardActions>
                    </Card></span>;
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
                        <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleClick(this.props.newCode, resQueries, s)}/>
                    </CardActions>
                </Card>
            }
        }, this);

        return <div style={style.cards}>{CommitObjs}<Box type={'graph'} data={graph_2} events={events} options={options} handleChange={this.handleChange.bind(this)} key={100}/></div>;
    }
}

export default Cards;