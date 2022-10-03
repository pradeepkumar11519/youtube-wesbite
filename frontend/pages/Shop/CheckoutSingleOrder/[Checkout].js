import React from 'react'
import { useContext } from 'react'
import Context from '../../../context/context'
import Modal from 'react-modal'
import { useCartAndRazorpay } from '../Checkout/[CheckoutDetails]'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import ContactForm from '../../../components/ContactForm'
import PersonalDetails from '../../../components/PersonalDetails'
import axios from 'axios'
import { fetchKartProducts } from '../Kart/User/[Kart]'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function CheckoutSignleOrder(props) {
    const { user, OrderDetails, RazorPayDetails, IsModal, setIsModal, setOrderDetails } = useContext(Context)
    const [SingleProduct, setSingleProduct] = useState(typeof window !== "undefined" && localStorage.getItem('SingleOrderedItem') ? JSON.parse(localStorage.getItem('SingleOrderedItem')) : null)
    const router = useRouter()
    const FinalCartProducts = useQuery(['Final_Kart_Objects'], () => {
        return fetchKartProducts(props.access)
    })
    console.log(SingleProduct);
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
    }
    var options = {
        "key": "rzp_test_sQX1pglrS9XMaY", // Enter the Key ID generated from the Dashboard
        // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Lightening Web",
        "description": "Test Transaction",
        "image": "",
        "order_id": RazorPayDetails?.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {

            OrderDetails['razorpay_order_id'] = response.razorpay_order_id
            OrderDetails['razorpay_payment_id'] = response.razorpay_payment_id
            OrderDetails['razorpay_payment_signature'] = response.razorpay_signature
            await axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/handleEachOrderRequest/', OrderDetails, {
                headers: {
                    Authorization: 'Bearer ' + props.access
                }
            }).then((response) => {
                setOrderDetails({
                    user: user?.username,
                    Phone_Number: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    product: "",
                    price_of_product: "",
                    quantity: "",
                    color: "",
                    size: "",
                    ordered_image_url: "",
                    payment_method: "Razorpay",
                    final_amount_with_gst: ""
                })
                console.log(response);

                toast.success('Order SuccesFully Placed')
            }).catch((error) => {
                console.log(error)
                toast.error('Order Unsuccesfull,Amount Will Be Refunded Soon')
            })
        },
        "prefill": {
            "name": user?.username,
            "email": user?.email,
            "contact": OrderDetails.Phone_Number
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    useEffect(() => {
        const Script = document.createElement("script");
        const Form = document.getElementById('donateForm');
        Script.setAttribute('data-payment_button_id', 'your id')
        Form.appendChild(Script);
        Script.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')


    }, [])
    const test3 = useCartAndRazorpay()
    const onSubmit = () => {
        let KartObject = JSON.parse(localStorage.getItem('SingleOrderedItem'))
        OrderDetails['ordered_image_url'] = localStorage.getItem('ImageColor1')
        OrderDetails['color'] = KartObject.color
        OrderDetails['price_of_product'] = KartObject.price
        OrderDetails['product'] = KartObject.product
        OrderDetails['quantity'] = KartObject.quantity
        OrderDetails['size'] = KartObject.size
        OrderDetails['total_ordered_price'] = KartObject.price * KartObject.quantity
        let newobject = {}
        newobject['details'] = OrderDetails
        newobject['token'] = props.access
        test3.mutate(newobject)
    }
    return (
        <div className='py-32 my-24'>
            <Modal
                style={customStyles}
                isOpen={IsModal}
                ariaHideApp={false}
                onRequestClose={() => {
                    setIsModal(false)
                }}>
                <div className="flex justify-between my-auto">
                    <h1 className='mx-2 font-medium text-center text-2xl my-auto'>DO YOU WANT TO CONFIRM YOUR ORDER</h1>
                    <button className='mx-2 p-2 bg-black text-white font-medium text-2xl' onClick={() => {
                        var rzpi = new Razorpay(options)
                        rzpi.open()
                        setIsModal(false)
                    }}>CONFIRM</button>
                </div>
            </Modal>
            <form id='donateForm'> </form>
            <div className='flex justify-center'>
                <div className='mx-10 w-fit'>
                    <h1 className='text-2xl font-bold text-center bg-orange-500 rounded-t-full text-white'>SHIPPING DETAILS</h1>
                    <div className='border-2 border-orange-500'>
                        <ContactForm />
                        <PersonalDetails />
                    </div>
                </div>
            </div>
            <div>
                <h1 className='my-10 py-10 text-2xl font-bold text-center'>YOUR ORDERED PRODUCT</h1>
                <div className='md:grid grid-cols-[auto_auto_auto_auto] border-2 border-black my-10 md:mx-20 mx-10 p-2 text-center'>


                    <div className=' flex justify-center border-2 border-black'>
                        <img className='w-32 h-32 mx-auto my-auto' src={typeof window !== "undefined" && localStorage.getItem('ImageColor1')} alt="" />
                    </div>
                    <div className='border-2 border-black'>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>PRODUCT NAME : </span> <span className='font-medium'> {SingleProduct?.product_name}</span>
                        </h1>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>PRODUCT COLOR : </span> <span className='font-medium'> {SingleProduct?.color}</span>
                        </h1>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>PRODUCT SIZE : </span> <span className='font-medium'> {SingleProduct?.size}</span>
                        </h1>
                    </div>
                    <div className='border-2 border-black'>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>ORDERED QUANTITY : </span> <span className='font-medium'> {SingleProduct?.quantity}</span>
                        </h1>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>EACH PRODUCT PRICE: </span> <span className='font-medium'> {SingleProduct?.price}</span>
                        </h1>

                    </div>
                    <div className='border-2 border-black'>
                        <h1 className='my-3'>
                            <span className='font-bold text-lg '>TOTAL PRICE: </span> <span className='font-medium'> {SingleProduct?.price * SingleProduct?.quantity}</span>
                        </h1>
                    </div>






                </div>
            </div>
            <div>
                <div className='my-10 mx-10 '>

                    <h1 className='font-medium text-2xl text-center  py-2 bg-orange-500 rounded-t-full text-white'>FINAL BILL</h1>
                    <div className='md:p-10 p-2 border-2 border-orange-500'>
                        <h1 className='my-5 flex justify-between'>
                            <span className='font-bold text-xl '>TOTAL ORDERED PRICE : </span>
                            <span className='font-bold text-xl'>{SingleProduct?.price * SingleProduct?.quantity}</span>
                        </h1>
                        <h1 className='my-5 flex justify-between'>
                            <span className='font-bold text-xl '>RAZORPAY INTEGRATION CHARGES : </span>
                            <span className='font-bold text-xl'>{SingleProduct?.price * SingleProduct?.quantity * 0.0236}</span>
                        </h1>
                        <h1 className='my-5 flex justify-between'>
                            <span className='font-bold text-xl '>DELIVERY CHARGES : </span>
                            <span className='font-bold text-xl'>{150}</span>
                        </h1>
                        <hr className='my-2 border-black border-2 h-0 bg-black' />
                        <h1 className='my-5 flex justify-between'>
                            <span className='font-bold text-xl '>GRAND TOTAL : </span>
                            <span className='font-bold text-xl'>{SingleProduct?.price * SingleProduct?.quantity + SingleProduct?.price * SingleProduct?.quantity * 0.0236 + 150}</span>
                        </h1>
                        <hr className='my-2 border-black border-2 h-0 bg-black' />
                        <div className='mx-auto flex justify-center my-5'>
                            <button disabled={test3.isLoading} className='border-2 border-purple-500 p-2 mx-auto bg-purple-600/90 hover:bg-purple-600/100 tranition-all fade-in-out focus:ring-4 focus:ring-purple-500 font-bold text-white' id="checkout" onClick={() => {
                                onSubmit()


                            }}>{test3.isLoading ? "Loading..." : "PLACE ORDER"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-10 md:mx-20 mx-10 p-2 text-center'>
                <h1 className='my-10 py-10 text-2xl font-bold text-center'>HEY!!! HAVE YOU FORGOTTEN ABOUT YOUR CART DO YOU WANT TO CHECKOUT THROUGH YOUR CART</h1>
                {FinalCartProducts?.data?.Users_Cart?.map((cart) => {
                    return (
                        <div key={cart.id} className='md:grid grid-cols-[auto_auto_auto_auto] border-2 border-black my-10 p-2'>


                            <div className=' flex justify-center border-2 border-black'>
                                <img className='w-32 h-32 mx-auto my-auto' src={cart.product_image} alt="" />
                            </div>
                            <div className='border-2 border-black'>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>PRODUCT NAME : </span> <span className='font-medium'> {cart.product_title}</span>
                                </h1>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>PRODUCT COLOR : </span> <span className='font-medium'> {cart.color}</span>
                                </h1>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>PRODUCT SIZE : </span> <span className='font-medium'> {cart.size}</span>
                                </h1>
                            </div>
                            <div className='border-2 border-black'>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>ORDERED QUANTITY : </span> <span className='font-medium'> {cart.quantity}</span>
                                </h1>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>EACH PRODUCT PRICE: </span> <span className='font-medium'> {cart.product_price}</span>
                                </h1>

                            </div>
                            <div className='border-2 border-black'>
                                <h1 className='my-3'>
                                    <span className='font-bold text-lg '>TOTAL PRICE: </span> <span className='font-medium'> {cart.total_price}</span>
                                </h1>
                            </div>






                        </div>
                    )
                })}
                <div className='bg-gray-300 flex justify-center py-5'>
                    <button className='bg-gray-800/90 text-white hover:bg-gray-900 transition-all fade-in-out p-2 font-bold mx-auto ' onClick={() => {
                        router.push(`/Shop/Checkout/${user?.username}`)
                    }}>CHECKOUT</button>
                </div>
            </div>

        </div>
    )
}


export const getServerSideProps = async ({ req, res, params }) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['Final_Kart_Objects'], () => {
        return fetchKartProducts(req.cookies.access)
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            access: req.cookies.access
        }
    }
}