import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import Context from '../context/context';
import Products from './Products'

export default function ProductPage({Product}) {

	const {AllProducts} = useContext(Context)

	if(Product.isLoading){
		return <h1 className='mx-auto flex justify-center my-24 text-3xl font-bold'>Loading...</h1>
	}
	
	if(Product.isError){
		return <h1 className='mx-auto flex justify-center my-24 text-3xl font-bold'>{Product.error.message}</h1>
	}
	
	if(Product.isLoading){
		return <h1 className='mx-auto flex justify-center my-24 text-3xl font-bold'>Loading...</h1>
	}
	
	return (
		<div className='w-screen'>

			<div className='mx-20 md:grid grid-cols-4'>
			{Product.data?.map((product)=>{
				return (
					<Products key={product.id} product={product} />
				)
			})}
			</div>
		</div>
	)
}

