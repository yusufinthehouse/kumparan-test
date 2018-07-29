
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

// import reducer from '../reducers';
import promise from './promise';

export default function configureStore(onCompletion: () => void): any {
    const enhancer = compose(
        applyMiddleware(thunk, promise)
    );

    const store = createStore(() => {});

    persistStore(store, { storage: AsyncStorage }, () => {
        console.log('store ok');
    });

    return store;
}
