import React, { useEffect } from 'react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoArrowLeft } from "react-icons/go";
import { customSelectStyles, modules } from '../../consts/common';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Regex } from '../../consts/regexNames';
import ActionButton from '../../components/ActionButton';
import Select from 'react-select'
import PageLoader from '../../components/PageLoader';
import statesAPIs from '../../api/hooks/statesApi';
import cityAPIs from '../../api/hooks/cityApi';
import warehouseAPIs from '../../api/hooks/warehouseApi';
const options = [
  { _id: '1', name: 'Active' },
  { _id: '0', name: 'In Active' }
]
const formSchema = z.object({
  wareHouseName: z.string()
    .min(1, { message: 'Warehouse name is required.' })
    .regex(Regex.VALID_STRING, { message: 'Please enter valid name' }),
  state: z
    .object({
      _id: z.string().optional(),
      stateName: z.string().optional(),
      stateCode: z.string().optional(),
    }, { message: 'Please select state' }),
  city: z
    .object({
      _id: z.string().optional(),
      cityName: z.string().optional(),
    }, { message: 'Please select city' }),
  status: z
    .object({
      _id: z.string().optional(),
      name: z.string().optional(),
    })
    .optional()
    .nullable(),
});

const AddEdit = () => {

  // Component States and Dependencies
  const { id } = useParams();
  const { stateList, fetchStates } = statesAPIs();
  const { cityList, fetchCities } = cityAPIs();
  const { loading, createWarehouse, warehouseInfo, fetchWarehouseInfo, editWarehouse } = warehouseAPIs();

  // Form Handlers
  const { register, handleSubmit, formState: { errors }, control, reset, watch, setValue } =
    useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
      }
    });
  const state = watch('state');
  
  // Fetch States
  useEffect(() => {
    fetchStates({ status: '1' })
  }, [])

  // Fetch Cities Based on State Selection
  useEffect(() => {
    if (state?.stateCode) {
      fetchCities({ status: '1', stateCode: state?.stateCode })
    }
  }, [state?.stateCode])

  // Fetch Warehouse Details (Edit Mode)
  useEffect(() => {
    if (id) {
      fetchWarehouseInfo(id)
    }
  }, [id])

  // Set previous Details (Edit Mode)
  useEffect(() => {
    setValue('wareHouseName', warehouseInfo?.wareHouseName)
    setValue('city', warehouseInfo?.city)
    setValue('state', warehouseInfo?.state)
    setValue('status', warehouseInfo?.status)
  }, [warehouseInfo])

  // Actions
  const submitForm = async (formFields) => {
    if (id) {
      await editWarehouse(formFields, id);
    }
    else {
      await createWarehouse(formFields);
    }
  }

  return (
    <div className='my-4'>
      <div className='flex_row_between w-[250px] px-6 mb-12 '>
        <Link to={modules[3].path} className='text-2xl cursor-pointer'>
          <GoArrowLeft />
        </Link>
        <div className='text-xl font-semibold'>{id ? 'Edit' : 'Add'} Warehouse</div>
      </div>
      {/* MAIN CONTAINER */}
      <form onSubmit={handleSubmit(submitForm)} className='px-6 w-[calc(100vw-16rem)] h-[80%] flex flex-col justify-between'>
        <div className='flex flex-wrap gap-6'>
          <div>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-96">
              <span className="text-gray-600 mr-2 whitespace-nowrap">Name</span>
              <input
                {...register('wareHouseName')}
                type="text"
                className="flex-1 focus:outline-none transition-none"
                placeholder="Enter Warehouse Name"
              />
            </div>
            {errors?.wareHouseName?.message && <div className="text-xs text-red-500 my-2">{errors?.wareHouseName?.message}</div>}
          </div>
          <div>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='State'
                  value={field.value || null}
                  options={stateList}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.stateName}
                  onChange={(val) => { setValue('city', null); field.onChange(val) }}
                  className='focus:outline-none w-96'
                  styles={customSelectStyles}
                />
              )}
            />
            {errors?.state?.message && <div className="text-xs text-red-500 my-2">{errors?.state?.message}</div>}
          </div>
          <div>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='City'
                  value={field.value || null}
                  options={cityList}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.cityName}
                  onChange={(val) => field.onChange(val)}
                  className='focus:outline-none w-96'
                  styles={customSelectStyles}
                />
              )}
            />
            {errors?.city?.message && <div className="text-xs text-red-500 my-2">{errors?.city?.message}</div>}
          </div>
          {
            (id)
            &&
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Status"
                  value={field.value || null}
                  options={options}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.name}
                  onChange={(val) => field.onChange(val)}
                  className='focus:outline-none w-96'
                  styles={customSelectStyles}
                />
              )}
            />
          }
        </div>

        {/* CTA BUTTONS */}
        <div className='flex justify-end gap-4'>
          <ActionButton
            isCTA={false}
            name="Cancel"
            onClickHandler={() => { reset({ wareHouseName: '', state: null, city: null }) }}
          />
          <ActionButton
            isCTA={true}
            name="Save"
          />
        </div>
      </form>
      {loading && <PageLoader />}
    </div>
  )
}

export default AddEdit
