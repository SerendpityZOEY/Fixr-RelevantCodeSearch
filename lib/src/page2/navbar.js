/**
 * Created by yue on 1/17/17.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

class Navbar extends React.Component {

    render(){
        return <div>
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        </div>;
    }
}

export default Navbar;