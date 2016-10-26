import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class ListExampleNested  extends React.Component {

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        console.log('test',this.props.commit)
        return (
            <div>
                <div>
                    <List>
                        <Subheader>Nested List Items</Subheader>
                        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                        <ListItem
                            primaryText="Inbox"
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                    primaryText="Starred"
                                    leftIcon={<ActionGrade />}
                                />,
                                <ListItem
                                    key={2}
                                    primaryText="Sent Mail"
                                    leftIcon={<ContentSend />}
                                    disabled={true}
                                    nestedItems={[
                                        <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                                    ]}
                                />,
                            ]}
                        />
                    </List>
                </div>

            </div>
        );
    }
}

ListExampleNested .childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default ListExampleNested;
