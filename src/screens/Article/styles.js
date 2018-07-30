import { Platform, StatusBar } from 'react-native';

export const Style = {
    header: {
        flexDirection: "row",
        backgroundColor: '#df1f2b',
        height: (Platform.OS === 'ios') ? 60 : 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        ...Platform.select({
            ios: {
                height: 60,
            },
            android: {
                height: 60,
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
                paddingTop: 10,
            }
        }),
        height: 30,
        marginLeft: 5,
        marginBottom: 8,
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        backgroundColor: '#eee',
    },
    summary: {
        flexDirection: "row",
        backgroundColor: '#df1f2b',
        height: (Platform.OS === 'ios') ? 30 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        ...Platform.select({
            ios: {
                height: 30,
            },
            android: {
                height: 30,
            }
        }),
    },
};