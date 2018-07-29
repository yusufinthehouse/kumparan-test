import React from 'react';
import { TouchableWithoutFeedback, View, Text, Dimensions, TextInput, Platform, Alert } from 'react-native';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SignaturePad from 'react-native-signature-pad-updated';

export default class CaptureSignature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverName: "",
            receiverRelation: "",
            signature: "",
            magicKey: 0
        };
    }

    componentDidMount() {
        console.log("PROPS ON CAPTURE SIGNATURE:" + JSON.stringify(this.props));
        this.setState({
            receiverName: this.props.navigation.state.params.data.name
        })
    }

    _signaturePadError = (error) => {
        console.log("ada error");
    };

    _saveSignature = () => {
        if (this.state.receiverName == "" || this.state.signature == "") {
            Alert.alert(
                '',
                `All Field required`
            );
        }
        else {
            var data = {
                signature: this.state.signature,
                receiverName: this.state.receiverName,
                // receiverRelation: this.state.receiverRelation,
            }
            this.props.saveSignature(data);
            this.props.navigation.goBack();
        }

    }

    _signaturePadChange = ({ base64DataUrl }) => {
        console.log(base64DataUrl);
        this.setState({ signature: base64DataUrl });
        console.warn("Got new signature: OK");
    };

    _handleClear() {
        this.setState({
            receiverName: "",
            receiverRelation: "",
            magicKey: Math.random()
        });
    }

    render = () => {
        return (
            <View style={{ flex: 1 }} key={this.state.magicKey}>
                {/* <View style={{ flexDirection: 'row', justifyContent: "center", backgroundColor: "#f7a34c", paddingVertical: 5 }}>
                    <Text style={{ color: "#fff" }}>SIGN HERE</Text>
                </View> */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput
                            style={styles.searchLeft}
                            onChangeText={(text) => { this.setState({ receiverName: text }) }}
                            placeholder="Enter recipient's name"
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
                {/* <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput
                            style={styles.searchLeft}
                            onChangeText={(text) => { this.setState({ receiverRelation: text }) }}
                            placeholder="Relationship"
                            value={this.state.receiverRelation}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View> */}

                <View style={styles.sign}>
                    <View><Text style={{ color: 'grey', fontWeight: 'bold' }}>Please Sign Below</Text></View>
                </View>

                <SignaturePad onError={this._signaturePadError}
                    onChange={this._signaturePadChange}
                    style={{ flex: 1, backgroundColor: 'white' }}
                    defaultHeight={Dimensions.get('window').height}
                    defaultWidth={Dimensions.get('window').width}
                />

                <View style={{ flex: 1, backgroundColor: '#dedee0', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 5 }}>
                        <TouchableWithoutFeedback style={{ alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ alignItems: 'center' }}>
                                {/* <FontAwesome name="arrow-left" size={25} color='#e91a22' /> */}
                                <Text style={{ color: '#a4a4a5' }}>Cancel</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{ alignItems: 'center' }} onPress={() => this._handleClear()}>
                            <View style={{ alignItems: 'center' }}>
                                {/* <FontAwesome name="close" size={25} color='#e91a22' /> */}
                                <Text style={{ color: '#a4a4a5' }}>Clear</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this._saveSignature()}>
                            <View style={{ alignItems: 'center' }}>
                                {/* <FontAwesome name="check" size={25} color='#a0cb39' /> */}
                                <Text style={{ color: '#a4a4a5' }}>Done</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    };

}

const styles = {
    header: {
        flexDirection: "row",
        backgroundColor: '#df1f2b',
        height: (Platform.OS === 'ios') ? 30 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        ...Platform.select({
            ios: {
                height: 40,
            },
            android: {
                height: 40,
            }
        }),
    },
    search: {
        flex: 9,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 30,
        borderRadius: 5,
    },
    searchLeft: {
        ...Platform.select({
            android: {
                paddingTop: 5,
            }
        }),
        height: 30,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        flex: 1
    },
    rating: {
        backgroundColor: '#df1f2b',
        height: (Platform.OS === 'ios') ? 30 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        ...Platform.select({
            ios: {
                height: 60,
            },
            android: {
                height: 60,
            }
        }),
    },
    sign: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        height: (Platform.OS === 'ios') ? 30 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        ...Platform.select({
            ios: {
                height: 25,
            },
            android: {
                height: 25,
            }
        }),
    }
};