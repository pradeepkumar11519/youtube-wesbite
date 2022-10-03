import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import ContactForm from '../../../components/ContactForm'
import CreditCard from '../../../components/CreditCard'
import PersonalDetails from '../../../components/PersonalDetails'
import Context from '../../../context/context';
import { fetchKartProducts } from '../Kart/User/[Kart]';
import Modal from 'react-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Bill from '../../../components/Bill';
export default function CheckoutDetails(props) {
	const { user, OrderDetails, RazorPayDetails, IsModal, setIsModal, setOrderDetails } = useContext(Context)
	const FinalCartProducts = useQuery(['Final_Kart_Objects'], () => {
		return fetchKartProducts(props.access)
	})

	const { mutate, isLoading } = useCartAndRazorpay()
	const onSubmit = () => {
		let object = {}
		object['details'] = OrderDetails,
			object['token'] = props.access
		object.details['total_ordered_price'] = FinalCartProducts?.data.Users_Total_Amount
		mutate(object)
	}


	var options = {
		"key": "rzp_test_sQX1pglrS9XMaY", // Enter the Key ID generated from the Dashboard
		// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
		"currency": "INR",
		"name": "Lightening Web",
		"description": "Test Transaction",
		// "image":,
		"order_id": RazorPayDetails?.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
		"handler": async function (response) {

			OrderDetails['razorpay_order_id'] = response.razorpay_order_id
			OrderDetails['razorpay_payment_id'] = response.razorpay_payment_id
			OrderDetails['razorpay_payment_signature'] = response.razorpay_signature
			await axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/handlerequest/', OrderDetails, {
				headers: {
					Authorization: 'Bearer ' + props.access
				}
			}).then((response) => {
				setOrderDetails({
					user: user?.username,
					Phone_Number: "",
					address: "",
					city: "",
					state: "",
					pincode: "",
					product: "",
					price_of_product: "",
					quantity: "",
					color: "",
					size: "",
					ordered_image_url: "",
					payment_method: "Razorpay",
					final_amount_with_gst: ""
				})
				toast.success('Order SuccesFully Placed')
			}).catch((error)=>{
				console.log(error)
				toast.error('Order Unsuccesfull,Amount Will Be Refunded Soon')
			})
		},
		"prefill": {
			"name": user?.username,
			"email": user?.email,
			"contact": OrderDetails.Phone_Number
		},
		"notes": {
			"address": "Razorpay Corporate Office"
		},
		"theme": {
			"color": "#3399cc"
		}
	};
	useEffect(() => {
		const Script = document.createElement("script");
		const Form = document.getElementById('donateForm');
		Script.setAttribute('data-payment_button_id', 'your id')
		Form.appendChild(Script);
		Script.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')


	}, [])

	const customStyles = {
		content: {
			top: '35%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			width: '60%',
			transform: 'translate(-40%, -10%)',
		},
		overlay: {
			position: 'fixed',
			zIndex: 1020,
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			background: 'rgba(0, 0, 0, 0.75)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	}
	return (
		<div className='py-32 my-24  '>
			<Modal
				style={customStyles}
				isOpen={IsModal}
				ariaHideApp={false}
				onRequestClose={() => {
					setIsModal(false)
				}}>
				<div className="flex justify-between my-auto">
					<h1 className='mx-2 font-medium text-center text-2xl my-auto'>DO YOU WANT TO CONFIRM YOUR ORDER</h1>
					<button className='mx-2 p-2 bg-black text-white font-medium text-2xl' onClick={() => {
						var rzpi = new Razorpay(options)
						rzpi.open()
						setIsModal(false)
					}}>CONFIRM</button>
				</div>
			</Modal>
			<form id='donateForm'> </form>
			<div className='flex justify-center'>
				<div className='mx-10 w-fit'>
					<h1 className='text-2xl font-bold text-center bg-orange-500 rounded-t-full text-white'>SHIPPING DETAILS</h1>
					<div className='border-2 border-orange-500'>
						<ContactForm />
						<PersonalDetails />
					</div>
				</div>
			</div>
			<div>
				<h1 className='my-10 py-10 text-2xl font-bold text-center'>YOUR ORDERED PRODUCTS</h1>
				{FinalCartProducts?.data?.Users_Cart?.map((cart) => {
					return (
						<div key={cart.id} className='md:grid grid-cols-[auto_auto_auto_auto] border-2 border-black my-10 md:mx-20 mx-10 p-2 text-center'>


							<div className=' flex justify-center border-2 border-black'>
								<img className='w-32 h-32 mx-auto my-auto' src={cart.product_image} alt="" />
							</div>
							<div className='border-2 border-black'>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>PRODUCT NAME : </span> <span className='font-medium'> {cart.product_title}</span>
								</h1>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>PRODUCT COLOR : </span> <span className='font-medium'> {cart.color}</span>
								</h1>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>PRODUCT SIZE : </span> <span className='font-medium'> {cart.size}</span>
								</h1>
							</div>
							<div className='border-2 border-black'>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>ORDERED QUANTITY : </span> <span className='font-medium'> {cart.quantity}</span>
								</h1>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>EACH PRODUCT PRICE: </span> <span className='font-medium'> {cart.product_price}</span>
								</h1>

							</div>
							<div className='border-2 border-black'>
								<h1 className='my-3'>
									<span className='font-bold text-lg '>TOTAL PRICE: </span> <span className='font-medium'> {cart.total_price}</span>
								</h1>
							</div>






						</div>
					)
				})}
			</div>
			<div>
				<div className='my-10 mx-10 '>
					<h1 className='font-medium text-2xl text-center  py-2 bg-orange-500 rounded-t-full text-white'>FINAL BILL</h1>
					<div className='md:p-10 p-2 border-2 border-orange-500'>
						<h1 className='my-5 flex justify-between'>
							<span className='font-bold text-xl '>TOTAL ORDERED PRICE : </span>
							<span className='font-bold text-xl'>{FinalCartProducts.data.Users_Total_Amount}</span>
						</h1>
						<h1 className='my-5 flex justify-between'>
							<span className='font-bold text-xl '>RAZORPAY INTEGRATION CHARGES : </span>
							<span className='font-bold text-xl'>{FinalCartProducts.data.Users_Total_Amount * 0.0236}</span>
						</h1>
						<h1 className='my-5 flex justify-between'>
							<span className='font-bold text-xl '>DELIVERY CHARGES : </span>
							<span className='font-bold text-xl'>{150}</span>
						</h1>
						<hr className='my-2 border-black border-2 h-0 bg-black' />
						<h1 className='my-5 flex justify-between'>
							<span className='font-bold text-xl '>GRAND TOTAL : </span>
							<span className='font-bold text-xl'>{FinalCartProducts.data.Users_Total_Amount + FinalCartProducts.data.Users_Total_Amount * 0.0236 + 150}</span>
						</h1>
						<hr className='my-2 border-black border-2 h-0 bg-black' />
						<div className='mx-auto flex justify-center my-5'>
							<button disabled={isLoading} className='border-2 border-purple-500 p-2 mx-auto bg-purple-600/90 hover:bg-purple-600/100 tranition-all fade-in-out focus:ring-4 focus:ring-purple-500 font-bold text-white' id="checkout" onClick={() => {
								onSubmit()


							}}>{isLoading ? "Loading..." : "PLACE ORDER"}</button>
						</div>
					</div>
				</div>
			</div>







			{/*  */}
		</div>
	)
}


export const getServerSideProps = async ({ req, res, params }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['Final_Kart_Objects'], () => {
		return fetchKartProducts(req.cookies.access)
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			access: req.cookies.access
		}
	}
}

const fetchCartAndRazorpay = async (order_details) => {

	return axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/PlaceOrderThruCart/', order_details.details, {
		headers: {
			Authorization: 'Bearer ' + order_details.token
		}
	}).then((response) => {
		return response.data
	})
}


export const useCartAndRazorpay = () => {
	const { setRazorPayDetails, setIsModal, setOrderDetails, OrderDetails } = useContext(Context)
	const queryClient = useQueryClient()
	return useMutation(fetchCartAndRazorpay, {
		onSuccess: (response) => {
			setIsModal(true)
			setRazorPayDetails(response)
			setOrderDetails({ ...OrderDetails, final_amount_with_gst: response.final_amount_with_gst })
		},
		onError: () => {
			toast.error('Couldnt Place Order,Amount Not Deducted')
		}
	})
}