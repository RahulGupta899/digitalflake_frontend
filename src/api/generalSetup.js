import axios from "axios";
import { authorizationToken } from "../consts/localStorageKeyNames";
import { decrypt } from "../utils/encryptDecrypt";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const useAuthentication = false;
let headers = { 'Content-Type': 'application/json' };
const client = axios.create({ baseURL: baseURL });

// AXIOS GET SERVICE
const axiosGet = async (url, headerAuthenticate = useAuthentication, customHeaders = {}, getAll = false, pagination = false, queryParams = {}) => {

    let parameters = {};
    
    // User Authentication
    let authorizationKey = window.localStorage.getItem(authorizationToken);
    if(authorizationKey) {
       authorizationKey = decrypt(authorizationKey);
       authorizationKey = 'Bearer '+ JSON.parse(authorizationKey) ;
    }
    if(headerAuthenticate && authorizationKey) {
       headers['Authorization'] = authorizationKey;
    }

    // Attach custom headers
    if (Object.keys(customHeaders).length > 0) {
        const merged = { ...headers, ...customHeaders };
        headers = merged;
    }

    // For Pagination
    if (getAll === false && pagination) {
        parameters = {
            page: pagination.currentPage,
            limit: pagination.perPage
        }
    }

    // Attach all query params
    if (Object.keys(queryParams).length > 0) {
        const mergedParams = { ...parameters, ...queryParams };
        parameters = mergedParams;
    }

    // Make request
    try {
        const response = await client.get(url, {
            headers: headers,
            params: parameters
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
              await sessionApiOut(error);
            throw error;
        } else {
            throw error;
        }
    }
}

// AXIOS POST SERVICE
const axiosPost = async (url, headerAuthenticate = useAuthentication, data = null, customHeaders = {}) => {

    // User Authentication
    let authorizationKey = window.localStorage.getItem(authorizationToken);
    if(authorizationKey) {
       authorizationKey = decrypt(authorizationKey);
       authorizationKey = 'Bearer '+ JSON.parse(authorizationKey) ;
    }
    if(headerAuthenticate && authorizationKey) {
       headers['Authorization'] = authorizationKey;
    }

    // Adding custom headers
    if (Object.keys(customHeaders).length > 0) {
        const merged = Object.assign(headers, customHeaders);
        headers = merged;
    }

    // Make request
    try {
        const response = await client.post(url, data, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            await sessionApiOut(error);
            throw error;
        } else {
            throw error;
        }
    }
}

// AXIOS PUT SERVICE
const axiosPut = async (url, headerAuthenticate = useAuthentication, data = null, customHeaders = {}) => {

   // User Authentication
   let authorizationKey = window.localStorage.getItem(authorizationToken);
   if(authorizationKey) {
      authorizationKey = decrypt(authorizationKey);
      authorizationKey = 'Bearer '+ JSON.parse(authorizationKey) ;
   }
   if(headerAuthenticate && authorizationKey) {
      headers['Authorization'] = authorizationKey;
   }

   // Adding custom headers
   if (Object.keys(customHeaders).length > 0) {
       const merged = Object.assign(headers, customHeaders);
       headers = merged;
   }

    // Adding custom headers
    if (Object.keys(customHeaders).length > 0) {
        const merged = [...headers, ...customHeaders];
        headers = merged;
    }

    // Make Call
    try {
        const response = await client.put(url, data, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            await sessionApiOut(error);
            throw error;
        } else {
            throw error;
        }
    }
}

// AXIOS DELETE SERVICE
const axiosDelete = async (url, headerAuthenticate = useAuthentication, customHeaders = {}, queryParams = {}) => {

    let parameters = {};
    
    // User Authentication
    let authorizationKey = window.localStorage.getItem(authorizationToken);
    if(authorizationKey) {
       authorizationKey = decrypt(authorizationKey);
       authorizationKey = 'Bearer '+ JSON.parse(authorizationKey) ;
    }
    if(headerAuthenticate && authorizationKey) {
       headers['Authorization'] = authorizationKey;
    }

    // Attach custom headers
    if (Object.keys(customHeaders).length > 0) {
        const merged = { ...headers, ...customHeaders };
        headers = merged;
    }

    // Attach all query params
    if (Object.keys(queryParams).length > 0) {
        const mergedParams = { ...parameters, ...queryParams };
        parameters = mergedParams;
    }


    // Make call
    try {
        const response = await client.delete(url, {
            headers: headers,
            params: parameters
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            await sessionApiOut(error);
            throw error;
        } else {
            throw error;
        }
    }
}

// SESSION LOGOUT 
const sessionApiOut = async (geterror) => {
    try {
        await localStorageRemove();
        console.error(geterror?.response?.data?.details);
        window.location.href = "/";
    } catch (error) {
        if (error?.response?.data.status === 401) {
            await localStorageRemove();
        }
        console.error(error?.response?.data?.message);
        window.location.href = "/";
    }
}

// CLEAR LOCAL STORAGE VARIABLES
const localStorageRemove = async () => {
    window.localStorage.clear();
}

export { axiosGet, axiosPost, axiosPut, axiosDelete, sessionApiOut, localStorageRemove  };