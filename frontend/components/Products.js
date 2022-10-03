import React from 'react'
import Link from 'next/link'
export default function Products({product}) {
	
	return (
		<div key={product.id}>
		<Link   href={`/Shop/product_id/${product.id}/product_name/${product.title}`}>
		<a className='hover:scale-105 cursor-pointer transition-all fade-in-out'>
		<div key={product.id}  className='shadow-[0_0_20px_7px] shadow-black my-20  rounded-md  mx-5 md:mx-10'>
			
				<div className="p-4 w-full">
				<div className="block relative h-full rounded overflow-hidden">
					<img alt="ecommerce" className="object-cover object-center rounded-md w-full h-full block" src={ product.image_red_front} />
				</div>
				<div className="mt-4">
					<h3 className=" text-xs tracking-widest title-font mb-1">{product.category}</h3>
					<h2 className=" title-font text-lg font-medium">{product.title}</h2>
					<p className="mt-1">{product.price} Rs.</p>
				</div>
			</div>
			
			
		</div>
		</a>
		</Link>
		</div>
	)
}
