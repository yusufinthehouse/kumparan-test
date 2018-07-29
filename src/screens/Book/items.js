import React from 'react';
import {
    View,
    Platform,
    Animated,
    Dimensions,
    Easing,
    Text,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { money, readableCompleteDate, getTimeOnly } from 'KumparanTest/src/helper/FormatHelper'

const window = Dimensions.get('window');

class Item extends React.Component {

    state = {
        jobDetail: false
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 100,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    _handleDetail = (data) => {
        this.props.navigation.navigate('JobDetail', { data });
    }

    render() {
        const { data, sortHandlers } = this.props;
        return (
            <View>
                <TouchableHighlight
                    underlayColor={'#eee'}
                    delayLongPress={500}
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#bbb'
                    }}
                    {...sortHandlers}
                    onPress={() => this._handleDetail(data)}
                >
                    <View style={{ flex:1, flexDirection: 'row' }}>
                        <Icon size={75} color="black" name="book" />

                        <View style={{ flex: 1, flexDirection: 'column', width: window.width, marginLeft:20, marginTop: 5 }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>{ data.title }</Text>
                            <Text>&emsp;</Text>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: 'bold'
                            }}>{ data.author }</Text>
                            <Text>&emsp;</Text>
                            <Text style={{
                                fontSize: 10,
                                color: '#3f4042'
                            }}>{ data.description }</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export { Item };