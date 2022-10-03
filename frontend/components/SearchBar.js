import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import Cookies from 'js-cookie'
import axios from 'axios'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import {ImSearch} from 'react-icons/im'












export default function SearchBar() {
  
  const router = useRouter()
  return (
    <div>
      <div className='flex mx-20'>
        <input className='w-full p-2 outline-none border-2 border-black' type="text" name="search" id="search" placeholder="Search Here"  />
        <button className=' bg-teal-500 text-white p-3'  ><ImSearch/></button>
      </div>
    </div>
  )
}



