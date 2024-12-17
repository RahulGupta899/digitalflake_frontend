import React, { useEffect, useState } from 'react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoArrowLeft } from "react-icons/go";
import ActionButton from '../../components/ActionButton';
import Select from 'react-select'
import { customSelectStyles, modules } from '../../consts/common';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageLoader from '../../components/PageLoader';
import statesAPIs from '../../api/hooks/statesApi';
import cityAPIs from '../../api/hooks/cityApi';
import { Regex } from '../../consts/regexNames';
const options = [
  { _id: '1', name: 'Active' },
  { _id: '0', name: 'In Active' }
]
const formSchema = z.object({
  cityName: z.string()
    .min(1, { message: 'City name is required.' })
    .regex(Regex.VALID_STRING, { message: 'Please enter valid name' }),
  cityCode: z.string()
    .min(1, { message: 'City code is required.' })
    .regex(Regex.VALID_STRING, { message: 'Please enter valid code' }),
  state: z
    .object({
      _id: z.string().optional(),
      stateName: z.string().optional(),
    },{message: 'Please select state'}),
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
  const {loading, cityInfo, fetchCityInfo, createCity, editCity  } = cityAPIs();
  const { register, handleSubmit, formState: { errors }, control, reset, setValue } = 
  useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
    }
  });

  // Fetch States
  useEffect(()=>{
    fetchStates({status:'1'})
  },[])

  // Fetch City Info (Edit Mode)
  useEffect(() => {
    if (id) {
      fetchCityInfo(id)
    }
  }, [id])

  // Set Previouse Data (Edit Mode)
  useEffect(() => {
    setValue('cityName', cityInfo?.cityName)
    setValue('cityCode', cityInfo?.cityCode)
    setValue('state', cityInfo?.state)
    setValue('status', cityInfo?.status)
  }, [cityInfo])

  // Actions
  const submitForm = async (formFields) => {
    if (id) {
      await editCity(formFields, id);
    }
    else {
      await createCity(formFields);
    }
  }

  return (
    <div className='my-4'>
      <div className='flex_row_between w-[180px] px-6 mb-12 '>
        <Link to={modules[2].path} className='text-2xl cursor-pointer'>
          <GoArrowLeft />
        </Link>
        <div className='text-xl font-semibold'>{id ? 'Edit' : 'Add'} City</div>
      </div>
      {/* MAIN CONTAINER */}
      <form onSubmit={handleSubmit(submitForm)} className='px-6 w-[calc(100vw-16rem)] h-[80%] flex flex-col justify-between'>
        <div className='flex flex-wrap gap-6'>
          <div>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-96">
              <span className="text-gray-600 mr-2 whitespace-nowrap">City Name</span>
              <input
                {...register('cityName')}
                type="text"
                className="flex-1 focus:outline-none transition-none"
                placeholder="Enter City Name"
              />
            </div>
            {errors?.cityName?.message && <div className="text-xs text-red-500 my-2">{errors?.cityName?.message}</div>}
          </div>
          <div>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-96">
              <span className="text-gray-600 mr-2 whitespace-nowrap">City Code</span>
              <input
                {...register('cityCode')}
                type="text"
                className="flex-1 focus:outline-none transition-none"
                placeholder="Enter City Code"
              />
            </div>
            {errors?.cityCode?.message && <div className="text-xs text-red-500 my-2">{errors?.cityCode?.message}</div>}
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
                    onChange={(val) => field.onChange(val)}
                    className='focus:outline-none w-96'
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors?.state?.message && <div className="text-xs text-red-500 my-2">{errors?.state?.message}</div>}
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
            onClickHandler={() => { reset({ cityName: '', cityCode: '', state: null }) }}
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
