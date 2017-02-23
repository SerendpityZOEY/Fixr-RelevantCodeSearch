/**
 * Created by yue on 2/13/17.
 */
import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    codeSnippet: {
        fontFamily: "Fira Mono",
        fontSize: 14
    },
}

class Lines extends React.Component{

    constructor(props){
        super(props);
        this.state={
            openMenu: false
        }
    }

    handleClick(val) {
        console.log(val);
        //if the prev editor is empty, remove the empty line in the next editor
        if(this.props.newCode.length==0){
            this.props.onAddBtnClick('=>'+val.substr(1).trim());
        }else{
            this.props.onAddBtnClick(this.props.newCode+'\n'+'=>'+val.substr(1).trim());
        }
        this.setState({
            openMenu: true,
        });
    }

    render(){
        var diffcontent = this.props.diffcontent;
        var contents = this.props.content;
        var callsiteEntered = this.props.callsiteEntered;
        var importEntered = this.props.importEntered;
        var res = diffcontent.split("\n").map(function(i, index) {

            //method highlighting
            if(callsiteEntered!=''){
                for(var item=0;item<callsiteEntered.length;item++){
                    var customizeMethod = '.'+callsiteEntered[item]+'(';
                    if(i.indexOf(customizeMethod) > -1){
                        //extract the method form line
                        var start = i.indexOf(callsiteEntered[item]);
                        var end = start+callsiteEntered[item].length;
                        var word = i.substring(start, end);
                        //this is exactly what highlight function above does
                        i = i.substring(0,i.indexOf(word))+'<mark>'+i.substring(i.indexOf(word), i.indexOf(word)+word.length)+'</mark>'+
                            i.substring(i.indexOf(word)+word.length);
                        //if line has color
                        if(i.match(/^\+/))
                            return <ListItem
                                    key={index}
                                    primaryText={
                                        <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>
                                    }
                                    innerDivStyle={{padding:0}}
                                    style={styles.codeSnippet}
                                    onClick={() => this.handleClick(i)}
                            />
                        if(i.match(/^\-/))
                            return <ListItem
                                    key={index}
                                    primaryText={
                                        <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>
                                    }
                                    innerDivStyle={{padding:0}}
                                    style={styles.codeSnippet}
                                    onClick={() => this.handleClick(i)}
                            />
                        return <ListItem
                                key={index}
                                primaryText={
                                    <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>}
                                innerDivStyle={{padding:0}}
                                style={styles.codeSnippet}
                                onClick={() => this.handleClick(i)}
                        />
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
                            return <ListItem
                                    key={index}
                                    primaryText={
                                        <pre style={{backgroundColor: '#c8e6c9', marginTop: 0, marginBottom: 0}}>
                                            <code dangerouslySetInnerHTML={{__html: i}}></code></pre>
                                    }
                                    innerDivStyle={{padding:0}}
                                    style={styles.codeSnippet}
                                    onClick={() => this.handleClick(i)}
                            />
                        if(i.match(/^\-/))
                            return <ListItem
                                        key={index}
                                        primaryText={
                                            <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>
                                        }
                                        innerDivStyle={{padding:0}}
                                        style={styles.codeSnippet}
                                        onClick={() => this.handleClick(i)}
                            />
                        return <ListItem
                                key={index}
                                primaryText={
                                    <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: i}}></code></pre>
                                }
                                innerDivStyle={{padding:0}}
                                style={styles.codeSnippet}
                                onClick={() => this.handleClick(i)}
                        />
                    }
                }
            }

            if(i.match(/^\+/))
                return <ListItem
                        key={index}
                        primaryText={
                            <pre style={{backgroundColor:'#c8e6c9',marginTop:0,marginBottom:0}}><code>{i}</code></pre>
                        }
                        innerDivStyle={{padding:0}}
                        style={styles.codeSnippet}
                        onClick={() => this.handleClick(i)}
                />
            if(i.match(/^\-/))
                return <ListItem
                        key={index}
                        primaryText={
                            <pre style={{backgroundColor:'#ffcdd2',marginTop:0,marginBottom:0}}><code>{i}</code></pre>
                        }
                        innerDivStyle={{padding:0}}
                        style={styles.codeSnippet}
                        onClick={() => this.handleClick(i)}
                />
            if(i.includes('@@')){
                var part2 = i.split('@@')[1];
                var expand = '@@'+part2+'@@';
                var endLine = part2.substr(part2.indexOf('+')+1,part2.indexOf(',')-2);
                var beginLine = diffcontent.split("\n")[index-3];
                if(beginLine === ' ') beginLine = diffcontent.split("\n")[index-2];
                var token = contents.split('\n').indexOf(beginLine.substr(1));
                var res = []
                for(var ind=token+3;ind<endLine-1;ind++){
                    res.push(contents.split('\n')[ind])
                }

                var nestedRes = res.join('\n');

                return <ListItem
                    key={index}
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
                    style={styles.codeSnippet}
                />
            }

            else return <ListItem
                key={index}
                primaryText={
                    <pre style={{marginTop:0,marginBottom:0}}><code>{i}</code></pre>
                }
                innerDivStyle={{padding:0}}
                style={styles.codeSnippet}
                onClick={() => this.handleClick(i)}
            />
        }, this);
        return <div>{res}</div>
    }
}

export default Lines;