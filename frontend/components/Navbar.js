import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo1 from '../public/images/logo1.jpg'
import { AiFillHome } from 'react-icons/ai'
import { FaUserFriends,FaBars } from 'react-icons/fa'
import Head from 'next/head'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import OffCanvasNavbar from './OffCanvasNavbar'
import Dropdown from './Dropdown'
import { useContext } from 'react'
import Context from '../context/context'

export default function Navbar() {
	const router = useRouter()
	
	const {openoffcanvas,authtoken,Logout,user} = useContext(Context)
	
	return (

		<div id="navbar" className={` h-fit z-[10]  w-full m-0 fixed bg-white top-0 left-0 right-0 mb-32`}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Asap+Condensed&family=Russo+One&display=swap" rel="stylesheet" crossorigin/>
			</Head>
			<div className='bg-teal-600 text-white text-center py-1'>Website Made By Pradeep</div>
			<div className='hidden md:grid grid-cols-[auto_303px_auto]  py-8'>


				{/* Logo Section  */}
				




				<div className=' my-auto'>
					<ul className='hidden md:flex justify-center  my-auto'>
						<li className='  mx-5 '>

							<Link href="/"><a className={`${router.pathname === "/" ? "text-black" : ""} text-xl hover:border-t-4 transition-all fade-in-out hover:border-teal-500 w-full h-full p-1 hover:text-black`}>HOME</a></Link>

						</li>
						
						 <li className={`  mx-5   `}>
						 	<div className='' >
							<Dropdown/>
							</div>
						</li>
						<li className='  mx-5 '>

							<Link href={`/Shop/YourOrders/${user?.username}/${user?.email}`}><a className={`${router.pathname === "/YourOrders" ? "text-black" : ""} text-xl hover:border-t-4 transition-all fade-in-out hover:border-teal-500 w-full h-full p-1 hover:text-black`}>YOUR ORDERS</a></Link>

						</li>

					</ul>
				</div>


				<div className='  flex ' id="logo ">


					

					<div id="logotext" className='my-auto mx-3 text-3xl font-medium text-start'>

						LIGHTENING WEB.

					</div>
				</div>

				
				<div className='  my-auto'>
					<ul className='hidden md:flex justify-center  my-auto'>
					<li className={`  mx-5  `}>
							<Link href={`/Shop/Kart/User/${user?.username}`}><a className={` ${router.pathname===`/Shop/Kart/User/` + user?.username} text-xl hover:border-t-4 transition-all fade-in-out hover:border-teal-500 w-full h-full p-1 hover:text-black`}>YOUR CART</a></Link>
						</li>
						{authtoken && user?(
							<li className='  mx-5 '>
							<Link href="#"><a className={`text-xl hover:border-t-4 transition-all fade-in-out hover:border-teal-500 w-full h-full p-1 hover:text-black`} onClick={()=>{
								Logout()
							}}>LOGOUT</a></Link>
							</li>
						):(
							<li className='  mx-5 '>
							<Link href="/JoinUs"><a className={`${router.pathname === "/JoinUs" ? "text-black" : ""} text-xl hover:border-t-4 transition-all fade-in-out hover:border-teal-500 w-full h-full p-1 hover:text-black`}>JOIN US</a></Link>
							</li>
						)}
						
						 
						
						
					</ul>
				</div>



				

			</div>
			
			<div className='flex md:hidden justify-between py-4'>
				<div id="logotext" className='   font-medium my-auto'>

					<p className='mx-3 flex flex-wrap break-all w-fit sm:text-xl md:text-2xl'>LIGHTENING WEB</p>

				</div>
				<div className='mx-2 my-auto  p-2'>
					<button className='p-1 rounded-md' onClick={()=>{
						openoffcanvas()
					}}>
					<FaBars className='w-6 h-6'/>
					</button>
				</div>
			</div>
			<OffCanvasNavbar />
		</div>
	)
}
