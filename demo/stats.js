import React from 'react';
import ReactDOM from 'react-dom';
import SolrConnector from 'react-solr-connector';
import SearchResult from './diff.js';

class SimpleBarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchParams: null,
        }
    }

    doSearch(searchParams) {
        this.setState({searchParams});
    }


    render () {

        return (
            <div>
                <SolrConnector searchParams={this.state.searchParams}>
                    <SearchResult doSearch={this.doSearch.bind(this)}/>
                </SolrConnector>
            </div>
        );
    }
}

ReactDOM.render(
    <SimpleBarChart />,
    document.getElementById('container')
);

export default SimpleBarChart;
