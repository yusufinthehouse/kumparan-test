import {
    SAVE_JOB_LIST,
    UPDATE_JOB,
    SAVE_JOB_ORDER,
    SET_FETCHING
} from '../actions/JobActions';

import { today } from '../helper/FormatHelper';

const initialState = {
    isFetching: false,
    timestamp: null,
    error: null,
    jobDate: null,
    jobs: [],
    jobOrder:{},
    filter_par:"ordering"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_JOB_LIST: {
            console.log("SAVE_JOB_LIST called");
            return {
                ...state,
                jobDate: today(),
                jobs: action.data,
                error: null,
                isFetching:false
            }
        }
        case SAVE_JOB_ORDER: {
            console.log("SAVE_JOB_ORDER called");
            return {
                ...state,
                jobOrder: action.jobOrder
            }
        }
        case SET_FETCHING: { console.log(JSON.stringify(action));
            return {
                ...state,
                isFetching: action.par
            }
        }
        case UPDATE_JOB: {
            console.log('debug SIGNATURE');
            return {
                ...state,
                jobs: action.data,
            }
        }
        default: {
            return state
        }
    }
}