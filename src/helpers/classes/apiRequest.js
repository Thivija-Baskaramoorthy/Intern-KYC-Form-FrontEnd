/*
import axios from "axios";

class NetworkResponse{
    status_code;
    data;


    constructor() {
        this.status_code=0;
        this.data= null;
    }
}

const NetworkManager = {
    apiRequest: function (endpoint,
                          data,
                          callBack) {
        // console.log(appSettings.$api_url);
        const URL =  + "/" + endpoint;

        // console.warn("URL : ",URL),

        /!*let config = {
            headers: {},
            timeout: appSettings.timeoutDuration,
        };*!/

        /!*if (withToken) {

            let authHeader = ""

            /!*if(token === null){
                authHeader = `Bearer ${JwtUtils.loadToken().token}`
            }
            else {
                authHeader = `Bearer ${JwtUtils.loadToken(token).token}`
            }*!/

            config.headers = {
                // Authorization: `Bearer ${JwtUtils.loadToken().token}`,
                Authorization: authHeader,
                // "Content-Type": contentType,
            };
        }*!/

        /!*config.headers["Content-Type"] =  contentType

        if(contentType === "multipart/form-data"){
            config.headers["onUploadProgress"] =  progressEvent => console.log(progressEvent.loaded)
        }*!/

        axios
            .post(URL, data, config)
            .then(function (e) {
                callBack(e.data);
            })
            .catch(function (e) {
                let resp = new NetworkResponse();

                if (e.response) {
                    resp.statusCode = e.response.status;

                    if (e.response.data) {
                        resp = e.response.data;
                    }

                    /!*if (resp.statusCode === 401) {
                        JwtUtils.logoutTheUser();
                    }*!/
                } else {
                    resp.statusCode = 502;
                }

                callBack(resp);
            });
    },
};

export default NetworkManager;
*/



/*
import axios from "axios";

class NetworkResponse{
    status_code;
    data;

    constructor() {
        this.status_code=0;
        this.data= null;
    }
}

const NetworkManager = {
    apiRequest: function (endpoint,
                          data,
                          callBack) {
        const baseURL = "https://localhost:7036/api";
        const URL = '${baseURL}' + "/" + endpoint;
        //console.warn("URL : ",URL),

        axios
            .post(URL, data, config)
            .then(function (e) {
                callBack(e.data);
            })
            .catch(function (e) {
                let resp = new NetworkResponse();

                if (e.response) {
                    resp.statusCode = e.response.status;

                    if (e.response.data) {
                        resp = e.response.data;
                    }
                } else {
                    resp.statusCode = 502;
                }
                callBack(resp);
            });
    },
};

export default NetworkManager;

*/

import axios from "axios";

class NetworkResponse {
    status_code;
    data;

    constructor() {
        this.status_code = 0;
        this.data = null;
    }
}

const NetworkManager = {
    apiRequest: function (endpoint, data, callBack) {
        const baseURL = "https://localhost:7036/api";
        const URL = `${baseURL}/${endpoint}`;

        axios
            .post(URL, data)
            .then(function (response) {
                callBack(response.data);
            })
            .catch(function (error) {
                let resp = new NetworkResponse();

                if (error.response) {
                    resp.statusCode = error.response.status;

                    if (error.response.data) {
                        resp = error.response.data;
                    }
                } else {
                    resp.statusCode = 502;
                }
                callBack(resp);
            });
    },
};

export default NetworkManager;

