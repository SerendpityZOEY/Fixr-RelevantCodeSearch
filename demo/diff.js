/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    table:{
        fontSize:12
    },
    customWidth: {
        paddingLeft: 9,
    },
    listItemAdded:{
        backgroundColor:'#c8e6c9'
    },
};

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

        var field = this.props.queryImport; //field is 'imports'
        var repo=commit.repo_sni;
        var contents = this.parseData(commit,"c_patch_t","\n");
        //TODO: later field can be callsites
        /*
         if(!field.includes("added") && !field.includes("removed")){
         field = 'c_imports_added_t';
         }
         var query = this.props.data; //query is a particular import statement
         var importAdded = commit[field].toString();

         var importRemoved = commit[field.replace("added","removed")].toString();
         var linesAdded=null;
         var linesRemoved=null;
         var repo=commit.repo_sni;
         var action;

         var restCommits = this.parseData(commit,"p_imports_t"," ");

         var methods = this.parseData(commit,"c_methods_t"," ");

         var contents = this.parseData(commit,"c_contents_t","\n");
         //TODO: Simplify Code
         if(importAdded.includes(query) && !importRemoved.includes(query)){
         linesAdded = commit[field];
         linesRemoved = commit[field.replace("added","removed")];
         action = "ADD";
         }else if(!importAdded.includes(query) && importRemoved.includes(query)){
         linesAdded = commit[field];
         linesRemoved = commit[field.replace("added","removed")];
         action = "REMOVE";
         }else if(importAdded.includes(query) && importRemoved.includes(query)){
         linesAdded = commit[field];
         linesRemoved = commit[field.replace("added","removed")];
         }
         else{
         return null;
         }
         */
        var patch = [];
        var code = [];
        commit.c_patch_t[0].split("\n").forEach( function (line, index) {
            if (line.length > 0) {
                //patch.push(line.substring(1))
                patch.push(line+'\n');
            }
            if (line.match(/^\+/)) {
                //add.push(index);
                code.push(line+'\n');
            }
            if (line.match(/^\-/)) {
                code.push(line+'\n');
                //remove.push(index);
            }
        });
        console.log(patch)
        return(
            <div>
                <ListItem
                    primaryText={repo}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                        <ListItem
                            key={0}
                            primaryText={commit.c_patch_t[0].split("\n").map(i => {
                                if(i.match(/^\+/))
                                    return <pre><code style={{backgroundColor:'#c8e6c9'}}>{i}</code></pre>;
                                if(i.match(/^\-/))
                                    return <pre><code style={{backgroundColor:'#ffcdd2'}}>{i}</code></pre>;
                                else
                                    return <pre><code>{i}</code></pre>;
                            })}
                        />,
                    ]}
                />
            </div>
        )
    }
}

export default Diff;