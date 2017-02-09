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
        width:230,
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
        overflowY:'scroll'
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
        console.log('click',index)
        this.props.showDetail(index);
    };

    render(){
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
                    style={{fontSize:'0.3vw', height:150}}
                />
                <CardText style={style.cardtext}>{msg}</CardText>
                <CardActions>
                    <FlatButton label="View Detail" onClick={() => this.handleChange(s)}/>
                </CardActions>
            </Card>
        }, this);
        return <div style={style.cards}>{CommitObjs}</div>;
    }
}

export default Cards;