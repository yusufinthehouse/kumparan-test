// import React from 'react';
// import { Button, Image, View, StyleSheet, Dimensions } from 'react-native';
// import { ImagePicker } from 'expo';

// export default class CaptureImage extends React.Component {
//     state = {
//         image: null,
//     };
//     componentDidMount = async () => {
//         let result = await ImagePicker.launchCameraAsync({
//             base64: true,
//             quality: 0.5
//         });

//         //console.log(result);
//         this.props.saveProof(result.base64);
//         this.props.navigation.goBack();

//         if (!result.cancelled) {
//             this.setState({ image: result.uri });
//         }
//     }

//     render() {
//         let { image } = this.state;

//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 {image &&
//                     <Image source={{ uri: image }} style={styles.imagePreview} />}
//             </View>
//         );
//     }
// }

// const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//     imagePreview: {
//         width: deviceWidth,
//         height: parseInt(deviceHeight * 0.9)
//     }
// });