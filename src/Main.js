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

import Article from 'kumparantest/src/screens/Article/index';
import ArticleDetail from 'kumparantest/src/screens/ArticleDetail/index';
import Book from 'kumparantest/src/screens/Book/index';

const MainNavigator = StackNavigator({
    Main: {
      screen: TabNavigator({
        Article: { screen: Article },
        Book: { screen: Book }
      }, {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          bottomNavigationOptions: {
            labelColor: 'white',
            rippleColor: 'white',
            tabs: {
              Article: {
                barBackgroundColor: '#37474F'
              },
              Book: {
                barBackgroundColor: '#df1f2b'
              }
            }
          }
        }
      })
    },
    Detail: {
      screen: StackNavigator({
        ArticleDetail: { screen: ArticleDetail }
      }, {
        headerMode: 'screen',
        gesturesEnabled: false,
      })
    }
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
