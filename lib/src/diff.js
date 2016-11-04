/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    headline: {
        fontSize: 14,
    },
    item1: {
        fontSize:14,
        fontWeight: 800,
    },
    customWidth: {
        paddingLeft: 9,
    },
    codeSnippet:{
        fontFamily:"Fira Mono",
        fontSize:14
    },
    methodSnippet:{
        fontFamily:"Fira Mono",
        fontSize:14,
        backgroundColor:'#f5f5f5',
        paddingLeft: 50,
        paddingRight: 50
    },
    buttonStyle:{
        fontSize:12,
        fontWeight:450,
        paddingLeft:5,
        paddingBottom:10
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

        var importEntered = this.props.data; //input imposts
        var callsiteEntered = this.props.callsite; //input callsites

        var fileName=commit.name_sni;
        var browseFile = 'https://github.com/'+commit.repo_sni+'/issues/';
        var patch = [];
        var method = [];
        var add = 0;
        var remove = 0;
        var parent_hash = commit.p_hash_sni;
        var child_hash = commit.c_hash_sni;
        var title = commit.c_user_sni+': '+commit.c_subject_t;
        var sourceCode = 'https://github.com/'+commit.repo_sni+'/blob/'+commit.c_hash_sni+'/'+commit.name_sni;
        var sourceDiff = 'https://github.com/'+commit.repo_sni+'/commit/'+commit.c_hash_sni;
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

        //parse whole content
        if(callsiteEntered!=''){
            commit.c_contents_t[0].split("\n").forEach( function (line, index){
                if(line.length>0){
                    if(line.match(callsiteEntered)){
                        for(var i=index-4;i<index+4;i++)
                            method.push(commit.c_contents_t[0].split("\n")[i])
                        method.push('=================================');
                    }
                }
            })
            method = method.join('\n')
        }else{
            method = "Please specify a method first!"
        }

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
                            primaryText={title}
                            href={sourceCode}
                            target="_blank"
                            rightIconButton={
                                <FlatButton
                                label="See Issues"
                                href={browseFile}
                                target="_blank"
                                default={true}
                                icon={<FontIcon className="fa fa-github fa-lg" />}
                                />
                            }
                            style={styles.item1}
                        />,
                        <ListItem
                            key={1}
                            primaryText={["Expand to view where method gets called",
                                <FlatButton
                                label="All Diff Files"
                                href={sourceDiff}
                                target="_blank"
                                icon={<FontIcon className="fa fa-plus fa-lg" style={{fontSize:15}}/>}
                                labelStyle={styles.buttonStyle}
                            />,
                            ]}
                            nestedItems={[
                                <pre style={{marginTop:0,marginBottom:0}}><code>{method}</code></pre>
                            ]}
                            nestedListStyle={styles.methodSnippet}
                            style={styles.headline}
                        />,
                        <ListItem
                            key={2}
                            primaryText={commit.c_patch_t[0].split("\n").map(function(i, index) {
                                if(callsiteEntered!=''){
                                    if(i.includes(callsiteEntered)){
                                        var start = i.indexOf(importEntered);
                                        var end = start+importEntered.length;
                                        return <pre style={{backgroundColor:'#ffe082',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                    }
                                }

                                if(i.match(/^\+/))
                                    return <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                if(i.match(/^\-/))
                                    return <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                                if(i.includes('@@')){
                                    var part2 = i.split('@@')[1];
                                    var expand = '@@'+part2+'@@';
                                    var endLine = part2.substr(part2.indexOf('+')+1,part2.indexOf(',')-2);
                                    var beginLine = commit.c_patch_t[0].split("\n")[index-3];
                                    if(beginLine === ' ') beginLine = commit.c_patch_t[0].split("\n")[index-2];
                                    var token = commit.c_contents_t[0].split('\n').indexOf(beginLine.substr(1));
                                    var res = []
                                    for(var i=token+3;i<endLine-1;i++){
                                        res.push(commit.c_contents_t[0].split('\n')[i])
                                    }

                                    return <ListItem
                                        key={index}
                                        primaryText={<pre  style={{color:'#9e9e9e',marginTop:0,marginBottom:0}}><code>
                                        <FontIcon
                                            className="fa fa-expand" style={{fontSize:14}}
                                        />{expand}
                                        </code></pre>}
                                        nestedItems={[
                                            <pre style={{marginTop:0,marginBottom:0,color:'#9e9e9e'}}><code>
                                            {res.join('\n')}</code></pre>
                                        ]}
                                        innerDivStyle={{padding:0}}
                                    />
                                }

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