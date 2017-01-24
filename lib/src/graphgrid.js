import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import Graph from './graph.js';

const style = {
    style:{
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
    },
    substyle:{
        width: '100%',
        height:'100%',
        textAlign: 'left',
        display: 'inline-block',
        backgroundColor:'#2d2d2d'
    },
    codeSnippet:{
        fontFamily:"Fira Mono",
        fontSize:14
    },
};


var v1 = 'Void talkToDbBuggy(){​\n'+
    '\tSQLiteDatabase db = mDbHelper.getWritableDatabase();​\n'+
    '\tDb.beginTransaction();​\n'+
    '\tDb.setTransactionSuccessful();​\n'+
    '\tDb.endTranscation();​\n'+
    '}​\n';

var v2 = 'Void talkToDb(){​\n​'+
    '\tSQLiteDatabase db = mDbHelper.getWritableDatabase();​\n​'+
    '\tDb.beginTransaction();​\n​'+
    '\tTry{​\n​'+
    '\t\tDb.setTransactionSuccessful();\n​​'+
    '\t}catch(Exception e){​\n​'+
    '\t//here you can catch all the exceptions​\n​'+
    '\te.printStackTrace();​\n​'+
    '\t}finally{​\n​'+
    '\t\tDb.endTransaction();\n​'+
    '\t}\n}\n';

class graphGrid extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            colWidth: 6,
            expandHidden: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        if (this.state.colWidth == 6) {
            this.setState({
                colWidth: 3,
                expandHidden: true,
            })
        } else {
            this.setState({
                colWidth: 6,
                expandHidden: false,
            })
        }
    }

    render(){

        var w = this.state.colWidth;

        if(this.state.expandHidden){
            var hidden1 = <Col xs={3} md={3} lg={3}>
                <Paper id="myDiagramDiv" style={style.substyle} zDepth={1}>
                    <Graph version={"prev"}/>
                </Paper>
            </Col>;
            var hidden2 = <Col xs={3} md={3} lg={3}>
                <Paper id="version2" style={style.substyle} zDepth={1}>
                    <Graph version={"curr"}/>
                </Paper>
            </Col>;
        }else{
            hidden1='';
            hidden2='';
        }

        return <div>
            <Paper style={style.style} zDepth={1}>
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="View Graph" onClick={this.handleChange} backgroundColor='rgb(94, 53, 177)' labelColor='#fff'/>
                    </ToolbarGroup>
                </Toolbar>
                <Grid>
                    <Row>
                        <Col xs={w} md={w} lg={w}>
                            <Paper style={style.substyle} zDepth={1}>
                                <pre><code style={style.codeSnippet}>{v1}</code></pre>
                            </Paper>
                        </Col>
                        {hidden1}
                        {hidden2}
                        <Col xs={w} md={w} lg={w}>
                            <Paper style={style.substyle} zDepth={1}>
                                <pre><code style={style.codeSnippet}>{v2}</code></pre>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            </Paper>
        </div>
    }
}

export default graphGrid;