import { useState } from "react";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../generalSetup";
import { APIEndpoints } from '../apiEndpoints';
import { APIMessages } from '../apiMessages';
import { useNavigate } from "react-router-dom";
import { loadingAnimation } from "../../consts/common";
import toast from "react-hot-toast";

export default function statesAPIs() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [stateInfo, setStateInfo] = useState(null);

    // Get All States 
    const fetchStates = async (queryParams) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(APIEndpoints.stateList, true, {}, true, false, queryParams);
            setStateList(data?.list)
        }
        catch (err) {
            (err?.response?.data?.message)
                ?
                toast.error(err?.response?.data?.message)
                :
                toast.error(err.message)
        }
        finally {
            loadingAnimation(setLoading, 300)
        }
    }

    // Get Individual States
    const fetchStateInfo = async (id) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(`${APIEndpoints.state}/${id}`, true, false, false, false, {});
            setStateInfo(data?.state)
        }
        catch (err) {
            (err?.response?.data?.message)
                ?
                toast.error(err?.response?.data?.message)
                :
                toast.error(err.message)
        }
        finally {
            loadingAnimation(setLoading, 700)
        }
    }

    // Create State
    const createState = async (stateData) => {
        try {
            setLoading(true)
            await axiosPost(APIEndpoints.stateCreate, true, stateData, {});
            toast.success(APIMessages.stateCreateSuccess)
            navigate('/state')
        }
        catch (err) {
            (err?.response?.data?.message)
                ?
                toast.error(err?.response?.data?.message)
                :
                toast.error(err.message)
        }
        finally {
            loadingAnimation(setLoading, 700)
        }
    }

    // Edit State
    const editState = async (stateData, id) => {
        try {
            setLoading(true)
            await axiosPut(`${APIEndpoints.stateEdit}/${id}`, true, stateData, {});
            toast.success(APIMessages.stateUpdateSuccess)
            navigate('/state')
        }
        catch (err) {
            (err?.response?.data?.message)
                ?
                toast.error(err?.response?.data?.message)
                :
                toast.error(err.message)
        }
        finally {
            loadingAnimation(setLoading, 700)
        }
    }

    // Delete State 
    const deleteState = async (id) => {
        try {
            setLoading(true)
            await axiosDelete(`${APIEndpoints.state}/${id}`, true, {}, {});
            toast.success(APIMessages.stateDeleteSuccess);
            navigate('/state')
        }
        catch (err) {
            (err?.response?.data?.message)
                ?
                toast.error(err?.response?.data?.message)
                :
                toast.error(err.message)
        }
        finally {
            loadingAnimation(setLoading, 300)
        }
    }

    return {
        loading, stateList, stateInfo,
        fetchStates, createState, editState, fetchStateInfo, deleteState
    };
}