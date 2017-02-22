/**
 * Created by yue on 2/9/17.
 */
import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Lines from './linesofcode.js';

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
        var method = [];
        var add = 0;
        var remove = 0;

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

        var temp = <Lines diffcontent={commit.c_patch_t[0]} content={commit.c_contents_t[0]}
                          callsiteEntered={callsiteEntered} importEntered={importEntered}
                          onAddBtnClick={this.props.onAddBtnClick.bind(this)}
                          newCode={this.props.newCode}
        />

        return(<div>
                    <ListItem
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
                        primaryText={["Expand to view where method gets called",
                        ]}
                        nestedItems={[
                            <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: method}}></code></pre>
                        ]}
                        nestedListStyle={styles.methodSnippet}
                        style={styles.headline}
                    />
                    {temp}
        </div>)
    }
}

export default DetailCard;