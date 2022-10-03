import React from 'react'
import ShopNavbar from '../../components/ShopNavbar'
import Image from 'next/image'
import shop1 from '../../public/images/shop3.jpg'
import shop4 from '../../public/images/shop4.png'
import ShopCarousel from '../../components/ShopCarousel'
import { useRouter } from 'next/router'
import DragDiv from '../../components/DragDiv'
import ShopPage1 from '../../components/ShopPage1'
import ProductPage from '../../components/ProductPage'
import { dehydrate, useQuery,QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import Context from '../../context/context'
import SearchBar from '../../components/SearchBar'
import Choices from '../../components/Choices'


export default function Shop(props) {
	const {AllProducts,setAllProducts,FilterQuery} = useContext(Context)
	const Product = useQuery(['AllProducts'],()=>{
		return fetchAllProducts()
	},{
		onSuccess:()=>{
			setAllProducts(Product.data)
		},
		onError:()=>{},
	})
	
	
	return (
		<div className='py-[111px] '>
			
			{/* <DragDiv/> */}
			<div className=' w-full'>
				
				
				<div className='grid-rows-[auto_auto] '>


					<div className='mx-10'>
						<ShopPage1/>

						
					</div>

					{/* <div className='mx-auto w-full py-16  shadow-[1px_1px_20px_1px] shadown-zinc-900/50  '>

						<div id="carousel" className=' w-fit  items-center flex justify-center mx-auto'>
							<ShopCarousel />
						</div>
					</div> */}

					<div className='mx-auto w-full py-16  shadow-[1px_1px_20px_1px] shadown-zinc-900/50 '>
					<h1 className='my-20 text-center font-bold text-3xl'>AVAILABLE PRODUCTS</h1>
						<div>
							<SearchBar  />
						</div>
						<div>
							<Choices Product={Product}  />
						</div>
						
						<ProductPage Product={Product}  />
					</div>


				</div>


			</div>

		</div>
	)
}



const fetchAllProducts = async (query) =>{
	
	return axios.get(`https://youtube-backend-youtube-backen.herokuapp.com/api/v1/ListAddProduct`).then((response)=>{
		return response.data
	})
}

export const getServerSideProps = async ({req,res,params}) =>{
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['AllProducts'],()=>{
		return fetchAllProducts()
	})
	
	return {
		props:{
			dehydratedState:dehydrate(queryClient)
		}
	}
}