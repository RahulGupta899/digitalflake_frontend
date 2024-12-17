import { useState } from "react";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../generalSetup";
import { APIEndpoints } from '../apiEndpoints';
import { APIMessages } from '../apiMessages';
import { useNavigate } from "react-router-dom";
import { loadingAnimation } from "../../consts/common";
import toast from "react-hot-toast";

export default function cityAPIs() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [cityInfo, setCityInfo] = useState(null);

    // Get All Cities
    const fetchCities = async (queryParams) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(APIEndpoints.cityList, true, {}, true, false, queryParams);
            setCityList(data?.list)
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

    // Get Individual City
    const fetchCityInfo = async (id) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(`${APIEndpoints.city}/${id}`, true, false, false, false, {});
            setCityInfo(data?.city)
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

    // Create City
    const createCity = async (cityData) => {
        try {
            setLoading(true)
            await axiosPost(APIEndpoints.cityCreate, true, cityData, {});
            toast.success(APIMessages.cityCreateSuccess)
            navigate('/city')
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
    const editCity = async (cityData, id) => {
        try {
            setLoading(true)
            await axiosPut(`${APIEndpoints.cityEdit}/${id}`, true, cityData, {});
            toast.success(APIMessages.cityUpdateSuccess)
            navigate('/city')
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

    // Delete City 
    const deleteCity = async (id) => {
        try {
            setLoading(true)
            await axiosDelete(`${APIEndpoints.city}/${id}`, true, {}, {});
            toast.success(APIMessages.cityDeleteSuccess);
            navigate('/city')
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
        loading, cityInfo,
        cityList, fetchCityInfo, fetchCities,
        createCity, editCity, deleteCity
    };
}