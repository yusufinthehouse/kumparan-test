import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import {
    Filter,
    ItemList,
    JobList,
    JobDetail,
    Profile,
    SignIn,
    SignScan
} from './screens';

if (Platform.OS === 'android') {
    StatusBar.setHidden(true);
}

const Job = StackNavigator({
    jobList: { screen: JobList },
    filter: { screen: Filter },
    jobDetail: { screen: JobDetail },
    itemList: { screen: ItemList },

}, { headerMode: 'screen' })

export default MainNavigator = TabNavigator({
    auth: {
        screen: StackNavigator({
            signIn: { screen: SignIn },
            signScan: { screen: SignScan }
        }, { headerMode: 'none' })
    },
    main: {
        screen: TabNavigator({
            job: { screen: Job },
            profile: { screen: Profile }
        },
            {
                tabBarPosition: 'bottom',
                swipeEnabled: false
            })
    }
},
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false
    }
);