import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import OrderItem from '../../../../components/OrderItem'

export default function YourOrders(props) {
    const AllOrders = useQuery(['UsersOrders'],()=>{
        return fetchUsersOrders(props.cookies.access)
    })
    
  return (
    <div className='py-32'>
      <OrderItem AllOrders={AllOrders} cookies={props.cookies} />
    </div>
  )
}

const fetchUsersOrders = async (token) =>{
    return axios.get('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/GetUsersOrderItems',{
        headers:{
            Authorization:'Bearer ' + token
        }
    }).then((response)=>{
        return response.data
})
}
export const getServerSideProps = async ({req,res,params}) =>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['UsersOrders'],()=>{
        return fetchUsersOrders(req.cookies.access)
    })
    return {
        props:{
            dehydrateState:dehydrate(queryClient),
            cookies:req.cookies
        }
    }
}