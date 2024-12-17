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
import { Regex } from '../../consts/regexNames';
const options = [
  { _id: '1', name: 'Active' },
  { _id: '0', name: 'In Active' }
]
const formSchema = z.object({
  stateName: z.string()
    .min(1, { message: 'State name is required.' })
    .regex(Regex.VALID_STRING, { message: 'Please enter valid name'}),
  stateCode: z.string()
    .min(1, { message: 'State code is required.' })
    .regex(Regex.VALID_STRING, { message: 'Please enter valid code'}),
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
  const { loading, stateInfo, fetchStateInfo, createState, editState} = statesAPIs();
  const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
    }
  });

  // Fetch State Data (Edit Mode)
  useEffect(()=>{
    if(id){
      fetchStateInfo(id)
    }
  },[id])

  // Fetch Previous Data (Edit Mode)
  useEffect(()=>{
    setValue('stateName', stateInfo?.stateName)
    setValue('stateCode', stateInfo?.stateCode)
    setValue('status', stateInfo?.status)
  },[stateInfo])

  // Actions
  const submitForm = async (formFields) => {
    if(id){
      await editState(formFields, id);
    }
    else{
      await createState(formFields);
    }
  }

  return (
    <div className='my-4'>
      <div className='flex_row_between w-[180px] px-6 mb-12 '>
        <Link to={modules[1].path} className='text-2xl cursor-pointer'>
          <GoArrowLeft />
        </Link>
        <div className='text-xl font-semibold'>{id ? 'Edit' : 'Add'} State</div>
      </div>
      {/* MAIN CONTAINER */}
      <form onSubmit={handleSubmit(submitForm)} className='px-6 w-[calc(100vw-16rem)] h-[80%] flex flex-col justify-between'>
        <div className='flex flex-wrap gap-6'>
          <div>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-96">
              <span className="text-gray-600 mr-2 whitespace-nowrap">State Name</span>
              <input
                {...register('stateName')}
                type="text"
                className="flex-1 focus:outline-none transition-none"
                placeholder="Enter State Name"
              />
            </div>
            {errors?.stateName?.message && <div className="text-xs text-red-500 my-2">{errors?.stateName?.message}</div>}
          </div>
          <div>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-96">
              <span className="text-gray-600 mr-2 whitespace-nowrap">State Code</span>
              <input
                {...register('stateCode')}
                type="text"
                className="flex-1 focus:outline-none transition-none"
                placeholder="Enter State Code"
              />
            </div>
            {errors?.stateCode?.message && <div className="text-xs text-red-500 my-2">{errors?.stateCode?.message}</div>}
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
            onClickHandler={()=>{reset({ stateName: '', stateCode: '' })}}
          />
          <ActionButton
            isCTA={true}
            name="Save"
          />
        </div>
      </form>
      { loading && <PageLoader/> }
    </div>
  )
}

export default AddEdit
