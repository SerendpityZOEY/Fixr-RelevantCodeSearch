/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    headline: {
        fontSize: 14,
    },
    table:{
        fontSize:12
    },
    customWidth: {
        paddingLeft: 9,
    },
    codeSnippet:{
        fontFamily:"Fira Mono",
        fontSize:14
    }
};

const TinyBarChart = React.createClass({

    render () {
        return (
            <span style={{position:'fixed',marginLeft:-60,marginTop:-10}}>
            <BarChart width={30} height={30} data={this.props.data}>
                <Bar dataKey='add' fill='#c8e6c9'/>
                <Bar dataKey='remove' fill='#ffcdd2'/>
            </BarChart>
            </span>
        );
    }
})

class Diff extends React.Component{

    parseData(commit,field,token) {
    var rest = commit[field].toString().split(token);
    var restCommits=rest[0];
    for(var i=1;i<rest.length;i++){
        //TODO: parent imports contains the added/removed line
        restCommits += rest[i]+'\n';
    }
    return restCommits;
    }

    render(){
        var commit = this.props.commit;

        var queryImport = this.props.queryImport; //field is 'imports'
        var queryCallsite = this.props.queryCallsites;//field is 'callsites'
        var importEntered = this.props.data; //input imposts
        var callsiteEntered = this.props.callsite; //input callsites

        console.log('1',queryImport)
        console.log('2',queryCallsite)
        console.log('3',importEntered)
        console.log('4',callsiteEntered)
        var fileName=commit.name_sni;
        var browseFile = 'https://github.com/'+commit.repo_sni+'/tree/'+commit.c_hash_sni;
        var patch = [];
        var add = 0;
        var remove = 0;
        commit.c_patch_t[0].split("\n").forEach( function (line, index) {
            if (line.length > 0) {
                //patch.push(line.substring(1))
                patch.push(line+'\n');
            }
            if (line.match(/^\+/)) {
                add++;
            }
            if (line.match(/^\-/)) {
                remove++;
            }
        });

        return(
            <div>
                <ListItem
                    primaryText={fileName}
                    leftIcon={<TinyBarChart data={[{name:'Page A', add: add, remove: remove},]}/>}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    style={styles.headline}
                    nestedItems={[
                        <ListItem
                            key={0}
                            primaryText={commit.c_subject_t}
                            rightIconButton={
                                <FlatButton
                                label="Browse Files"
                                href={browseFile}
                                target="_blank"
                                secondary={true}
                                icon={<FontIcon className="fa fa-github fa-lg" />}
                                />
                            }
                            style={styles.headline}
                        />,
                        <ListItem
                            key={1}
                            primaryText={commit.c_patch_t[0].split("\n").map(i => {
                                if(queryImport!='all' || queryCallsite!='all'){
                                    if(i.includes(importEntered) || i.includes(callsiteEntered)){
                                        var start = i.indexOf(importEntered);
                                        var end = start+importEntered.length;
                                        return <pre style={{backgroundColor:'#ffe082',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                    }
                                }

                                if(i.match(/^\+/))
                                    return <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                if(i.match(/^\-/))
                                    return <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                if(i.includes('@@'))
                                    return <pre  style={{color:'#9e9e9e',backgroundColor:'#e3f2fd',marginTop:0,marginBottom:0}}><code>
                                        <FontIcon className="fa fa-expand" style={{fontSize:14}} />{i}
                                        </code></pre>;
                                else
                                    return <pre style={{marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                            })}
                            style={styles.codeSnippet}
                        />,
                    ]}
                />
            </div>
        )
    }
}

export default Diff;