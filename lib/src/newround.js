/**
 * Created by yue on 2/13/17.
 */
import React from 'react';
import SolrConnector from 'react-solr-connector';
import Visualize from './visualize.js';

class NewRound extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchParams: null,
        }
    }

    doSearch(searchParams) {
        this.setState({searchParams});
    }

    render(){
        return <div>
            <SolrConnector searchParams={this.state.searchParams}>
                <Visualize doSearch={this.doSearch.bind(this)}/>
            </SolrConnector>
        </div>
    }
}

export default NewRound;