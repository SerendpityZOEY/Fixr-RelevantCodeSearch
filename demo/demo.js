import React from 'react';

MyComponents.Detail = React.createClass({

  render: function() {
    return (
        <li className="collection-item black-text">
          <p><b>Version:</b> {this.props.commit._version_}</p>
          <p><b>Commit: </b>{this.props.commit.commit}</p>
          <p><b>Committer Name: </b>{this.props.commit.committerName}</p>
          <p><b>Author Name: </b>{this.props.commit.authorName__}</p> </li>
    );
  }
});

class SolrConnectorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solrSearchUrl: "http://localhost:8983/solr/gettingstarted/select",
      query: "*:*",
      filter: "",
      fetchFields: ""
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let searchParams = {
      solrSearchUrl: this.state.solrSearchUrl,
      query: this.state.query,
      filter: [this.state.filter],
      fetchFields: this.state.fetchFields.split(" "),
      offset: 0,
      limit: 10,
      highlightParams: {
        "hl": "true",
        "hl.fl": "name manu",
        "hl.snippets": 1,
        "hl.fragsize": 500
      }
    };
    this.props.doSearch(searchParams);
  }



  render() {

    var commitObjs;
    if(this.props.solrConnector.response!=null){
      console.log('see',this.props.solrConnector.response.response.docs);

      commitObjs = this.props.solrConnector.response.response.docs.map(function(s,i){
        return <MyComponents.Detail commit={s} key={i}/>
      });

    }else{
      commitObjs = 'null'
    }

    return <div>
      <div className="row">
        <div className="col s10 push-s1">
      <form className="inputForm" onSubmit={this.onSubmit.bind(this)}>
        <h4>searchParams:</h4>
        <div className="col s6">
        <p>
          solrSearchUrl: {" "}
          <input type="text" value={this.state.solrSearchUrl}
            onChange={e => {this.setState({ solrSearchUrl: e.target.value })}} />
        </p>
        </div>
        <div className="col s6">
        <p>
          query: {" "}
          <input type="text" value={this.state.query}
            onChange={e => {this.setState({ query: e.target.value })}} />
          {" "}
          </p>
        </div>
        <div className="col s6">
        <p>
          filter: {" "}
          <input type="text" value={this.state.filter}
            onChange={e => {this.setState({ filter: e.target.value })}} />
        </p>
        </div>
        <div className="col s6">
        <p>
          fetchFields: {" "}
          <input type="text" value={this.state.fetchFields}
            onChange={e => {this.setState({ fetchFields: e.target.value })}} />
        </p>
        </div>
        <p>
          <button className="waves-effect waves-light btn" type="submit">Search</button>
        </p>
      </form>
          </div>
      </div>

      <div className="row">
        <div className="col s10 push-s1">
        <div className="card black lighten-1">
          <div className="row">
            <div className="col s12">
              <div className="card black darken-2">
                <div className="card-content white-text">
                  <ul className="collection white-text">
                    {commitObjs}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>;
  }
}

export default SolrConnectorDemo;
