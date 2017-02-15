import React from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/clike/clike');
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import IconButton from 'material-ui/IconButton';

class Editor extends React.Component{

    constructor(props){
        super(props);
        this.state={
            code:this.props.initialCode
        }
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
        this.props.getPrevEditorCode(newCode);
    }

    onSubmit(){
        var splitLines = this.state.code.split('*/');
        if(splitLines.length==2)
            var inputLines = this.state.code.split('*/')[1].trim();
        else inputLines = this.state.code.split('*/')[0].trim();

        var importStatements = [];
        var methods = [];
        var importActions = [];
        var methodActions = [];
        inputLines.split('\n').forEach( function(line, index){
            if(line.includes('import') || line.includes('.')){
                importStatements.push(line.substr(line.indexOf(' ')+1, line.indexOf(';')));
                if(line.match(/^\+/)) importActions.push('a');
                else if(line.match(/^\-/)) importActions.push('d');
                else importActions.push('m');
            }
            if(line.includes('(') && line.includes(')')){
                methods.push(line.substr(line.indexOf(' ')+1, line.indexOf('(')));
                if(line.match(/^\+/)) methodActions.push('a');
                else if(line.match(/^\-/)) methodActions.push('d');
                else methodActions.push('m');
            }
        })

        var filters = this.FilterProcessor(importStatements, methods, importActions, methodActions);
        let searchParams = {
            solrSearchUrl: "http://192.12.243.133:8983/solr/fixr_delta/select",
            query: "*:*",
            filter: filters,
            fetchFields: "",
            offset: 0,
            limit: 10,
            highlightParams: {
                "hl": "true",
                "hl.fl": "name manu",
                "hl.snippets": 1,
                "hl.fragsize": 500
            }
        };

        this.props.doSearch(searchParams);
    }

    FilterProcessor(importStatements, methods, importActions, methodActions){
        var methodFilter = [];
        var importFilter = [];
        methods.forEach( function(item, index){
            methodFilter.push(methodQuery(item, methodActions[index]));
        })
        importStatements.forEach( function(item, index){
            importFilter.push(importQuery(item, importActions[index]));
        });

        function methodQuery(methodCall, action){
            switch(action){
                case 'a':
                    var callsiteFl = 'c_callsites_added_t:'+methodCall;
                    break;
                case 'd':
                    callsiteFl = 'c_callsites_removed_t:'+methodCall;
                    break;
                case 'all':
                    callsiteFl = 'c_callsites_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_added_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_removed_t:'+methodCall;
                    break;
                default:
                    callsiteFl = 'c_callsites_added_t:'+methodCall;
                    callsiteFl += ' OR c_callsites_removed_t:'+methodCall;
            }
            return callsiteFl;
        }

        function importQuery(importStatement, action){
            switch(action){
                case 'a':
                    var importsFl = 'c_imports_added_t:'+importStatement;
                    break;
                case 'd':
                    importsFl = 'c_imports_removed_t:'+importStatement;
                    break;
                case 'all':
                    importsFl = 'c_imports_t:'+importStatement;
                    importsFl += ' OR c_imports_added_t:'+importStatement;
                    importsFl += ' OR c_imports_removed_t:'+importStatement;
                    break;
                default:
                    importsFl = 'c_imports_added_t:'+importStatement;
                    importsFl += ' OR c_imports_removed_t:'+importStatement;
            }
            return importsFl;
        }

        return methodFilter.concat(importFilter);
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: 'clike',
        };
        return <Grid>
            <Row>
                <Col xs={5} md={5} lg={5} style={{padding:0}}>
                <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options}/>
                </Col>
                <Col xs={1} md={1} lg={1} style={{backgroundColor:"#2d2d2d", margin:0}}>
                    <IconButton iconClassName="fa fa-search fa-lg" iconStyle={{color:'#fff', fontSize:15}} onClick={this.onSubmit.bind(this)}>
                        &nbsp;Search</IconButton>
                </Col>
            </Row>
        </Grid>
    }
}

export default Editor;