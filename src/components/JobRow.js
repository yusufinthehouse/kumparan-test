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
// import { Ionicons } from '@expo/vector-icons';
import { money, readableCompleteDate, getTimeOnly } from '../helper/FormatHelper'

const window = Dimensions.get('window');

class JobRow extends React.Component {

  state = {
    jobDetail: false
  }

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
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
    //console.log(JSON.stringify(data));
    var colorIcon = "#FFFF00";
    switch (data.priority) {
      case 1:
        colorIcon = "#FF0000";
        break;
      case 2:
        colorIcon = "#FFFF00";
        break;
      case 3:
        colorIcon = "#00FF00";
        break;
      case 4:
        colorIcon = "#0000FF";
        break;
    }

    /* var docNumber = "";
    if (data.items && data.type == "pickup") {
      data.items.forEach((item, index) => {
        docNumber += item.sku + " ";
      });
    } else {
      data.items.forEach((item, index) => {
        docNumber += item.awb + " ";
      });
    } */

    return (
      <View>
        <TouchableHighlight
          underlayColor={'#eee'}
          delayLongPress={500}
          //style={{ ...styles.row, backgroundColor: data.rowColor }}
          style={{
            backgroundColor: data.read ? '#ffffff' : '#fde5e7',
            paddingTop: 10
          }}
          {...sortHandlers}
          onPress={() => this.props.handleDetail(data)}
        >
          <View>
            <View style={{ flex: 2, flexDirection: 'row', width: window.width }}>

              <Text style={{
                fontSize: 12,
                marginLeft: 20
              }}>{data.name ? data.name.substring(0, 21) : ''}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{
                  borderColor: 'red',
                  borderWidth: 1,
                  paddingLeft: 2,
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: 'red',
                  borderRadius: 2,
                }}>X {data.attemptHistory ? data.attemptHistory.length : 0}</Text>
                <Text style={{
                  borderColor: 'rgb(175, 207, 87)',
                  borderWidth: 1,
                  paddingLeft: 2,
                  borderRadius: 2,
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginLeft: 5,
                  color: 'rgb(175, 207, 87)'
                }}>{data.type}</Text>
                <Text style={{
                  fontSize: 11,
                  marginRight: 20,
                  marginLeft: 10
                }}>{getTimeOnly(data.time)}</Text>
              </View>

            </View>
            <View style={{ flexDirection: 'row', width: window.width }}>
              <View style={{
                width: 20, justifyContent: 'center', alignItems: 'center'
              }}>
                {/* <Ionicons name='ios-information-circle' size={15} color={colorIcon} /> */}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 18,
                  color: '#3f4042'
                }}>{data.address}</Text>
              </View>

              <View style={{ width: 20, justifyContent: 'center', alignItems: 'center' }} />

            </View>
            <View style={{ flexDirection: 'row', width: window.width }}>
              <View style={{ width: 20, justifyContent: 'center', alignItems: 'center' }} />

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
                <Text style={{
                  fontSize: 10
                }}>{data.tracking[0]}</Text>
                <Text style={{
                  fontSize: 10,
                  fontStyle: 'italic'
                }}>{data.clientName}</Text>
              </View>

              <View style={{ width: 20, justifyContent: 'center', alignItems: 'center' }} />

            </View>
            <View style={{ flexDirection: 'row', width: window.width }}>
              <View style={{ width: 20, justifyContent: 'center', alignItems: 'center' }} />

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
                <Text style={{
                  fontSize: 15
                }}>{data.codAmmount ? `COD Rp. ${money(data.codAmmount)}` : 'Non COD'}</Text>
                <Text style={{
                  fontSize: 15,
                  fontStyle: 'italic'
                }}>{data.isSubmitted ? "submitted" : data.status}</Text>
              </View>

              <View style={{ width: 20, justifyContent: 'center', alignItems: 'center' }} />

            </View>
          </View>
        </TouchableHighlight>
        {this._renderHr()}
      </View>
    );
  }
}

const styles = {
  row: {
    backgroundColor: '#fde5e7',//fde5e7
    paddingTop: 10
  },
}

export { JobRow };