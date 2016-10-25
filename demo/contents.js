/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
/*Syntax Highlighting*/
import Highlight from 'react-highlight';
import {PrismCode} from "react-prism";

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

class Contents extends React.Component{
    render(){
    var commit = this.props.commit;
    var add = [];
    var remove = [];
    var patch = [];
    var code = [];
    var prev = [];
    var query = this.props.data;

    commit.c_patch_t[0].split("\n").forEach( function (line, index) {
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
    return(<div>
            <Highlight className="java">{commit.c_patch_t}</Highlight>
        </div>
    )
    }
}

export default Contents;
