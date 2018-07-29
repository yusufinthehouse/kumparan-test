import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { today } from '../helper/FormatHelper';
import reducer from '../reducers';
import promise from './promise';

const store = createStore(reducer, {}, compose(applyMiddleware(thunk, promise), autoRehydrate()));
//, autoRehydrate()
persistStore(store, { storage: AsyncStorage }, () => {
    console.log("finished autorehydrate");
    //console.log(JSON.stringify(store.getState().JobReducer.jobs));
    var data = {};
    store.dispatch({ type: "DONE_REHIDRATE", data });
    //if (store.getState().JobReducer.jobDate == today() && store.getState().JobReducer.jobs) console.log(JSON.stringify(store.getState()));//this.props.navigation.navigate('jobList');
});

export default store;