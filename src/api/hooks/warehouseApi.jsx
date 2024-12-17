import { useState } from "react";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../generalSetup";
import { APIEndpoints } from '../apiEndpoints';
import { APIMessages } from '../apiMessages';import { useNavigate } from "react-router-dom";
import { loadingAnimation } from "../../consts/common";
import toast from "react-hot-toast";

export default function warehouseAPIs() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [warehouseList, setWarehouseList] = useState([]);
    const [warehouseInfo, setWarehouseInfo] = useState(null);

    // Get All Warehouse
    const fetchWarehouse = async (queryParams) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(APIEndpoints.warehouseList, true, {}, true, false, queryParams);
            setWarehouseList(data?.list)
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

    // Get Individual Warehouse
    const fetchWarehouseInfo = async (id) => {
        try {
            setLoading(true)
            const { data } = await axiosGet(`${APIEndpoints.warehouse}/${id}`, true, false, false, false, {});
            setWarehouseInfo(data?.warehouse)
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

    // Create Warehouse
    const createWarehouse = async (warehouseData) => {
        try {
            setLoading(true)
            await axiosPost(APIEndpoints.warehouseCreate, true, warehouseData, {});
            toast.success(APIMessages.warehouseCreateSuccess)
            navigate('/warehouse')
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

    // Edit Warehouse
    const editWarehouse = async (warehouseData, id) => {
        try {
            setLoading(true)
            await axiosPut(`${APIEndpoints.warehouseEdit}/${id}`, true, warehouseData, {});
            toast.success(APIMessages.warehouseUpdateSuccess)
            navigate('/warehouse')
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
    const deleteWarehouse = async (id) => {
        try {
            setLoading(true)
            await axiosDelete(`${APIEndpoints.warehouse}/${id}`, true, {}, {});
            toast.success(APIMessages.warehouseDeleteSuccess);
            navigate('/warehouse')
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
        loading, warehouseList, warehouseInfo,
        createWarehouse, fetchWarehouse, fetchWarehouseInfo, editWarehouse, deleteWarehouse
    };
}