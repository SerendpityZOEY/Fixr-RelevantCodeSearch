/**
 * Created by yue on 8/16/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import searchPanel from './searchpanel.js';

const styles = {
    wholeBar: {
        backgroundColor:'#5e35b1'
    },
    title: {
        textAlign:'center'
    }
}
class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle(){
        this.setState({open: !this.state.open})
    }

    handleClose(){
        this.setState({open: false});
    }

    render(){

        return   <div>
        <AppBar
            title="Fixr Relevant Code Search"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={styles.wholeBar}
            titleStyle={styles.title}
            onLeftIconButtonTouchTap={e => this.handleToggle(open)}
        />
        <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        >
            <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        </div>
    }
}

export default Navbar;