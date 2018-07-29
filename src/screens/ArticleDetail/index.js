import React from 'react';
import {
    WebView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    Alert,
    Linking,
    Image,
    BackHandler
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

class ArticleDetail extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        tabBarVisible: false,
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#df1f2b' },
        headerLeft: <Icon name={'arrow-back'} size={24} style={{ marginLeft: 10 }} color="white" onPress={ () => { navigation.navigate('Article') } } />,
        headerRight: null,
        title: 'Article Detail'
    });

    constructor(props) {
        super(props);
    }

    state = {
        visibleModal: null,
        data: {},
        magicKey: 0,
        locationResult: null,
    }

    componentWillReceiveProps() {}

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            this.props.navigation.navigate('Article');
            return true;
        }.bind(this));
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    render() {
        params = this.props.navigation.state.params;
        if (!params) {
            return <Text>Please access this page from article list first</Text>;
        } else {
            data = params.data;

            console.log(data.web_url);

            return (
                <WebView source={{uri: data.web_url}} style={{ flex: 1 }} />
            );
        }

    }
}

function bindAction(dispatch) {
    return {
        // failedJob: (job_id, reason_id, client_id) => dispatch(failedJob(job_id, reason_id, client_id)),
        // successJob: (job_id, client_id) => dispatch(successJob(job_id, client_id))
    };
}

const mapStateToProps = state => ({
    // auth: state.AuthReducer,
    // job: state.JobReducer,
});

export default connect(mapStateToProps, bindAction)(ArticleDetail);