import React from 'react'; 
import { 
  Image,
  Platform,
  StatusBar,
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { Provider } from 'react-redux';
import store from './store';

import Article from 'KumparanTest/src/screens/Article/index';
import Book from 'KumparanTest/src/screens/Book/index';

const MainNavigator = StackNavigator({
    // Home: { screen: Home },
    Main: {
      screen: TabNavigator({
        Job: { screen: Article },
        JobComplete: { screen: Book }
      }, {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: 'white',
            tabs: {
              Job: {
                barBackgroundColor: '#37474F'
              },
              JobComplete: {
                barBackgroundColor: '#df1f2b'
              }
            }
          }
        }
      })
    },
    // Detail: {
    //   screen: StackNavigator({
    //     JobDetail: { screen: JobDetail },
    //     ProofPhoto: { screen: ProofPhoto },
    //     ProofSignature: { screen: ProofSignature }
    //   }, {
    //     headerMode: 'screen',
    //     gesturesEnabled: false,
    //   })
    // }
}, {
    headerMode: 'none',
    swipeEnabled: false,
    lazy: true,
}); 
  
export default class Main extends React.Component {
  render() {
    return ( 
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    ); 
  }
}
