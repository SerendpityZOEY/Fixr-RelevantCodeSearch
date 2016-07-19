'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SolrConnector = function (_React$Component) {
  _inherits(SolrConnector, _React$Component);

  function SolrConnector(props) {
    _classCallCheck(this, SolrConnector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SolrConnector).call(this, props));

    _this.state = {
      searchParams: props.searchParams,
      busy: false,
      error: null,
      response: null
    };
    return _this;
  }

  /*
   * When the component mounts, do an initial search.
   */


  _createClass(SolrConnector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.searchParams) {
        this.doSearch(this.props.searchParams);
      }
    }

    /*
     * something has changed. Update the search results.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.searchParams) {
        this.doSearch(newProps.searchParams);
      }
    }
  }, {
    key: 'doSearch',
    value: function doSearch(searchParams) {
      var _this2 = this;

      if (searchParams.query) {
        this.setState({ busy: true, error: null, searchParams: searchParams });
        var params = Object.assign({ wt: "json" }, searchParams.highlightParams);
        var solrParams = {
          offset: searchParams.offset,
          limit: searchParams.limit,
          query: searchParams.query,
          filter: searchParams.filter,
          fields: searchParams.fetchFields,
          facet: searchParams.facet,
          params: params
        };

        var reqBody = JSON.stringify(solrParams);

        // do the search. 'post' is required with a fetch() body. Solr doesn't mind
        fetch(searchParams.solrSearchUrl, {
          method: 'post',
          body: reqBody,
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw response.status + " " + response.statusText;
          }
        }).then(function (response) {
          _this2.setState({ busy: false, error: null, response: response });
        }).catch(function (error) {
          _this2.setState({ busy: false, error: "" + error, response: null });
        });
      } else {
        // no search to perform
        this.setState({ busy: false, error: null, response: null });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var solrConnector = {
        searchParams: this.state.searchParams,
        busy: this.state.busy,
        error: this.state.error,
        response: this.state.response
      };

      var clones = _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, { solrConnector: solrConnector });
      });

      return _react2.default.createElement(
        'div',
        null,
        clones
      );
    }
  }]);

  return SolrConnector;
}(_react2.default.Component);

SolrConnector.propTypes = {
  searchParams: _react2.default.PropTypes.object
};

exports.default = SolrConnector;