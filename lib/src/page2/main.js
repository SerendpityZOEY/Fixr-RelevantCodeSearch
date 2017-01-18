/**
 * Created by yue on 1/17/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar.js';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

class Appt extends React.Component {

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {

        return <div>
            <Navbar/>
        </div>;
    }
}

Appt.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<Appt/>, document.getElementById('appt'));
