import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import CartItem from '../../../../components/CartItem'
import Context from '../../../../context/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Kart(props) {
	const { user } = useContext(Context)
	const router = useRouter()
	const KartProduct = useQuery(['KartProducts'], () => {
		return fetchKartProducts(props.cookies.access)
	})

	return (
		<div className='py-32 mx-10 '>
			<h1 className='my-20 text-center font-bold text-3xl'>{user?.username},Your Cart Has {KartProduct?.data?.Users_Cart?.length} Products</h1>
			<div className=''>

				{KartProduct?.data?.Users_Cart?.map((product) => {
					return (
						<div key={product.id}>

							<CartItem cartproduct={product} id={product.product}
								title={product.product_title} access={props.cookies.access} />

						</div>
					)
				})}
				<div className='h-full p-4 bg-gray-700/20 w-full flex justify-between'>
					<div className='flex'>
						<h1 className='font-bold text-xl my-auto'>YOUR TOTAL AMOUNT</h1>

						<h3 className='font-bold text-xl my-auto'>{` : `} {KartProduct?.data?.Users_Total_Amount}</h3>
					</div>
					<div>
						<button className='bg-gray-800/90 text-white hover:bg-gray-900 transition-all fade-in-out p-2 font-bold' onClick={()=>{
							router.push(`/Shop/Checkout/${user?.username}`)
						}}>CHECKOUT</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const fetchKartProducts = async (token) => {
	return axios.get('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/GetAllElementsFromKart', {
		headers: {
			Authorization: 'Bearer ' + token
		}
	}).then((response) => {
		return response.data
	})
}

export const getServerSideProps = async ({ req, res, params }) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['KartProducts'], () => {
		return fetchKartProducts(req.cookies.access)
	})
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			cookies: req.cookies
		}
	}
}