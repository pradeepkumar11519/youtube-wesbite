import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import Context from '../context/context'
export default function YourOrderDetails({ order, cookies }) {
	const { setShippingDetails, ShippingDetails } = useContext(Context)

	return (
		<div className='grid grid-cols-[auto_auto] p-3'>
			<div className=''>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>ORDERED BY :  </span>
					<span className='font-medium '>{ShippingDetails?.user}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>EMAIL ORDERED WITH : </span>
					<span className='font-medium '> {ShippingDetails?.email}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>ORDER DATE : </span>
					<span className='font-medium '> {ShippingDetails?.created_at_date}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>ORDERED TIME : </span>
					<span> {ShippingDetails?.created_at_time}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>PAYMENT : </span>
					<span className='font-medium '>{ShippingDetails?.final_amount_with_gst} </span>
					<span className='font-medium '> {ShippingDetails?.payment_status}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>TRACKING NUMBER : </span>
					<span className='font-medium '>{ShippingDetails?.tracking_no}</span>
				</div>

				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>ORDERED TIME : </span>
					<span className='font-medium '>{ShippingDetails?.created_at_time}</span>
				</div>
			</div>
			<div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>SHIPPING ADDRESS : </span>
					<span className='font-medium '>{ShippingDetails?.address}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>SHIPPING STATE : </span>
					<span className='font-medium '>{ShippingDetails?.state}</span>
				</div>
				<div className=' my-2'>
					<span className='font-bold mx-0 my-2 text-md'>SHIPPING CITY : </span>
					<span className='font-medium '>{ShippingDetails?.city} {ShippingDetails?.pincode}</span>
				</div>
			</div>
		</div>
	)
}
