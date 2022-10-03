import React from 'react'
import {IoSend} from 'react-icons/io5'
export default function HomeSection3() {
	return (
		<div className='py-20 pb-24  mt-20 bg-opacity-70 bg-rose-100 px-10'>
			<div className='my-4 text-center text-3xl md:text-5xl font-bold'>
				<h1>NewsLetter</h1>
			</div>
			<p className='text-center my-4'>Get Timely Updates From Your Favorite People.</p>
			<div className='flex justify-center w-full'>
				<div className='w-[500px]'>
					<input placeholder='Your Email' className='w-full p-2 outline-none' />
				</div>
				<div className='my-auto'>
					<button className='border-2 border-teal-600 p-2 bg-teal-600'><IoSend className='w-10 h-5 text-white ' /></button>
				</div>
			</div>
		</div>
	)
}
