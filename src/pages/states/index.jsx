import React, { useEffect, useState } from 'react';
import { datagridCustomStyle, modules } from '../../consts/common';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md"
import { useDebounce } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import DataTable from 'react-data-table-component';
import ModuleHeader from '../../components/ModuleHeader';
import SkeletonLoader from '../../components/SkeletonLoader';
import statesAPIs from '../../api/hooks/statesApi';

const States = () => {

  // Component States and Dependencies
  const [searchText, setSearchText] = useState('');
  const [selectedStateId, setSelectedStateId] = useState(null)
  const debouncedSearchText = useDebounce(searchText, 700);
  const [showModal, setShowModal] = useState(false);
  const {loading, stateList, fetchStates, deleteState} = statesAPIs()

  // Fetch States List
  useEffect(()=>{
    fetchStates({searchText});
  },[debouncedSearchText])

  // Column Definition
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'State Name',
      selector: row => row.stateName,
      sortable: true,
    },
    {
      name: 'State Code',
      selector: row => row.stateCode,
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
          <Link to={`/state/edit/${row?._id}`}>
            <FaRegEdit color='grey'/>
          </Link>
         <MdOutlineDelete 
          color='grey'
          onClick={()=>{
            setShowModal((state)=>!state)
            setSelectedStateId(row?._id)
          }}
        />
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <ModuleHeader
        icon={modules[1].icon}
        name={modules[1].name}
        searchText={searchText}
        setSearchText={setSearchText}
        path={modules[1].addPath}
      />
      <div className='w-[calc(100vw-16rem)] px-4'>
        {
          loading
          ?
          <SkeletonLoader/>
          :
          <DataTable
            columns={columns}
            data={stateList}
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
            await deleteState(selectedStateId)
            await fetchStates();
          }}
        />
      }
    </div>
  )
}

export default States
