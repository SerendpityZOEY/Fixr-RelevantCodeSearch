/**
 * Created by yue on 8/16/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

const styles = {
    wholeBar: {
        backgroundColor:'#5e35b1',
        height:50,
    },
    title: {
        textAlign:'center',
        height:50,
        lineHeight:'50px',
    }
}

class Navbar extends React.Component{

    render(){

        return <AppBar
            title="Fixr"
            style={styles.wholeBar}
            titleStyle={styles.title}
            showMenuIconButton={false}
        />
    }
}

export default Navbar;