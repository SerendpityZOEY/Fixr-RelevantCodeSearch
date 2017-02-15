/**
 * Created by yue on 2/8/17.
 */
import React from 'react';

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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
})

class Cards extends React.Component{

    handleChange(index){
        this.props.showDetail(index);
    };

    handleClick(val, q, c){
        var hitlines=[];
        //collect hit lines
        console.log('q',q)
        c.c_patch_t[0].split('\n').forEach( function(line, index) {
            if(line.length>0 && q!=undefined){
                for(var item=0;item<q.length;item++){
                    if(line.match(q[item])){
                        q.forEach(function(word, i){
                            if(line.includes(word)) hitlines.push(c.c_patch_t[0].split('\n')[index+1]);
                        })
                    }
                }
            }
        })

        hitlines.forEach( function(item, index){
            if(item!=undefined && item!=' '){
                item=item.substr(1).trim(); //remove -/+ signs
                val+='\n'+item;
            }
        })
        this.props.onAddBtnClick(val);
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
                if(queries[i].includes('.') && !queries[i].includes('(')) queries[i] = queries[i].substr(1).trim();
                else queries[i] = queries[i].substr(0,queries[i].indexOf('('));
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
                    <FlatButton label="Detail" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(s)}/>
                    <FlatButton label="Fix" style={{minWidth:8}} labelStyle={{fontSize:12}} onClick={() => this.handleClick(this.props.newCode, queries, s)}/>
                </CardActions>
            </Card>
        }, this);
        return <div style={style.cards}>{CommitObjs}</div>;
    }
}

export default Cards;