import React from 'react'
import ShopNavbar from '../../../components/ShopNavbar'

import Image from 'next/image'
import {
	SketchPicker
} from 'react-color';

import { AiOutlineDown } from 'react-icons/ai'
import { useState } from 'react'
import DragDiv from '../../../components/DragDiv';
import html2canvas from 'html2canvas'

import { ref, uploadBytes, listAll, getDownloadURL, } from 'firebase/storage'
import domtoimage from 'dom-to-image'
import { storage } from '../../../config/firebaseConfig.js';
import { v4 } from 'uuid'
import { useEffect } from 'react';
import { useContext } from 'react';
import Context from '../../../context/context';
import * as htmlToImage from 'html-to-image';
import { FaChessKing } from 'react-icons/fa';
import CreateTextBox from '../../../components/CreateTextBox';
import CreateImage from '../../../components/CreateImage';
import DeleteTextbox from '../../../components/DeleteTextbox';
import DeleteImage from '../../../components/DeleteImage';



export default function Tshirt() {
	const {imagestate,setimagestate,AddImage,AddTextBox,RemoveTextId} = useContext(Context)
	


	




	// console.log('imagestate',imagestate);
	const UrlImg = 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/'
	
	return (
		<div className='pt-36 '>

			<div className='grid grid-cols-[300px_auto]   '>
				<div className='flex justify-center h-full bg-white   shadow-[0px_0px_13px_0]'>
					<ShopNavbar />
				</div>

				
					<div className='grid grid-row-[auto_auto]  mx-10 '>
						<div className='grid grid-cols-[auto_auto]  w-full '>

							<div className='  w-full my-auto mx-auto'>
								<div className=' w-full mx-auto  '>
									

									<div id="clothDesign" className={`bg-[url('/images/black-removebg-preview.png')] w-[500px]
									mx-auto justify-center h-[500px]  bg-center bg-cover bg-no-repeat z-[-10] flex items-center`}>
										<div id="underClothDesign" className='hover:border-2 w-[330px] overflow-hidden border-white border-dashed transition-all fade-in-out h-[400px]'>
											<div>
											
											{AddTextBox}
											</div>
											{AddImage}



										</div>
									</div>
								</div>
							</div>


							<div className='w-[500px] ml-10  shadow-2xl p-5 my-10'>
								<h3 className='text-3xl text-center font-bold my-10'>SETTINGS</h3>
								<h4 className='my-10 text-center text-xl font-bold'>CHANGE T-SHIRT COLOR</h4>

								<div className='flex flex-wrap my-3 justify-between'>
									<button onClick={() => {
										setimagestate({ ...imagestate, imagecolor: 'white' })
										document.getElementById('clothDesign').style.backgroundImage = "url(/images/white-removebg-preview.png)"
									}}>
										<img className='w-10 h-10 mx-3' src={`${UrlImg}white.png`} alt="white_shirt" />
									</button>

									<button onClick={() => {
										setimagestate({ ...imagestate, imagecolor: 'black' })
										document.getElementById('clothDesign').style.backgroundImage = "url(/images/black-removebg-preview.png)"
									}}>
										<img className='w-10 h-10 mx-3' src={`${UrlImg}black.png`} alt="black_shirt" />
									</button>

									<button onClick={() => {
										setimagestate({ ...imagestate, imagecolor: 'grey' })
										document.getElementById('clothDesign').style.backgroundImage = "url(/images/grey-removebg-preview.png)"
									}}>
										<img className='w-10 h-10 mx-3' src={`${UrlImg}grey.png`} alt="grey_shirt" />
									</button>

									<button onClick={() => {
										setimagestate({ ...imagestate, imagecolor: 'blue' })
										document.getElementById('clothDesign').style.backgroundImage = "url(/images/blue-removebg-preview.png)"
									}} >
										<img className='w-10 h-10 mx-3' src={`${UrlImg}blue.png`} alt="blue_shirt" />
									</button>

									<button onClick={() => {
										setimagestate({ ...imagestate, imagecolor: 'red' })
										document.getElementById('clothDesign').style.backgroundImage = "url(/images/red-removebg-preview.png)"
									}}>
										<img className='w-10 h-10 mx-3' src={`${UrlImg}red.png`} alt="red_shirt" />
									</button>
								</div>


								
								<div>
								
								<h4 className='mt-10 text-center text-xl font-bold'>TEXT CORNER</h4>
								
								<CreateTextBox />
								<DeleteTextbox/>
								</div>
								
								<h4 className='mt-10 text-center text-xl font-bold'>Write Text</h4>

								<div>
									<input disabled={!RemoveTextId} type="text" name={`TextBox`} id={`TextBox`} className='outline-none border-2 border-black my-3 p-2 w-full mx-auto' placeholder='Text' onChange={(e) => {

										
										document.getElementById(RemoveTextId).innerHTML = e.target.value
										setimagestate({ ...imagestate, text:e.target.value })
									}} />
								</div>
								

									<div>
									<h4 className='my-10 text-center text-xl font-bold'>Image CORNER</h4>
								
								<CreateImage  />
								<DeleteImage/>
								</div>


								<hr />
								<button className='w-full text-white bg-blue-600 my-6 hover:bg-blue-600/90 p-2' onClick={() => {
									var element = document.querySelector('#clothDesign');
									htmlToImage.toJpeg(element).then((data) => {
										
										var link = document.createElement('a')
										
										link.download = "my-image.png"
										link.href = data;
										
										link.click();
									})


								}}>SAVE</button>



							</div>
						</div>
						<div className='shadow-2xl border-2 mb-20 p-5'>
							<h3 className='text-3xl text-center font-bold '>More Settings</h3>
							<div className='grid grid-cols-2'>
								<div className='mb-10'>
									<h4 className='my-5 text-center text-xl font-bold'>Upper Text Colour</h4>
									<div className='flex justify-center'>
										<SketchPicker color={imagestate.textcolor.upper} onChange={(color) => {
											setimagestate({
												...imagestate, textcolor: {
													...imagestate.textcolor,
													upper: color.hex
												}
											})
											document.getElementById('upper_text').style.color = String(color.hex)
										}} />
									</div>
								</div>
								<div>
									<h4 className='my-5 text-center text-xl font-bold'>Lower Text Colour</h4>
									<div className='flex justify-center'>
										<SketchPicker color={imagestate.textcolor.lower} onChange={(color) => {
											setimagestate({
												...imagestate, textcolor: {
													...imagestate.textcolor,
													lower: color.hex
												}
											})
											document.getElementById('lower_text').style.color = String(color.hex)
										}} />
									</div>
								</div>

								<div className='border-t-2 mx-5'>
									<h4 className='mt-10 text-center text-xl font-bold'>Upper Text Size</h4>
									<div className='flex justify-center'>

										<input type="range" min="0" max="59" className='outline-none border-2 border-black my-3 p-2 w-full mx-auto' placeholder='upper Text' onChange={(e) => {
											
											setimagestate({
												...imagestate, textsize: {
													...imagestate.textsize,
													upper: e.target.value
												}
											})
											document.getElementById('upper_text').style.fontSize = String(e.target.value) + 'px'
										}} />
									</div>
								</div>
								<div className='border-t-2 mx-5'>
									<h4 className='mt-10 text-center text-xl font-bold'>Lower Text Size</h4>
									<div className='flex justify-center'>

										<input type="range" min="0" max="59" className='outline-none border-2 border-black my-3 p-2 w-full mx-auto' placeholder='Lower Text' onChange={(e) => {
											setimagestate({
												...imagestate, textsize: {
													...imagestate.textsize,
													lower: e.target.value
												}
											})
											document.getElementById('lower_text').style.fontSize = String(e.target.value) + 'px'
										}} />
									</div>
								</div>


								<div className='border-t-2 mx-5'>
									<h4 className='mt-10 text-center text-xl font-bold'>Upper Text Font Weight</h4>
									<div className='flex justify-center'>

										<select className='outline-none border-2 border-black my-3 p-2 w-full mx-auto' placeholder='Upper Text' onChange={(e) => {
											setimagestate({
												...imagestate, textweight: {
													...imagestate.textweight,
													upper: e.target.value
												}
											})
											document.getElementById('upper_text').style.fontWeight = String(e.target.value)
										}} >
											<option value="normal">Medium</option>
											<option value="lighter">Lighter</option>
											<option value="bold">Bold</option>
											<option value="bolder">Bolder</option>

										</select>
									</div>
								</div>


								<div className='border-t-2 mx-5'>
									<h4 className='mt-10 text-center text-xl font-bold'>Lower Text Font Weight</h4>
									<div className='flex justify-center'>

										<select className='outline-none border-2 border-black my-3 p-2 w-full mx-auto' placeholder='Lower Text' onChange={(e) => {
											setimagestate({
												...imagestate, textweight: {
													...imagestate.textweight,
													lower: e.target.value
												}
											})
											document.getElementById('lower_text').style.fontWeight = String(e.target.value)
										}} >
											<option value="normal">Medium</option>
											<option value="lighter">Lighter</option>
											<option value="bold">Bold</option>
											<option value="bolder">Bolder</option>

										</select>
									</div>
								</div>



							</div>
						</div>
					</div>
			
			</div>



		</div>
	)
}
