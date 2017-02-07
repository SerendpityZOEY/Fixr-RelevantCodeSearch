import React from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/clike/clike');

const Editor = React.createClass({
    getInitialState: function() {
        return {
            code: 'import java.util.*;',
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode,
        });
    },
    render: function() {
        var options = {
            lineNumbers: true,
            mode: 'clike',
        };
        return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options}/>
    }
});

export default Editor;