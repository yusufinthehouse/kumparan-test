import React from 'react';
import {  BackAndroid, View, Platform, TextInput, TouchableWithoutFeedback, Text, ListView, ListItem, TouchableHighlight,RefreshControl } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
var _ = require('lodash');
import { NavigationActions } from 'react-navigation';

import { Item } from './items';
import { Style } from './styles';
import axios from "axios/index";

class Book extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Book',
        tabBarIcon: () => (<Icon size={24} color="white" name="book" />)
    }

    state = {
        books: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this._setNavigationParams();
    }

    componentDidMount() {
        axios
            .get("https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=f64de57779254564bbda1bd0dff284c4")
            .then(response => {
                const books = response.data.results;
                console.log(books);
                this.setState({ books });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {

    }

    render() {

        let data  = this.state.books;
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
        // markAsRead: (job_id, client_id) => dispatch(markAsRead(job_id, client_id)),
        // getJobList: (client_id) => dispatch(getJobList(client_id)),
        // submitJob: () => dispatch(submitJob()),
        // setRowOrder:(key,from,to) => dispatch(setRowOrder(key,from,to)),
        // setFetching:(par)=> dispatch(setFetching(par))
    };
}

const mapStateToProps = state => ({
    auth: state.AuthReducer,
    job: state.JobReducer,
});

export default connect(mapStateToProps, bindAction)(Book);