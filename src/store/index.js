import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { today } from '../helper/FormatHelper';
// import reducer from '../reducers';
import promise from './promise';

const store = createStore(() => {});
//, autoRehydrate()
// persistStore(store, { storage: AsyncStorage }, () => {
//     console.log("finished autorehydrate");
//     var data = {};
//     store.dispatch({ type: "DONE_REHIDRATE", data });
// });

export default store;