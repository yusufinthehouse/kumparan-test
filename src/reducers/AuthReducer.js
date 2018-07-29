import {
    ACCESS_TOKEN_PENDING,
    ACCESS_TOKEN_SUCCESS,
    ACCESS_TOKEN_FAILURE,
    GET_PROFILE_PENDING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    SET_CLIENT_ID,
    CHANGE_APP_STATE,
} from '../actions/AuthActions';

const initialState = {
    isFetching: false,
    timestamp: null,
    error: null,
    appState: null,
    doneRehidrate: false,
    access_token: "",
    token_type: "",
    expires_in: 0,
    client_id: "",
    secret: "",
    header: "",
    profile: {
        name: "",
        type: "",
        hub: "",
        hub_code: "",
        hub_phone: ""
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "DONE_REHIDRATE": {
            console.log("DONE REHIDRATE");
            return {
                ...state,
                doneRehidrate: true,
            }
        }
        case CHANGE_APP_STATE: {
            console.warn("CHANGE_APP_STATE" + JSON.stringify(action.data));
            return {
                ...state,
                appState: action.data.appState,
            }
        }
        case SET_CLIENT_ID: {
            console.log("set client id");
            console.log(action.data.secret);
            return {
                ...state,
                client_id: action.data.client_id,
                secret: action.data.secret
            }
        }
        case ACCESS_TOKEN_PENDING: {
            return {
                ...state,
                isFetching: true,
                timestamp: action.timestamp,
                error: null
            }
        }
        case ACCESS_TOKEN_SUCCESS: {
            console.log("access token success");
            return {
                ...state,
                isFetching: false,
                access_token: action.data.access_token,
                token_type: action.data.token_type,
                expires_in: action.data.expires_in,
                header: action.data.token_type + " " + action.data.access_token,
                error: null
            }
        }
        case ACCESS_TOKEN_FAILURE: {
            return {
                ...state,
                isFetching: false,
                access_token: "",
                token_type: "",
                expires_in: 0,
                client_id: "",
                secret: "",
                header: "",
                error: action.error
            }
        }
        case GET_PROFILE_PENDING: {
            console.log("get profile called");
            return {
                ...state,
                isFetching: true,
                timestamp: action.timestamp,
                error: null
            }
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                profile: action.data.profile,
                error: null
            }
        }
        case GET_PROFILE_FAILURE: {
            return {
                ...state,
                isFetching: false,
                profile: {
                    name: "",
                    type: "",
                    hub: "",
                    hub_code: "",
                    hub_phone: ""
                },
                error: action.error
            }
        }
        default: {
            return state
        }
    }
}