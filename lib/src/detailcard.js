/**
 * Created by yue on 2/9/17.
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

class DetailCard extends React.Component{
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

        var importEntered = this.props.importEntered; //input imposts
        var callsiteEntered = this.props.methodEntered; //input callsites

        var fileName=commit.name_sni;
        var browseFile = 'https://github.com/'+commit.repo_sni+'/issues/';
        var patch = [];
        var method = [];
        var add = 0;
        var remove = 0;
        var title = commit.c_user_sni+': '+commit.c_subject_t;

        commit.c_patch_t[0].split("\n").forEach( function (line, index) {
            if (line.length > 0) {
                //patch.push(line.substring(1))
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
            commit.c_patch_t[0].split("\n").forEach( function (line, index){
                if(line.length>0){
                    for(var item=0;item<callsiteEntered.length;item++){
                        if(line.match(callsiteEntered[item])){
                            for(var i=index-4;i<index+4;i++){
                                if(i==index){
                                    method.push(highlightWord(line,callsiteEntered[item]))
                                }else{
                                    method.push(commit.c_patch_t[0].split("\n")[i])
                                }
                            }
                            method.push('=================================');
                        }
                    }
                }
            })
            method = method.join('\n')
        }else{
            method = "Please specify a method first!"
        }

        function highlightWord(line, word){
            //console.log('word',line.substring(line.indexOf(word), line.indexOf(word)+word.length))
            line = line.substring(0,line.indexOf(word))+'<mark>'+line.substring(line.indexOf(word), line.indexOf(word)+word.length)+'</mark>'+
                line.substring(line.indexOf(word)+word.length)
            //console.log('new line', line)
            return line
        }

        return(<div>
                    <ListItem
                        key={0}
                        primaryText={'File Name:'+fileName}
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
                    />
                    <ListItem
                        primaryText={"test"}
                        innerDivStyle={{padding: 0}}
                        />
                    <ListItem
                        primaryText={["Expand to view where method gets called",
                        ]}
                        nestedItems={[
                            <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: method}}></code></pre>
                        ]}
                        nestedListStyle={styles.methodSnippet}
                        style={styles.headline}
                    />
                    <ListItem
                        primaryText={commit.c_patch_t[0].split("\n").map(function(i, index) {
                            //method highlighting
                            if(callsiteEntered!=''){
                                for(var item=0;item<callsiteEntered.length;item++){
                                    if(i.indexOf(callsiteEntered[item]) > -1){
                                        //extract the method form line
                                        var start = i.indexOf(callsiteEntered[item]);
                                        var end = start+callsiteEntered[item].length;
                                        var word = i.substring(start, end);
                                        //this is exactly what highlight function above does
                                        i = i.substring(0,i.indexOf(word))+'<mark>'+i.substring(i.indexOf(word), i.indexOf(word)+word.length)+'</mark>'+
                                            i.substring(i.indexOf(word)+word.length);
                                        //if line has color
                                        if(i.match(/^\+/))
                                            return <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                        if(i.match(/^\-/))
                                            return <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                        return <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                    }
                                }
                            }

                            //import highlighting
                            if(importEntered!=''){
                                for(item=0;item<importEntered.length;item++){
                                    if(i.indexOf(importEntered[item]) > -1){
                                        start = i.indexOf(importEntered[item]);
                                        end = start+importEntered[item].length;
                                        word = i.substring(start, end);
                                        i = i.substring(0,i.indexOf(word))+'<mark>'+i.substring(i.indexOf(word), i.indexOf(word)+word.length)+'</mark>'+
                                            i.substring(i.indexOf(word)+word.length);
                                        //if line has color
                                        if(i.match(/^\+/))
                                            return <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                        if(i.match(/^\-/))
                                            return <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                        return <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>;
                                    }
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
                                for(var ind=token+3;ind<endLine-1;ind++){
                                    res.push(commit.c_contents_t[0].split('\n')[ind])
                                }

                                var nestedRes = res.join('\n');

                                return <ListItem
                                    primaryText={
                                        <pre  style={{color:'#9e9e9e',marginTop:0,marginBottom:0}}><code>
                                        <FontIcon
                                            className="fa fa-expand" style={{fontSize:14}}
                                        />{expand}
                                        </code></pre>
                                    }

                                    nestedItems={[
                                        <pre style={{marginTop:0,marginBottom:0,color:'#9e9e9e'}}><code>
                                            {nestedRes}</code></pre>
                                    ]}
                                    innerDivStyle={{padding:0}}
                                />
                            }

                            else
                                return <pre style={{marginTop:0,marginBottom:0}}><code>{i}</code></pre>;
                        })}
                        style={styles.codeSnippet}
                        />
        </div>)
    }
}

export default DetailCard;