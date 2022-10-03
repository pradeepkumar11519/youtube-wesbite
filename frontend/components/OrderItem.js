import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import YourOrderDetails from './YourOrderDetails'

export default function OrderItem({ AllOrders, cookies }) {
    const { setShippingDetails } = useContext(Context)
    const onChangeToDetails = async (id, order_id) => {
        document.getElementById(`content${order_id}`).style.left = "-1000px"
        document.getElementById(`details${order_id}`).style.left = "0px"
        document.getElementById(`detailsbtn${order_id}`).style.borderColor = "blue"
        document.getElementById(`descbtn${order_id}`).style.borderColor = "black"
        document.getElementById(`detailsbtn${order_id}`).style.color = "blue"
        document.getElementById(`descbtn${order_id}`).style.color = "black"
        await axios.get(`https://youtube-backend-youtube-backen.herokuapp.com/api/v1/GetUsersOrder/${id}/`, {
            headers: {
                Authorization: 'Bearer ' + cookies.access
            }
        }).then((response) => {
            console.log('data', response.data);
            setShippingDetails(response.data)
            return response.data
        })

    }
    return (
        <div className='py-32 mx-auto flex flex-col justify-center'>
            {AllOrders?.data?.map((order) => {
                return (
                    <div className='mx-auto flex justify-center' key={order.id}>
                        <section className="text-gray-600 body-font overflow-hidden w-max">
                            <div className=" px-5 pt-0 mx-auto">
                                <div className="flex mx-20 justify-center">
                                    <div className=" w-full ">

                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{order.title_of_product}</h1>
                                        <div className="flex mb-4">
                                            <button id={`descbtn${order.id}`} className="flex-grow text-blue-600 border-b-2 border-blue-600 py-2 text-lg px-1" onClick={() => {
                                                document.getElementById(`content${order.id}`).style.left = "-0px"
                                                document.getElementById(`details${order.id}`).style.left = "1000px"
                                                document.getElementById(`detailsbtn${order.id}`).style.borderColor = "black"
                                                document.getElementById(`descbtn${order.id}`).style.borderColor = "blue"
                                                document.getElementById(`detailsbtn${order.id}`).style.color = "black"
                                                document.getElementById(`descbtn${order.id}`).style.color = "blue"
                                            }}>Description</button>
                                            <button id={`reviewbtn${order.id}`} className="flex-grow border-b-2 border-black py-2 text-lg px-1">Reviews</button>
                                            <button id={`detailsbtn${order.id}`} className="flex-grow border-b-2 border-black py-2 text-lg px-1" onClick={() => {
                                                onChangeToDetails(order.order, order.id)

                                            }}>Details</button>
                                        </div>
                                        <div className='h-full overflow-hidden transition-all fade-in-out w-full relative'>
                                            <div id={`content${order.id}`} className='absolute w-full h-full transition-all fade-in-out'>
                                                <div className="flex pb-2">
                                                    <span className="text-gray-500">Color</span>
                                                    <span className="ml-auto text-gray-900">{order.color}</span>
                                                </div>
                                                <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">Size</span>
                                                    <span className="ml-auto text-gray-900">{order.size}</span>
                                                </div>
                                                <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">Quantity</span>
                                                    <span className="ml-auto text-gray-900">{order.quantity}</span>
                                                </div>
                                                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                                    <span className="text-gray-500">Each Product Price</span>
                                                    <span className="ml-auto text-gray-900">{order.price_of_product} Rs</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="title-font font-medium text-2xl text-gray-900">{order.total_ordered_price}</span>
                                                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div id={`details${order.id}`} className='absolute left-[1000px] w-full h-fit border-2 border-black transition-all fade-in-out'>
                                                <YourOrderDetails order={order} cookies={cookies} />
                                            </div>
                                        </div>
                                    </div>
                                    <img alt="ecommerce" className="max-h-[500px] max-w-[500px]" src={order.ordered_image_url} />
                                </div>
                            </div>
                        </section>
                    </div>
                )
            })}

        </div>
    )
}
