/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    table:{
        fontSize:12
    },
    customWidth: {
        paddingLeft: 9,
    },
    listItemAdded:{
        backgroundColor:'#c8e6c9'
    },
};

class FieldList extends React.Component{
    render(){
        var commit = this.props.commit;
        var fields = Object.keys(commit);

        return(

            <ListItem
                primaryText={'Click to view details'}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <div dangerouslySetInnerHTML={{__html: '<ul>'+
                    fields.map(function(result) {
                        return '<li>'+
                            '<p style="padding:10px;word-wrap: break-word;word-break: break-all;white-space: normal;">'+
                            '<b>'+result+':'+'</b>'+
                            commit[result]+'</p>'+'</li>';
                    })
                    +'</ul>'}} />
                ]}
            />
        )
    }
}

export default FieldList;