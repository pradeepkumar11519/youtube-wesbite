import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'

export default function ContactForm() {
    const {user,OrderDetails,setOrderDetails} = useContext(Context)
    return (
        <div id="contact_details" className='transition-all fade-in-out w-[600px]'>
            <div className='   rounded-md w-full mx-auto '>
                
                <div className=' rounded-b-md  px-4'>
                    <div className=''>
                        <div className='my-4 grid grid-cols-[250px_auto]'>
                            <label className='font-bold mx-2 text-xl my-auto'>USERNAME: </label>
                            <input id="" name=""  className='border-2 border-black
                            text-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' placeholder={user?.username} value={user?.username}   required/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold mx-2 text-xl my-auto'>EMAIL : </label>
                            <input id="" name="" placeholder={user?.email} className='border-2 border-black
                            text-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' value={user?.email} required />
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold mx-2 text-xl my-auto'>PHONE NUMBER : </label>
                            <input id="" name="" placeholder="" className='border-2 border-black
                            text-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' onChange={(e)=>{
                                setOrderDetails({...OrderDetails,Phone_Number:e.target.value})
                            }}   required/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto]'>
                            <label className='font-bold text-xl mx-2 my-auto' >SHIPPING ADDRESS: </label>
                            <textarea type='text' id="address" name="address" placeholder="" className='border-2 border-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' onChange={(e)=>{
                                setOrderDetails({...OrderDetails,address:e.target.value})
                            }} required/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold text-xl mx-2 my-auto'>CLOSEST LANDMARK : </label>
                            <input type="text" id="landmark" name="landmark" placeholder="" className='border-2 border-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' onChange={(e)=>{
                                setOrderDetails({...OrderDetails,landmark:e.target.value})
                            }}/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold text-xl mx-2 my-auto'>PINCODE : </label>
                            <input type="number" id="pincode" name="pincode" placeholder="" className='border-2 border-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' onChange={(e)=>{
                                setOrderDetails({...OrderDetails,pincode:e.target.value})
                            }} required/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold text-xl mx-2 my-auto'>CITY : </label>
                            <input type="text" id="city" name="city" placeholder="" className='border-2 border-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full' onChange={(e)=>{
                                setOrderDetails({...OrderDetails,city:e.target.value})
                            }} required/>
                        </div>
                        <div className='my-4 grid grid-cols-[250px_auto] '>
                            <label className='font-bold mx-2 my-auto text-xl'>STATE : </label>
                            <select  id="state" name="state" placeholder="" className='border-2 border-black outline-none px-2 py-2 text-xl font-medium rounded-md w-full'  onChange={(e)=>{
                                setOrderDetails({...OrderDetails,state:e.target.value})
                            }}>
                                <option>KARNATAKA</option>
                                <option>KERALA</option>
                                <option>TAMIL NADU</option>
                                <option>ANDHRA PRADESH</option>
                                <option>MADHYA PARADEH</option>
                                <option>MAHARASTRA</option>
                                <option>ODISHA</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
