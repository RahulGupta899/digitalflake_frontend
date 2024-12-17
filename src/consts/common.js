import { IoHomeOutline } from "react-icons/io5"
import { PiCityLight, PiWarehouse } from "react-icons/pi"
import { LiaCitySolid } from "react-icons/lia";

export const modules = [
  {
    icon: IoHomeOutline,
    name: 'Home',
    path: '/home',
  },
  {
    icon: LiaCitySolid,
    name: 'State',
    path: '/state',
    addPath: '/state/add'
  },
  {
    icon: PiCityLight,
    name: 'City',
    path: '/city',
    addPath: '/city/add'
  },
  {
    icon: PiWarehouse,
    name: 'Warehouse',
    path: '/warehouse',
    addPath: '/warehouse/add'
  }
]

export const paginationConfig = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_SIZE_OPTIONS: [5, 10, 20]
}

export const datagridCustomStyle = {
  tableWrapper: {
    style: {
      height: '400px',
      overflowY: 'auto',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#F4EDAF',
      fontSize: '14px'
    },
  },
  headCells: {
    style: {
      color: 'black',
    },
  },
};

export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#662671' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px #662671' : 'none',
    '&:hover': { borderColor: '#662671' }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#662671' : '#fff',
    color: state.isFocused ? '#fff' : '#000',
  })
}

export const loadingAnimation = (setLoading, time)=>{
  setTimeout(()=>{
    setLoading(false);
  }, time)
}


