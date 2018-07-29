import { Alert, Linking, Platform } from 'react-native';
import apiClient from '../services/apiClient';
import { ENDPOINT } from '../services/endpoints';

export const ACCESS_TOKEN_PENDING = 'ACCESS_TOKEN_PENDING';
export const ACCESS_TOKEN_SUCCESS = 'ACCESS_TOKEN_SUCCESS';
export const ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE';

export const GET_PROFILE_PENDING = 'GET_PROFILE_PENDING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const SET_CLIENT_ID = 'SET_CLIENT_ID';
export const CHANGE_APP_STATE = 'CHANGE_APP_STATE';

export function accessTokenSuccess(data) {
    return { type: ACCESS_TOKEN_SUCCESS, data };
}

export function accessTokenFailure(error) {
    return { type: ACCESS_TOKEN_FAILURE, error };
}

export function accessToken(param) {
    return (dispatch, getState) => {
        dispatch({ type: ACCESS_TOKEN_PENDING, timestamp: Date.now() });
        console.log(ENDPOINT.ACCESS_TOKEN, JSON.stringify(param));
        new apiClient()
            .post(ENDPOINT.ACCESS_TOKEN, param)
            .then((result) => {
                console.log(JSON.stringify(result));
                if (result.error) {
                    dispatch(accessTokenFailure(`${result.error}: ${result.message}`));
                } else {
                    result.data['client_id'] = param.client_id;
                    result.data['secret'] = param.secret;
                    console.log(JSON.stringify(result.data));
                    dispatch(accessTokenSuccess(result.data));
                }
            })
            .catch((error) => {
                let errorMessage = [];
                _.forEach(error.response.data.error[0].message_dev, (value, key) => {
                    errorMessage.push(value[0]);
                });
                Alert.alert(error.response.data.error[0].message, errorMessage.join('\n'));
                dispatch(accessTokenFailure(error));
                // dispatch(replaceAt('signup', { key: 'home' }, getState().cardNavigation.key));// debug only
            });
    };
}

export function getProfileSuccess(data) {
    return { type: GET_PROFILE_SUCCESS, data }; 
}

export function getProfileFailure(error) {
    return { type: GET_PROFILE_FAILURE, error };
}

export function getProfile(param, header) {
    console.log("GET PROFILE CALLED");
    return (dispatch, getState) => {
        dispatch({ type: GET_PROFILE_PENDING, timestamp: Date.now() });
        new apiClient()
            .get(ENDPOINT.RIDER_PROFILE, param, header)
            .then((result) => {
                console.log(JSON.stringify(result));
                if (result.error) {
                    dispatch(getProfileFailure(`${result.error}: ${result.message}`));
                } else {
                    dispatch(getProfileSuccess(result.data));
                }
            })
            .catch((error) => {
                let errorMessage = [];
                _.forEach(error.response.data.error[0].message_dev, (value, key) => {
                    errorMessage.push(value[0]);
                });
                Alert.alert(error.response.data.error[0].message, errorMessage.join('\n'));
                dispatch(getProfileFailure(error));
                // dispatch(replaceAt('signup', { key: 'home' }, getState().cardNavigation.key));// debug only
            });
    };
}

export function getHubInfo(param) {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGIN_PENDING, timestamp: Date.now() });
        new apiClient()
            .clientPosts(ENDPOINT.USER_LOGIN, param)
            .then((result) => {
                if (result.error) {
                    dispatch(userLoginFailure(`${result.error}: ${result.message}`));
                } else {
                    dispatch(userLoginSuccess(result.data));
                    dispatch(replaceAt('login', { key: 'home' }, getState().cardNavigation.key));
                }
            })
            .catch((error) => {
                let errorMessage = [];
                _.forEach(error.response.data.error[0].message_dev, (value, key) => {
                    errorMessage.push(value[0]);
                });
                Alert.alert(error.response.data.error[0].message, errorMessage.join('\n'));
                dispatch(userLoginFailure(error));
                // dispatch(replaceAt('signup', { key: 'home' }, getState().cardNavigation.key));// debug only
            });
    };
}

export function setClientId(param) {
    return (dispatch, getState) => {
        dispatch({ type: SET_CLIENT_ID, data: param });
    };
}

export function changeAppState(param) {
    return (dispatch, getState) => {
        dispatch({ type: CHANGE_APP_STATE, data: param });
    };
}