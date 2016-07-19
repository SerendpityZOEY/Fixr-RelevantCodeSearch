var actions=[]

function render_nav(){
    ReactDOM.render(
        <MyComponents.NavBar
            actions={actions}/>,
        $('#navbar').get(0)
    )
}


render_nav()
