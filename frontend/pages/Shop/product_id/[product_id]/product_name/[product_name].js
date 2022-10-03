import { QueryClient, useQuery, dehydrate, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Context from '../../../../../context/context'
import Modal from 'react-modal';
import ContactForm from '../../../../../components/ContactForm'
import PersonalDetails from '../../../../../components/PersonalDetails'
import { useCartAndRazorpay } from '../../../Checkout/[CheckoutDetails]'
export default function Product_Name(props) {
	const router = useRouter()
	const { user, setEach_Product, authtoken, OrderDetails, setOrderDetails,RazorPayDetails,IsModal,setIsModal } = useContext(Context)
	console.log('OrderDetails in EachProduct', OrderDetails);
	const EachProduct = useQuery(['EachProduct'], () => {
		return fetchEachProduct(router.query.product_id)
	}, {
		onSuccess: () => {
			setEach_Product(EachProduct.data)
		}
	})

	const [ImageColor, setImageColor] = useState(EachProduct.data.image_white_url)

	const [KartElement, setKartElement] = useState({ product: EachProduct.data.id, color: "white", quantity: 1, size: 'S', user: user?.username,price:EachProduct.data.price,ordered_image_url:"",product_name:EachProduct.data.title})
	const [IsOrderModal, setIsOrderModal] = useState(false)
	

	const { mutate } = useAddToKart(EachProduct.data.id, EachProduct.data.title)
	const onSubmit = (x) => {

		let object = {}
		object['details'] = KartElement
		object.details['product_image'] = x
		object['token'] = props?.cookies?.access
		mutate(object)
		setIsOrderModal(false)
	}
	
	
	
	const onFetchRazorpayDetails = () =>{

		localStorage.setItem('ImageColor1',ImageColor)
		localStorage.setItem('SingleOrderedItem',JSON.stringify(KartElement))
		router.push(`/Shop/CheckoutSingleOrder/${user?.username}`)
		
	}
	
	return (
		<div className='py-32'>
			
			
		<section className="text-gray-600 body-font overflow-hidden">
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<img crossOrigin={true} alt="ecommerce" className="lg:w-1/2 w-full  object-cover object-center rounded" src={ImageColor} />
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">{EachProduct.data.category}</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{EachProduct.data.title}</h1>
						<div className="flex mb-4">
							<span className="flex items-center">
								<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<span className="text-gray-600 ml-3">4 Reviews</span>
							</span>
							<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
								<a className="text-gray-500">
									<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
									</svg>
								</a>
								<a className="text-gray-500">
									<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
										<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
									</svg>
								</a>
								<a className="text-gray-500">
									<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
										<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
									</svg>
								</a>
							</span>
						</div>
						<p className="leading-relaxed">{EachProduct.data.desc}</p>
						<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
							<div className="flex">
								<span className="mr-3 my-auto">Color</span>
								<button className={`border-2 focus:border-2 ${ImageColor === EachProduct.data.image_white_url ? "border-black" : "border-gray-300"} focus:border-black  rounded-full w-8 h-8 focus:outline-none`} onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_white_url)
									setImageColor(EachProduct.data.image_white_url)
									setKartElement({ ...KartElement, color: "white" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-gray-700 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_black_url)
									setImageColor(EachProduct.data.image_black_url)
									setKartElement({ ...KartElement, color: "black" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-indigo-500 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_blue_url)
									setImageColor(EachProduct.data.image_blue_url)
									setKartElement({ ...KartElement, color: "blue" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-rose-500 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_red_url)
									setImageColor(EachProduct.data.image_red_url)
									setKartElement({ ...KartElement, color: "red" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-green-500 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_green_url)
									setImageColor(EachProduct.data.image_green_url)
									setKartElement({ ...KartElement, color: "green" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-indigo-900 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_dark_blue_url)
									setImageColor(EachProduct.data.image_dark_blue_url)
									setKartElement({ ...KartElement, color: "dark_blue" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-blue-400 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_light_blue_url)
									setImageColor(EachProduct.data.image_light_blue_url)
									setKartElement({ ...KartElement, color: "light_blue" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-yellow-500 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_yellow_url)
									setImageColor(EachProduct.data.image_yellow_url)
									setKartElement({ ...KartElement, color: "yellow" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-gray-500 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_gray_url)
									setImageColor(EachProduct.data.image_gray_url)
									setKartElement({ ...KartElement, color: "gray" })
								}}></button>
								<button className="border-2 focus:border-2 focus:border-black border-gray-300 ml-1 bg-red-900 rounded-full w-8 h-8 focus:outline-none" onClick={() => {
									localStorage.setItem('ImageColor', EachProduct.data.image_maroon_url)
									setImageColor(EachProduct.data.image_maroon_url)
									setKartElement({ ...KartElement, color: "maroon" })
								}}></button>
							</div>
							<div className="flex ml-6 items-center">
								<span className="mr-3">Size</span>
								<div className="relative">
									<select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onChange={(e) => {
										setKartElement({ ...KartElement, size: e.target.value })

									}}>
										<option className={``}>S</option>
										<option className={``}>M</option>
										<option className={``}>L</option>
										<option className={``}>XL</option>
										<option className={``}>XXL</option>
									</select>
									<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
										<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
											<path d="M6 9l6 6 6-6"></path>
										</svg>
									</span>
								</div>
							</div>
						</div>
						<div className=' flex border-b-2 py-2 pb-6 my-5'>
							<div className='my-auto'>
								Quantity :
							</div>
							<div>
								{[1, 2, 3, 4, 5].map((data) => {
									return (
										<button key={data} className={` ${KartElement.quantity === data ? "bg-pink-500 focus:text-white " : ''} border-2  transition-all focus:border-2 
												font-bold border-gray-900 mx-3  rounded-full w-8 h-8 focus:outline-none `} onClick={() => {
												setKartElement({ ...KartElement, quantity: data })
											}}>{data}</button>
									)
								})}

							</div>
						</div>
						<div className="flex justify-between">
							<span className="title-font font-medium text-2xl text-gray-900">{EachProduct.data.price} Rs.</span>
							<div className='flex'>
								<button disabled={!user && !authtoken && !props?.cookies?.access} className="flex  text-white bg-indigo-500 border-0 py-2 px-6 ml-4 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
									onSubmit(ImageColor)
								}}>ADD TO KART</button>
								<button disabled={!user && !authtoken && !props?.cookies?.access} className="flex  text-white bg-indigo-500 border-0 py-2 px-6 ml-4 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
									
									onFetchRazorpayDetails()
								}}>ORDER NOW</button>

								<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex  items-center justify-center text-gray-500 ml-4">
									<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
										<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		</div >
	)
}


const fetchEachProduct = async (id) => {

	return axios.get(`https://youtube-backend-youtube-backen.herokuapp.com/api/v1/RetrieveUpdateDestroyProduct/${id}/`).then((response) => {
		return response.data
	})
}

export const getServerSideProps = async ({ req, res, params }) => {

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['EachProduct'], () => {
		return fetchEachProduct(params.product_id)
	})
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			cookies: req?.cookies
		}
	}
}


export const AddProductToKart = async (KartObject) => {

	return axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/AddElementToKart/', KartObject.details, {
		headers: {
			Authorization: 'Bearer ' + KartObject.token
		}
	})
}


export const useAddToKart = (product_id, product_name) => {

	const router = useRouter()
	const { user } = useContext(Context)
	const queryClient = useQueryClient()
	return useMutation(AddProductToKart, {
		onSuccess: () => {
			toast(`Product ${product_name} Added To Kart`)
			queryClient.invalidateQueries(['KartProducts'])
			if (router.pathname === `/Shop/product_id/${product_id}/product_name/${product_name}`) {
				router.push(`/Shop/Kart/User/${user.username}`)
			}

		},
		onError: (context) => {
			toast.error("Couldnt Update Note Try Again After Some time");
			queryClient.setQueryData(["KartProducts"], context.previousData)
		}
	})
}


