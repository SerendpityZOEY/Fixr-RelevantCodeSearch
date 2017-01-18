import React from 'react';
/*Syntax Highlighting*/
import Highlight from 'react-highlight';
import {PrismCode} from "react-prism";
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class Contents extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedCommit:1,
        }
    }

    handleChange(event, index, value){
        event.preventDefault();
        this.setState({
            selectedCommit:value,
        })
    };


    render(){
        var commit = this.props.commit[this.state.selectedCommit];
        var add = [];
        var remove = [];
        var patch = [];
        var code = [];
        var prev = [];
        var query = this.props.data;
/*
        commit.c_contents_t[0].split("\n").forEach( function (line, index) {
            if (line.length > 0) {
                //patch.push(line.substring(1))
                patch.push(line);
            }
            if (line.match(/^\+/)) {
                add.push(index);
                code.push(line+'\n');
            }
            if (line.match(/^\-/)) {
                //line.insertRule("#blanc { color: red }", index+1);
                remove.push(index);
            }
        });
*/
        var menuItems = this.props.commit.map(function(s,i){
            return <MenuItem value={i} primaryText={s.name_sni} key={i}/>
        });

        var codeContents = commit.c_contents_t[0];

        return(
            <div>
                <DropDownMenu value={this.state.selectedCommit} onChange={this.handleChange.bind(this)}>
                    {menuItems}
                </DropDownMenu>
                <Highlight className="java">{codeContents}</Highlight>

            </div>
        )
    }
}

export default Contents;
