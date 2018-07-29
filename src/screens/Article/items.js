import React from 'react';
import {
    View,
    Platform,
    Animated,
    Dimensions,
    Easing,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get('window');

class Item extends React.Component {

    state = {
        articleDetail: false
    };

    _handleDetail = (data) => {
        this.props.navigation.navigate('ArticleDetail', { data });
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

                        { data.multimedia.length < 1 &&
                            <Icon size={75} color="black" name="today" />
                        }

                        { data.multimedia.length > 0 &&
                            <Image source={{ uri: "https://www.nytimes.com/" + data.multimedia[0].url }} style={{ width: 75 }} />
                        }

                        <View style={{ flex: 1, flexDirection: 'column', width: window.width, marginLeft:20, marginTop: 5 }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>{ data.headline.print_headline != null ? data.headline.print_headline : data.headline.main }</Text>
                            <Text>&emsp;</Text>
                            <Text style={{
                                fontSize: 10,
                                color: '#3f4042'
                            }}>{ data.abstract }</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export { Item };