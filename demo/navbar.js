/**
 * Created by yue on 8/16/16.
 */
import React from 'react';

class Navbar extends React.Component{
    render(){
        return <nav className="deep-purple">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo center">Fixr Demo</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
        </nav>
    }
}

export default Navbar;