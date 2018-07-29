import axios from 'axios';
import { connect } from 'react-redux';

export default class apiClient {

    constructor() {
        //this.baseUrl = 'https://api-dev.rcl.co.id/api/v1/';
        this.baseUrl = 'https://api.rcl.co.id/api/v1/';
    }

    post(endpoint, param, header = "") {
        const url = this.baseUrl + endpoint;
        console.log(url, header, JSON.stringify(param));
        return axios.post(url, param, {
            'headers': { 'Authorization': header },
            'validateStatus': function (status) {
                return status < 500; // Reject only if the status code is greater than or equal to 500
            }
        }).then(response => response).catch((error) => {
            console.log(url, header, JSON.stringify(param));
            console.log('error ' + error);
        });;
    }

    get(endpoint, param, header = "") {
        //console.log(param ? 'true' : 'false');
        let url = this.baseUrl + endpoint;
        if (param) url = url + param;
        return axios.get(url, { 'headers': { 'Authorization': header } }).then(response => response).catch((error) => {
            console.log('error ' + error);
        });
    }
}

function bindAction(dispatch) {
    return {
    };
}

const mapStateToProps = state => ({
    token: state.AuthReducer,
});

//export default connect({}, {})(apiClient);
