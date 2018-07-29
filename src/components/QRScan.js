import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';


class QRScan extends React.Component {
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this.props.handleBarCodeRead}
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            >
              <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <Text style={{ color: "#fff", fontSize: 20, marginTop: 50 }}>Scan QR Code</Text>
                <View style={{ width: 200, height: 200, borderStyle: 'solid', borderWidth: 1, borderColor: "red" }}></View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                  <View>
                    <Text style={{ color: "#fff", fontSize: 20, marginBottom: 50 }}>Cancel</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>




            </BarCodeScanner>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export { QRScan };