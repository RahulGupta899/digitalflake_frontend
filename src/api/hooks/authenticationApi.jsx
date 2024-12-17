import { useState } from "react";
import { axiosPost, localStorageRemove } from "../generalSetup";
import {APIEndpoints} from '../apiEndpoints';
import {APIMessages} from '../apiMessages';
import {encrypt} from '../../utils/encryptDecrypt';
import {authorizationToken, userDetails, } from '../../consts/localStorageKeyNames'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function authenticationAPI() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (credentials, setError) => {
        setLoading(true);
        try {
            localStorageRemove();
            const result = await axiosPost(APIEndpoints.login, false, credentials);
            if (result?.data?.user) {
                window.localStorage.setItem(userDetails, encrypt(JSON.stringify(result?.data?.user)))
                window.localStorage.setItem(authorizationToken, encrypt(JSON.stringify(result?.data?.accessToken)));
                toast.success(APIMessages.loginSuccess);
                navigate('/home');
            }
        }
        catch(err) {
            (err?.response?.data?.message)
            ?
            toast.error(err?.response?.data?.message)
            :
            toast.error(err.message)
        }
        finally {
            setLoading(false);
        }
    }

    const forgetPassword = async (credentials, reset) => {
        setLoading(true);
        try {
            await axiosPost(APIEndpoints.forgetPassword, false, credentials);
            toast.success(APIMessages.forgetPasswordSuccess);
            reset();
        }
        catch (err) {
            (err?.response?.data?.message)
            ?
            toast.error(err?.response?.data?.message)
            :
            toast.error(err.message)
        }
        finally {
            setLoading(false);
        }
    }

    const resetPassword = async (credentials) => {
        setLoading(true);
        try {
            await axiosPost(APIEndpoints.resetPassword, false, credentials);
            toast.success(APIMessages.resetPasswordSuccess);
            navigate('/');
        }
        catch (err) {
            (err?.response?.data?.message)
            ?
            toast.error(err?.response?.data?.message)
            :
            toast.error(err.message)
        }
        finally {
            setLoading(false);
        }
    }

    return {
        loading, login, forgetPassword, resetPassword
    };
}