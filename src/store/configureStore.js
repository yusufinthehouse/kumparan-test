
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from '../reducers';
import promise from './promise';
import apiClient from '../api/apiClient';
import { ENDPOINT } from '../api/endpoints';

export default function configureStore(onCompletion: () => void): any {
    const enhancer = compose(
        applyMiddleware(thunk, promise)
    );

    const store = createStore(reducer, enhancer, autoRehydrate());

    persistStore(store, { storage: AsyncStorage }, () => {
        console.log('store ok');
    });

    return store;
}
