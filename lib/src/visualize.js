import React from 'react';

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

class Compare extends React.Component{
    render(){
        return <table>
            <thead>
            <tr>
                <th data-field="id">Props</th>
                <th data-field="name">Previous</th>
                <th data-field="price">Current</th>
            </tr>
            </thead>

            <tbody style={styles.table}>
            <tr>
                <td>
                    user_sni
                </td>
                <td>
                    {this.props.commit.p_user_sni}
                </td>
                <td>
                    {this.props.commit.c_user_sni}
                </td>
            </tr>

            <tr>
                <td>
                    email_sni
                </td>
                <td>
                    {this.props.commit.p_email_sni}
                </td>
                <td>
                    {this.props.commit.c_email_sni}
                </td>
            </tr>

            <tr>
                <td>
                    hash_sni
                </td>
                <td>
                    {this.props.commit.p_hash_sni}
                </td>
                <td>
                    {this.props.commit.c_hash_sni}
                </td>
            </tr>

            <tr>
                <td>
                    date_tdt
                </td>
                <td>
                    {this.props.commit.p_date_tdt}
                </td>
                <td>
                    {this.props.commit.c_date_tdt}
                </td>
            </tr>

            </tbody>
        </table>
    }
}

export default Compare;
