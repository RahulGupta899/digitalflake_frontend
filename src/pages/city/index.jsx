import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ModuleHeader from '../../components/ModuleHeader';
import Modal from '../../components/Modal';
import SkeletonLoader from '../../components/SkeletonLoader';
import cityAPIs from '../../api/hooks/cityApi';
import { datagridCustomStyle, modules } from '../../consts/common';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md"
import { Link } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';

const City = () => {

  // Component States and Dependencies
  const [searchText, setSearchText] = useState('');
  const [selectedCityId, setSelectedCityId] = useState(null)
  const debouncedSearchText = useDebounce(searchText, 700);
  const [showModal, setShowModal] = useState(false);
  const {loading, cityList, fetchCities, deleteCity } = cityAPIs();

  // Fetch City list 
  useEffect(()=>{
    fetchCities({searchText});
  },[debouncedSearchText])

  // Table Definition
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'City Name',
      selector: row => row.cityName,
      sortable: true,
    },
    {
      name: 'City Code',
      selector: row => row.cityCode,
      sortable: true,
    },
    {
      name: 'State Name',
      selector: row => row.stateDetails?.stateName,
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
          <Link to={`/city/edit/${row?._id}`}>
            <FaRegEdit color='grey'/>
          </Link>
         <MdOutlineDelete 
          color='grey'
          onClick={()=>{
            setShowModal((state)=>!state)
            setSelectedCityId(row?._id)
          }}
        />
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <ModuleHeader
        icon={modules[2].icon}
        name={modules[2].name}
        searchText={searchText}
        setSearchText={setSearchText}
        path={modules[2].addPath}
      />
      <div className='w-[calc(100vw-16rem)] px-4'>
        {
          loading
          ?
          <SkeletonLoader/>
          :
          <DataTable
            columns={columns}
            data={cityList}
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
            await deleteCity(selectedCityId)
            await fetchCities();
          }}
        />
      }
    </div>
  )
}

export default City
