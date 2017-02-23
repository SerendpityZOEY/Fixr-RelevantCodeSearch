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
        var fulltextsearch = '*:*';
        inputLines.split('\n').forEach( function(line, index){
            //full text search
            if(line.includes('=>') && !line.includes('//')){
                //remove () from selected node
                if(line.includes('()')) fulltextsearch = line.substr(2, line.indexOf('(')-2);
                //remove invalid syntax from lines of code selected
                else if(line[line.length-1]=='{' || line[line.length-1]=='('){
                    fulltextsearch = line.substr(2, line.length-3);
                }
                else fulltextsearch = line.substr(2);
            }
            //method search
            else if(line.includes('(') && line.includes(')') && !line.includes('//')){
                if(line.match(/^\+/)) methodActions.push('a');
                else if(line.match(/^\-/)) methodActions.push('d');
                else methodActions.push('m');

                //eg. db.delete()
                if(line.includes('.')) line = line.split('.')[1];
                methods.push(line.substr(line.indexOf(' ')+1, line.indexOf('(')));
            }
            else if((line.includes('import') || line.includes('.')) && !line.includes('//')){
                if(line.match(/^\+/)) importActions.push('a');
                else if(line.match(/^\-/)) importActions.push('d');
                else importActions.push('m');

                importStatements.push(line.substr(line.indexOf(' ')+1, line.indexOf(';')));
            }
        })

        var filters = this.FilterProcessor(importStatements, methods, importActions, methodActions);
        console.log('filters', filters)
        let searchParams = {
            solrSearchUrl: "http://192.12.243.133:8983/solr/fixr_delta/select",
            query: fulltextsearch,
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
                <Col xs={12} md={4} lg={4} style={{padding:0,position:'relative'}}>
                    <IconButton iconClassName="fa fa-search fa-lg" style={{position:'absolute',zIndex:100, top:0, right:26,}} iconStyle={{fontSize:15, color:'#fff'}} onClick={this.onSubmit.bind(this)}>
                        &nbsp;Search</IconButton>
                <CodeMirror value={this.state.code} style={{position:'absolute', zIndex:2}} onChange={this.updateCode.bind(this)} options={options}/>
                </Col>
            </Row>
        </Grid>
    }
}

export default Editor;