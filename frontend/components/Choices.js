import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import Context from '../context/context'

export default function Choices({Product}) {
    const {setFilterQuery,AllProducts,setAllProducts} = useContext(Context)
    
  return (
    <div className='mx-auto flex justify-center'>
      <select  className='border-2 border-black rounded-md font-bold text-2xl w-fit p-2 my-20' >
        <option className='font-medium text-xl'>ALL</option>
        {/* <option className='font-medium text-xl'>UNISEX HALF SLEEVE T-SHIRTS </option>
        <option className='font-medium text-xl'>WOMEN HALF SLEEVE T-SHIRT</option>
        <option className='font-medium text-xl'>FULL SLEEVE T-SHIRT</option>
        <option className='font-medium text-xl'>WOMEN FULL SLEEVE T-SHIRT</option>
        <option className='font-medium text-xl'>V NECK HALF SLEEVED T-SHIRT</option>
        <option className='font-medium text-xl'>UNISEX HOODIE</option>
        <option className='font-medium text-xl'>UNISEX SWEAT SHIRT</option>
        <option className='font-medium text-xl'>UNISEX TOP TANK</option>
        <option className='font-medium text-xl'>KIDS HALF SLEEEVE T-SHIRT</option>
        <option className='font-medium text-xl'>KIDS HALF SLEEEVE T-SHIRT</option>
        <option className='font-medium text-xl'>JOGGERS</option>
        <option className='font-medium text-xl'>THROW PILLOW</option> */}
      </select>
    </div>
  )
}

