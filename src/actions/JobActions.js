import { Alert, Linking, Platform } from 'react-native';
var _ = require('lodash');

import apiClient from '../services/apiClient';
import { ENDPOINT } from '../services/endpoints';
// import { firebaseApp } from '../services/firebaseConf';

// const itemsRef = firebaseApp.database().ref().child('jobs');

export const SAVE_JOB_LIST = 'SAVE_JOB_LIST';
export const UPDATE_JOB = 'UPDATE_JOB';
export const CANCEL = 'CANCEL';
export const SAVE_JOB_ORDER = 'SAVE_JOB_ORDER';
export const SET_FETCHING = 'SET_FILTER_PAR';

export function saveJobList(data) {
    return { type: SAVE_JOB_LIST, data };
}

export function getJobList(client_id) {
    return (dispatch, getState) => {
        console.log("getJobList called");
        console.log(client_id);
        var STATS_SUBMITED = 0;
        var data = getState().JobReducer.jobs;
        var jobOrder = getState().JobReducer.jobOrder;
        console.log("jobOrder "+JSON.stringify(jobOrder));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].isSubmitted) {
                    STATS_SUBMITED = 1;
                }
            }
        }
        if(STATS_SUBMITED==1) return dispatch({ type: CANCEL, data });
        itemsRef.child(client_id).on('value', (snap) => {
            let items = {};
            let iterator = 0;
            let counterOrder=snap.numChildren();
            snap.forEach((child) => {
                let item = child.val();
                item['key'] = child.key;
                item['isSubmitted'] = false;
                item['attemptHistory'] = item.attemptHistory == 0 ? [] : item.attemptHistory;
                item['reason_id'] = '';
                item['notes'] = '';
                item['latitude'] = '';
                item['longitude'] = '';
                item['receiverName'] = '';
                item['receiverRelation'] = '';
                item['partial_pickup'] = [];
                item['proofPhoto'] = "";
                item['proofPhotoStatus'] = "";
                item['receiverName'] = "";
                item['receiverRelation'] = "";
                item['signaturePhoto'] = "";
                item['signaturePhotoStatus'] = "";
                item['rate'] = 0;
                if(jobOrder.hasOwnProperty(item['key'])){
                    item["ordering"]=jobOrder[item['key']].ordering;
                } else {
                    item["ordering"]=counterOrder;
                    jobOrder[item['key']]={"ordering":counterOrder};
                }
                items[iterator] = item;
                iterator++;
                counterOrder--;
            });

            var reversedItems = _.map(items, function (value, index) {
                return value;
            });
            _.reverse(reversedItems);
            var finalItems = {}
            for (var i = 0; i < reversedItems.length; i++) {
                finalItems[i] = reversedItems[i];
            }
            dispatch({ type: SAVE_JOB_ORDER, jobOrder });
            dispatch(saveJobList(finalItems));
            //console.log(JSON.stringify(items));
            //console.log(JSON.stringify(reversedItems));
        });
    };
}

export function setRowOrder(keyIndex,from,to){
    return (dispatch, getState) => {
        from++;
        to++;
        console.log(from+" "+to);
        var data = getState().JobReducer.jobs;
        var jobOrder = getState().JobReducer.jobOrder;
        for (var key in data) {
            if(keyIndex==data[key].key){
                data[key].ordering=to;
                jobOrder[data[key].key]={"ordering":to};
            } else if(from < to && data[key].ordering > from && data[key].ordering <= to){
                data[key].ordering=data[key].ordering-1;
                jobOrder[data[key].key]={"ordering":data[key].ordering};
            } else if(from > to && data[key].ordering < from && data[key].ordering >= to){
                data[key].ordering=data[key].ordering+1;
                jobOrder[data[key].key]={"ordering":data[key].ordering};
            }
            console.log(data[key].ordering);

        }
        dispatch({ type: SAVE_JOB_ORDER, jobOrder });
        dispatch({ type: UPDATE_JOB, data });
    }
}

export function setFetching(par){console.log("setFetching "+par)
    return (dispatch, getState) => {
        dispatch({ type: SET_FETCHING, par });
    }
}

export function markAsRead(jobId, client_id) {
    return (dispatch, getState) => {
        console.log("markAsRead called", JSON.stringify(jobId), JSON.stringify(getState().JobReducer));
        var data = getState().JobReducer.jobs;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].jobId == jobId) {
                    data[key].read = true;
                }
            }
        }
        const itemsRef = firebaseApp.database().ref().child('jobs').child(client_id).child(jobId);
        //itemsRef.update({ read: true });
        dispatch({ type: UPDATE_JOB, data });
    };
}

export function failedJob(jobId, reason_id, client_id) {
    return (dispatch, getState) => {
        var data = getState().JobReducer.jobs;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].jobId == jobId) {
                    data[key].reason_id = reason_id;
                    data[key].status = 'failed';
                    data[key].isSubmitted = true;
                    data[key].ordering = 100;
                }
            }
        }
        //updateStatus(jobId, "failed" ,client_id);
        dispatch({ type: UPDATE_JOB, data });
    };
}

export function successJob(jobId, location, client_id) {
    console.warn("LOCATION:" + JSON.stringify(location));
    return (dispatch, getState) => {
        var data = getState().JobReducer.jobs;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].jobId == jobId) {
                    data[key].status = 'success';
                    data[key].latitude = location.coords.latitude;
                    data[key].longitude = location.coords.longitude;
                    data[key].isSubmitted = true;
                    data[key].ordering = 100;
                }
            }
        }
        Alert.alert(
            '',
            `Job Success`
        );
        //updateStatus(jobId, 'success' ,client_id);
        dispatch({ type: UPDATE_JOB, data });
    };
}

export function updateStatus(jobId, status, client_id) {
    console.warn("updateStatus called");
    return (dispatch, getState) => {
        var data = getState().JobReducer.jobs;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                console.log("COMPARE", data[key].jobId, jobId);
                if (data[key].jobId == jobId) {
                    console.warn("GOCTHA", jobId);
                    var params = {
                        job_id: data[key].jobId,
                        tracking: data[key].tracking,
                        status: status,
                        reason_id: data[key].reason_id,
                        receiver_name: data[key].receiverName,
                        receiver_relation: data[key].receiverRelation,
                        notes: data[key].notes,
                        latitude: data[key].latitude,
                        longitude: data[key].longitude,
                        partial_pickup: data[key].partial_pickup
                    }
                    console.warn(JSON.stringify('submit'));
                    console.warn(JSON.stringify(ENDPOINT.SUBMIT_JOB));
                    console.warn(JSON.stringify(params));
                    console.warn(JSON.stringify(getState().AuthReducer.header));
                    new apiClient()
                        .post(ENDPOINT.SUBMIT_JOB, [params], getState().AuthReducer.header)
                        .then((result) => {
                            console.warn(JSON.stringify(result.data));
                            if (result.data.status == "SUCCESS") {
                                var data = getState().JobReducer.jobs;
                                for (var key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        if (data[key].jobId == params.job_id) {
                                            data[key].isSubmitted = false;
                                        }
                                    }
                                }
                                dispatch({ type: UPDATE_JOB, data });
                            }
                            else if (result.data.status == "ERROR") {
                                // should base on rcl response
                                var data = getState().JobReducer.jobs;
                                for (var key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        if (data[key].jobId == params.job_id) {
                                            data[key].isSubmitted = false;
                                        }
                                    }
                                }
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        })
                        .catch((error) => {
                            var data = getState().JobReducer.jobs;
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    if (data[key].jobId == params.job_id) {
                                        data[key].isSubmitted = true;
                                    }
                                }
                            }
                            dispatch({ type: UPDATE_JOB, data });
                        });
                }
            }
        }
        //dispatch({ type: SAVE_JOB_LIST, data });
    };
}

export function submitJob(client_id) {
    //console.warn("submitJob called");
    return (dispatch, getState) => {
        var data = getState().JobReducer.jobs;
        var jobOrder = getState().JobReducer.jobOrder;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].isSubmitted) {
                    var params = {
                        job_id: data[key].jobId,
                        tracking: data[key].tracking,
                        status: data[key].status,
                        reason_id: data[key].reason_id,
                        receiver_name: data[key].receiverName,
                        receiver_relation: data[key].receiverRelation,
                        notes: data[key].notes,
                        latitude: data[key].latitude,
                        longitude: data[key].longitude,
                        partial_pickup: data[key].partial_pickup
                    }
                    console.warn(JSON.stringify('submit'));
                    console.warn(JSON.stringify(ENDPOINT.SUBMIT_JOB));
                    console.warn(JSON.stringify(params));
                    console.warn(JSON.stringify(getState().AuthReducer.header));
                    new apiClient()
                        .post(ENDPOINT.SUBMIT_JOB, [params], getState().AuthReducer.header)
                        .then((result) => {
                            console.warn(JSON.stringify(result.data));
                            if (result.data.status == "SUCCESS") {
                                var data = getState().JobReducer.jobs;
                                for (var key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        if (data[key].jobId == params.job_id) {
                                            data[key].isSubmitted = false;
                                        }
                                    }
                                }
                                delete jobOrder[key];
                                dispatch({ type: UPDATE_JOB, data });
                                dispatch({ type: SAVE_JOB_ORDER, jobOrder });
                            }
                            else if (result.data.status == "ERROR") {
                                // should base on rcl response
                                var data = getState().JobReducer.jobs;
                                for (var key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        if (data[key].jobId == params.job_id) {
                                            data[key].isSubmitted = false;
                                        }
                                    }
                                }
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        })
                        .catch((error) => {
                            let errorMessage = [];
                            _.forEach(error.response.data.error[0].message_dev, (value, key) => {
                                errorMessage.push(value[0]);
                            });
                            Alert.alert(error.response.data.error[0].message, errorMessage.join('\n'));
                        });
                }
            }
        }
        dispatch({ type: SAVE_JOB_LIST, data });
    };
}

export function saveProof(base64, jobId, client_id) {
    return (dispatch, getState) => {
        if (base64 == undefined) return false;
        var params = {
            job_id: jobId,
            type: "proof",
            file: `data:image/jpeg;base64,${base64}`
        }
        var data = getState().JobReducer.jobs;
        new apiClient()
            .post(ENDPOINT.UPLOAD_FILE, params, getState().AuthReducer.header)
            .then((result) => {
                console.warn(JSON.stringify(result.data));
                if (result.data.status == "SUCCESS") {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (data[key].jobId == params.job_id) {
                                data[key].proofPhoto = result.data.url;
                                data[key].proofPhotoStatus = true;
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        }
                    }
                }
                else {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (data[key].jobId == jobId) {
                                data[key].proofPhoto = `data:image/jpeg;base64,${base64}`;
                                data[key].proofPhotoStatus = false;
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                let errorMessage = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (data[key].jobId == jobId) {
                            data[key].proofPhoto = `data:image/jpeg;base64,${base64}`;
                            data[key].proofPhotoStatus = false;
                            dispatch({ type: UPDATE_JOB, data });
                        }
                    }
                }
            });
        //console.log(`Ini YG akan DISIMPAN : ${base64}`);
        //const itemsRef = firebaseApp.database().ref().child('jobs').child(client_id).child(jobId);
        //itemsRef.update({ proofPhoto: base64 });

    };
}

export function saveSignature(params, jobId, client_id) {
    console.warn("saveSignature called", jobId);
    console.log("saveSignature", params.signature);
    return (dispatch, getState) => {
        var apiParams = {
            job_id: jobId,
            type: "signature",
            file: `${params.signature}`
        }
        var data = getState().JobReducer.jobs;
        //console.log("Check upload : " + ENDPOINT.UPLOAD_FILE, JSON.stringify(apiParams));
        new apiClient()
            .post(ENDPOINT.UPLOAD_FILE, apiParams, getState().AuthReducer.header)
            .then((result) => {
                console.log("RESULT : " + JSON.stringify(result));
                if (result.data.status == "SUCCESS") {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (data[key].jobId == apiParams.job_id) {
                                data[key].signaturePhoto = result.data.url;
                                data[key].receiverName = params.receiverName;
                                data[key].receiverRelation = params.receiverRelation;
                                data[key].rate = params.rate;
                                data[key].signaturePhotoStatus = true;
                                console.log("SIGNATURE YG DISIMPAN : " + JSON.stringify(data[key]));
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        }
                    }
                }
                else {
                    console.warn(JSON.stringify(result));
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (data[key].jobId == jobId) {
                                data[key].signaturePhoto = params.signature;
                                data[key].receiverName = params.receiverName;
                                data[key].receiverRelation = params.receiverRelation;
                                data[key].rate = params.rate;
                                data[key].signaturePhotoStatus = false;
                                dispatch({ type: UPDATE_JOB, data });
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
                let errorMessage = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (data[key].jobId == jobId) {
                            data[key].signaturePhoto = params.signature;
                            data[key].receiverName = params.receiverName;
                            data[key].receiverRelation = params.receiverRelation;
                            data[key].rate = params.rate;
                            data[key].signaturePhotoStatus = false;
                            dispatch({ type: UPDATE_JOB, data });
                        }
                    }
                }
            });
    };
}