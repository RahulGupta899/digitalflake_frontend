import DataTable from 'react-data-table-component';
import { datagridCustomStyle, modules } from '../../consts/common';
import { CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md"
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import SkeletonLoader from '../../components/SkeletonLoader';
import { useDebounce } from '@uidotdev/usehooks';
import cityAPIs from '../../api/hooks/cityApi';
import warehouseAPIs from '../../api/hooks/warehouseApi';

const WareHouse = () => {

  // Component States and Dependencies
  const [searchText, setSearchText] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null)
  const debouncedSearchText = useDebounce(searchText, 700);
  const [showModal, setShowModal] = useState(false);
  const {loading, warehouseList, fetchWarehouse, deleteWarehouse} = warehouseAPIs()

  // Fetch warehouse list
  useEffect(()=>{
    fetchWarehouse({searchText});
  },[debouncedSearchText])

  // Table Definition
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.wareHouseName,
      sortable: true,
    },
    {
      name: 'State',
      selector: row => row.state?.stateName,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.city?.cityName,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status?._id,
      sortable: true,
      cell: (row) => (
        <div className={`${row.status?._id === '1' ? 'text-green-500' : 'text-red-500' }`}>{`${row.status?._id === '1' ? 'Active' : 'In Active' }`}</div>
      ),
    },
    {
      name: 'Action',
      selector: row => row.title,
      cell: (row) => (
        <div className='flex gap-4 text-2xl cursor-pointer'>
          <Link to={`/warehouse/edit/${row?._id}`}>
            <FaRegEdit color='grey'/>
          </Link>
         <MdOutlineDelete 
          color='grey'
          onClick={()=>{
            setShowModal((state)=>!state)
            setSelectedWarehouseId(row?._id)
          }}
        />
        </div>
      ),
    },
  ];

  return (
    <div>
      <ModuleHeader
        icon={modules[3].icon}
        name={modules[3].name}
        searchText={searchText}
        setSearchText={setSearchText}
        path={modules[3].addPath}
      />
      <div className='w-[calc(100vw-16rem)] px-4'>
        {
          loading
          ?
          <SkeletonLoader/>
          :
          <DataTable
            columns={columns}
            data={warehouseList}
            customStyles={datagridCustomStyle}
            fixedHeader
            fixedHeaderScrollHeight="600px"
          />
        }
      </div>
      {
        showModal
        &&
        <Modal
          reason="Delete"
          helperText="Are you sure you want to delete?"
          onClose={()=>{setShowModal(false)}}
          actionCallback={async()=>{
            setSearchText('')
            await deleteWarehouse(selectedWarehouseId)
            await fetchWarehouse();
          }} 
        />
      }
    </div>
  )
}

export default WareHouse
