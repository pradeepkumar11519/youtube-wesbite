import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { GrAdd, GrFormSubtract } from 'react-icons/gr'
import Context from '../context/context'
import { useAddToKart, AddProductToKart } from '../pages/Shop/product_id/[product_id]/product_name/[product_name]'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
export default function CartItem({ cartproduct, access, id, title }) {
    const { user } = useContext(Context)
    const [ProductObject, setProductObject] = useState({ product: null, user: user?.username, product_image: null, quantity: 1, size: null, color: null })
    const [ProductTitle, setProductTitle] = useState(null)
    const [Productid, setProductid] = useState(null)
    const [IsAddModal, setIsAddModal] = useState(false);
    const [IsDeleteModal, setIsDeleteModal] = useState(false);





    const { mutate } = useAddToKart(Productid, ProductTitle)
    const onAddProduct = () => {
        let addobject = {}
        addobject['details'] = ProductObject
        addobject['token'] = access
        mutate(addobject)
        setIsAddModal(false)
    }


    const test = useDeleteProduct(ProductTitle)
    const onDeleteProduct = () => {
        let deleteobject = {}
        deleteobject['details'] = ProductObject
        deleteobject['token'] = access
        test.mutate(deleteobject)
        setIsDeleteModal(false)
    }


    const customStyles = {
        content: {
            top: '35%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width: '60%',
            transform: 'translate(-40%, -10%)',
        },
        overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };
    return (
        <div>
            <div className='mb-5 ' >
                <Modal
                    style={customStyles}
                    isOpen={IsAddModal}
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setIsAddModal(false)
                    }}>
                    <div className="flex justify-between my-auto">
                        <h1 className='mx-2 font-medium text-center text-2xl my-auto'>DO YOU WANT TO ADD ANOTHER SAME PRODUCT</h1>
                        <button className='mx-2 p-2 bg-black text-white font-medium text-2xl' onClick={onAddProduct}>Add</button>
                    </div>
                </Modal>
                <Modal
                    style={customStyles}
                    isOpen={IsDeleteModal}
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setIsDeleteModal(false)
                    }}>
                    <div className="flex justify-between my-auto">
                        <h1 className='mx-2 font-medium text-center text-2xl my-auto'>DO YOU WANT TO DELETE A SINGLE PRODUCT</h1>
                        <button className='mx-2 p-2 bg-black text-white font-medium text-2xl' onClick={onDeleteProduct}>DELETE</button>
                    </div>
                </Modal>
                <div className=''>
                    <div className='grid grid-cols-[200px_500px_auto_200px]'>

                        <div className='border-2 border-black '>
                            <div>
                                <h4 className='text-center border-black text-xl font-bold  border-b-2'>PRODUCT</h4>
                            </div>
                            <Link href={`/Shop/product_id/${id}/product_name/${title}`}>
                                <a>
                                    <div className='mx-auto flex items-center my-auto'>
                                        <img className='max-h-[200px] w-[100px] mx-auto my-9' src={cartproduct.product_image || cartproduct.product_url} />
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='border-x-2 border-b-2 border-t-2 lg:border-x-0  border-black !text-center'>
                            <div>
                                <h4 className='text-center border-black text-xl font-bold  border-b-2'>PROPERTIES</h4>
                            </div>
                            <div className='my-2 mx-2'>
                                <span className='font-bold text-xl'>PRODUCT NAME : </span ><span className='text-lg
                             font-bold'>{cartproduct.product_title}</span>
                            </div>
                            <div className='my-2 mx-2'>
                                <span className='font-bold text-xl'>COLOR : </span><span className='text-lg font-bold'>{cartproduct.color}</span>
                            </div>
                            <div className='my-2 mx-2'>
                                <span className='font-bold text-xl'>SIZE : </span><span className='font-bold text-lg'>{cartproduct.size}</span>
                            </div>

                        </div>
                        <div className='lg:border-l-2 border-x-2 border-b-2  border-black'>
                            <div>
                                <h4 className='text-center  border-black text-xl font-bold break-all border-b-2 border-t-2 lg:border-x-0'>QUANTITY</h4>
                            </div>
                            <div className='flex justify-center my-12 items-center'>
                                <div className='border-2 border-black bg-gray-300'>
                                    <button className=' p-2 rounded-md' onClick={() => {
                                        setProductTitle(cartproduct.product_title)
                                        setProductid(cartproduct.product)
                                        setProductObject({ ...ProductObject, product: cartproduct.product, product_image: cartproduct.product_image, size: cartproduct.size, color: cartproduct.color })
                                        setIsDeleteModal(true)
                                    }}><GrFormSubtract className='w-3 h-3' />
                                    </button>

                                </div>
                                <div className='text-xl font-bold border-y-2 border-black w-[30px] text-center'>
                                    {cartproduct.quantity}
                                </div>
                                <div className='border-2 border-black bg-gray-300'>
                                    <button className=' p-2 rounded-md' onClick={() => {
                                        setProductTitle(cartproduct.product_title)
                                        setProductid(cartproduct.product)
                                        setProductObject({ ...ProductObject, product: cartproduct.product, product_image: cartproduct.product_image, size: cartproduct.size, color: cartproduct.color })
                                        setIsAddModal(true)

                                    }}>
                                        <GrAdd className='w-3 h-3' />
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div className='border-x-2 lg:border-l-0 border-b-2 border-black'>
                            <div>
                                <h4 className='text-center border-b-2 border-black text-xl font-bold break-all border-t-2 lg:border-x-0'>TOTAL PRICE</h4>
                            </div>
                            <div className='text-xl font-bold my-12 mx-auto  border-black w-[30px] text-center'>
                                {cartproduct.total_price}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

const DeleteProduct = (KartObject) => {
    return axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/DeleteElementFromKart/', KartObject.details, {
        headers: {
            Authorization: 'Bearer ' + KartObject.token
        }
    })
}

const useDeleteProduct = (product_name) => {
    const queryClient = useQueryClient()
    return useMutation(DeleteProduct, {
        onSuccess: () => {
            toast(`Product ${product_name} Deleted From Kart`)
            queryClient.invalidateQueries(['KartProducts'])
        },
        onError: (context) => {
            toast.error("Couldnt Update Note Try Again After Some time");
            queryClient.setQueryData(["KartProducts"], context.previousData)
        }
    })
}