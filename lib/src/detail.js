/**
 * Created by yue on 10/24/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

class Detail extends React.Component{

    render() {
    return (
        <ListItem
            primaryText={this.props.commit._version_}
            leftIcon={<ContentInbox />}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem
                    key={0}
                    primaryText={"repo_sni : " + this.props.commit.repo_sni}
                />,
                <ListItem
                    key={1}
                    primaryText={"body_t: " + this.props.commit.c_body_t}
                />,
                <ListItem
                    key={2}
                    primaryText="callsites_added_cs: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_added_cs}/>,
                    ]}
                />,
                <ListItem
                    key={3}
                    primaryText="callsites_added_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_added_t}/>,
                    ]}
                />,
                <ListItem
                    key={4}
                    primaryText="callsites_cs: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_cs}/>,
                    ]}
                />,
                <ListItem
                    key={5}
                    primaryText="callsites_removed_cs: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_removed_cs}/>,
                    ]}
                />,
                <ListItem
                    key={6}
                    primaryText="callsites_removed_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_removed_t}/>,
                    ]}
                />,
                <ListItem
                    key={7}
                    primaryText="callsites_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_callsites_t}/>,
                    ]}
                />,
                <ListItem
                    key={8}
                    primaryText="comments_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_comments_t}/>,
                    ]}
                />,
                <ListItem
                    key={9}
                    primaryText="contents_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_contents_t}/>,
                    ]}
                />,
                <ListItem
                    key={10}
                    primaryText={"date_tdt: "+this.props.commit.c_date_tdt}
                />,
                <ListItem
                    key={11}
                    primaryText={"email_sni: "+this.props.commit.c_email_sni}
                />,
                <ListItem
                    key={12}
                    primaryText={"hash_sni: "+this.props.commit.c_hash_sni}
                />,
                <ListItem
                    key={13}
                    primaryText="imports_added_cs: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_imports_added_cs}/>,
                    ]}
                />,
                <ListItem
                    key={14}
                    primaryText="imports_added_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_imports_added_t}/>,
                    ]}
                />,
                <ListItem
                    key={15}
                    primaryText="imports_removed_cs: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_imports_removed_cs}/>,
                    ]}
                />,
                <ListItem
                    key={16}
                    primaryText="imports_removed_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_imports_removed_t}/>,
                    ]}
                />,
                <ListItem
                    key={17}
                    primaryText="imports_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_imports_t}/>,
                    ]}
                />,
                <ListItem
                    key={18}
                    primaryText="methods_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_methods_t}/>,
                    ]}
                />,
                <ListItem
                    key={19}
                    primaryText={"parents_ss: "+this.props.commit.c_parents_ss}
                />,
                <ListItem
                    key={20}
                    primaryText="patch_no_context_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_patch_no_context_t}/>,
                    ]}
                />,
                <ListItem
                    key={21}
                    primaryText="patch_t: "
                    nestedItems={[
                        <ListItem key={1} primaryText={this.props.commit.c_patch_t}/>,
                    ]}
                />,
                <ListItem
                    key={22}
                    primaryText={"subject_t: "+this.props.commit.c_subject_t}
                />,
                <ListItem
                    key={23}
                    primaryText={"user_sni: "+this.props.commit.c_user_sni}
                />,
                <ListItem
                    key={24}
                    primaryText={"id: "+ this.props.commit.id}
                />,
                <ListItem
                    key={25}
                    primaryText={"name_sni: "+this.props.commit.name_sni}
                />,
            ]}
        />
    );
}
}

export default Detail;