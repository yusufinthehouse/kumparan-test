import React from 'react';
import {
    View,
    TouchableHighlight,
    ListItem,
    Text,
    TextInput
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
        sort: "newest",
        search: "",
        articles: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this._setNavigationParams();
    }

    componentDidMount() {
        this._getArticles();
    }

    componentWillUnmount() {

    }

    _getArticles = () => {
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f64de57779254564bbda1bd0dff284c4&sort=" + this.state.sort + "&q=" + this.state.search)
            .then(response => {
                const articles = response.data.response.docs;
                this.setState({ articles });
            })
            .catch(error => {
                console.log(error);
            });
    };

    _handleSearch = (text) => {
            this.setState({ search: text }, () => { this._getArticles() });
    };

    _handleSort = () => {
        if (this.state.sort == "newest") {
            this.setState({ sort: "oldest" }, () => { this._getArticles(); });
        } else {
            this.setState({ sort: "newest" }, () => { this._getArticles(); });
        }
    };

    render() {
        let data  = this.state.articles;
        let order = Object.keys(data);

        return (
            <View style={Style.container}>
                <View style={{ flexDirection: "row", backgroundColor: "gray", padding: 10 }}>
                    <View style={{ flexDirection: "row", backgroundColor: "white", padding: 5 }}>
                        <Icon size={24} color="black" name="search" style={{ paddingRight: 10 }} />
                        <TextInput underlineColorAndroid = "transparent"
                                   style={{ width: 200 }}
                                   placeholder = "Search"
                                   placeholderTextColor = "grey"
                                   autoCapitalize = "none"
                                   value={this.state.search}
                                   onChangeText = {this._handleSearch}/>
                    </View>

                    <TouchableHighlight onPress={this._handleSort}>
                        <View style={{ flexDirection: "row", width: 100, paddingHorizontal: 10, padding: 5, backgroundColor: "orange" }}>
                            <Icon size={24} color="white" name={this.state.sort == "newest" ? "keyboard-arrow-up" : "keyboard-arrow-down"} />
                            <Text style={{ paddingTop: 3, fontWeight: "bold" }}>{ this.state.sort == "newest" ? "Newest" : "Oldest" }</Text>
                        </View>
                    </TouchableHighlight>

                </View>

                <SortableListView
                    style={{ flex: 1 }}
                    disableSorting={true}
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