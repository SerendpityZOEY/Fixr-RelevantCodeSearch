class NavBar extends React.Component {
    render() {
        return (
            <nav className="deep-purple">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Demo</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        );
    }
}
MyComponents.NavBar = NavBar