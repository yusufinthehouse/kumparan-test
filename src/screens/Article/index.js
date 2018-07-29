import React from 'react';
import {
    View,
    ListItem,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
var _ = require('lodash');

import { Item } from './items';
import { Style } from './styles';

import axios from "axios";

class Article extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Article',
        tabBarIcon: () => (<Icon size={24} color="white" name="format-list-bulleted" />)
    };

    state = {
        articles: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this._setNavigationParams();
    }

    componentDidMount() {
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f64de57779254564bbda1bd0dff284c4")
            .then(response => {
                const articles = response.data.response.docs;
                this.setState({ articles });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {

    }

    render() {
        let data  = this.state.articles;
        let order = Object.keys(data)

        return (
            <View style={Style.container} key={this.state.magicKey}>
                <SortableListView
                    style={{ flex: 1 }}
                    disableSorting={this.state.filter_par=="ordering"?false:true}
                    data={data}
                    order={order}
                    onRowMoved={r => {
                        this.props.setRowOrder(r.row.data.key,r.from, r.to);
                        this.forceUpdate()
                    }}
                    renderRow={row => <Item data={row} navigation={this.props.navigation} handleDetail={this._handleDetail} />}
                    sortRowStyle={{ opacity: 1 }}
                />
            </View>
        );
    }

}

function bindAction(dispatch) {
    return {

    };
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, bindAction)(Article);