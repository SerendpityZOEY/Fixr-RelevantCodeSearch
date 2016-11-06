/**
 * Created by yue on 11/6/16.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class Visualize extends React.Component{

    render(){
        console.log('test parms',this.props.data)

        var tmpCommitObjs = this.props.tmpCommitObjs;
        var compareObjs = this.props.compareObjs;
        var commitContents = this.props.commitContents;
        var numFound = this.props.numFound;
        return <div className="col s12 m7 l7">
            <Tabs>
                <Tab label="Commit Objects" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                    <List id="list">
                        <Subheader>{numFound} results fetched.</Subheader>
                        {tmpCommitObjs}
                    </List>

                </Tab>

                <Tab label="Compare" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                    <div>
                        <Subheader>Compare Versions</Subheader>
                        {compareObjs}
                    </div>
                </Tab>

                <Tab label="Source Code" style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                    <div>
                        <Subheader>Code Snippet</Subheader>
                        {commitContents}
                    </div>
                </Tab>

            </Tabs>
        </div>
    }
}

export default Visualize;