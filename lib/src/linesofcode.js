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
            multiSelection: false,
        }
    }

    handleClick(val) {

        function PriorityQueue() {
            this.data = []
        }

        PriorityQueue.prototype.push = function(element, priority) {
            priority = +priority;
            for (var i = 0; i < this.data.length; i++){
                if(this.data[i][0]==element){
                    this.data.splice(i,1);
                }
            }
            for (var i = 0; i < this.data.length && this.data[i][1] < priority; i++);
            this.data.splice(i, 0, [element, priority])
        };

        PriorityQueue.prototype.pop = function() {
            return this.data.shift()[0]
        };

        PriorityQueue.prototype.size = function() {
            return this.data.length
        };

        function uniq(a) {
            var seen = {};
            var out = [];
            var len = a.length;
            var j = 0;
            for(var i = 0; i < len; i++) {
                var item = a[i];
                if(seen[item] !== 1) {
                    seen[item] = 1;
                    out[j++] = item;
                }
            }
            return out;
        }

        function containsAny(str, substrings) {
            for (var i = 0; i != substrings.length; i++) {
                var substring = substrings[i].slice(0,-2);
                if(substring.includes('.')) substring = substring.substr(substring.indexOf('.'));
                if (str.indexOf(substring) != - 1) {
                    console.log('substr', substring)
                    return substring;
                }
            }
            return null;
        }

        var input = this.removeUnused(this.props.newCode); //rm unused when open a new editor

        //if the prev editor is empty, remove the empty line in the next editor
        if(this.props.newCode.length==0 && this.state.multiSelection==false && this.props.lastAction==''){
            this.props.onAddBtnClick('//'+val.substr(1).trim(), 'off', 'lines', this.props.lineNum);
            this.setState({
                multiSelection: true,
            })
        }else if(this.props.newCode.length>0 && this.state.multiSelection==false && this.props.lastAction==''){ //first time selection
            //code from prev editor needs rank
            input = input.split('\n');
            input = uniq(input);
            console.log('inputs',input);
            var pq = new PriorityQueue();

            this.props.diffcontent.split("\n").forEach( function(line, index){
                if(containsAny(line,input)!=null){
                    //console.log('line and input', line, input);
                    input.forEach( function( item, inx){
                        //if(item.includes('.')) item = item.substr(item.indexOf('.'));
                        if(line.includes(item.slice(0,-2))){
                            //input.splice(inx,1)
                            pq.push(item,index);
                        }
                    })
                }
                if(line.includes(val)) pq.push('//'+val.substr(1).trim(),index)
            })

            var res = '';
            while(pq.size()){
                res+=pq.pop()+'\n';
            }

            this.props.onAddBtnClick(res, 'off', 'lines', this.props.lineNum);
            this.setState({
                multiSelection: true,
            })
        }else{ //add lines to suggestions from fix & prev selected lines
            var CodefromFix = this.props.newCode.split('\n');
            var ptr=0; var queue = new PriorityQueue();
            console.log('code from fix',CodefromFix);
            this.props.diffcontent.split("\n").forEach( function(line, index){
                if(ptr<CodefromFix.length && CodefromFix[ptr].length>0 && (line.includes(CodefromFix[ptr].substr(2)) ||
                    line.includes(CodefromFix[ptr].substr(0,CodefromFix[ptr].indexOf('('))))
                ){
                    console.log('hitt',CodefromFix[ptr]);
                    if(CodefromFix[ptr+1]!='' && CodefromFix[ptr].includes(CodefromFix[ptr+1])) {
                        console.log('hit',CodefromFix[ptr],'next',CodefromFix[ptr+1])
                        queue.push(CodefromFix[ptr+1],index);
                        ptr+=1;
                    }
                    else queue.push(CodefromFix[ptr],index);
                    ptr+=1;
                }
                if(line.includes(val)) queue.push('//'+val.substr(1).trim(),index)
            })
            var res = '';
            while(queue.size()){
                res+=queue.pop()+'\n';
            }
            this.props.onAddBtnClick(res, 'on', 'lines', this.props.lineNum);
        }
    }

    removeUnused(prevCode){
        var res = [];
        prevCode.split('\n').forEach( function (line, index){
            console.log('line', line);
            if(line.substr(0,2)!='//')
                res.push(line)
        });
        return res.join("\n").substr(-1)==='\n'? res.join("\n").slice(0,-1):res.join("\n");
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
                    var customizeMethod = callsiteEntered[item]+'(';
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