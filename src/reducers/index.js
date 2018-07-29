import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import JobReducer from './JobReducer';

export default combineReducers({
    AuthReducer,
    JobReducer,
});
