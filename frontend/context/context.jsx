import { useState } from "react";
import {v4} from 'uuid'
const { createContext } = require("react");
import Cookies from 'js-cookie'
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';


const Context = createContext()

export default Context

export const ContextProvider = ({children}) =>{
    const router = useRouter()
    const [username,setusername] = useState(null)
    const [loading, setloading] = useState(false)
	const [usercreatedimage, setusercreatedimage] = useState(null)
	const [AddTextBox, setAddTextBox] = useState([])
	const [AddImage, setAddImage] = useState([])
    const [RemoveTextId,setRemoveTextId] = useState(null)
    const [RemoveImageId,setRemoveImageId] = useState(null)
    const [AllProducts,setAllProducts] = useState([])
	const [FilterQuery,setFilterQuery] = useState(null)
    const [Each_Product,setEach_Product] = useState([])
    const [imagestate, setimagestate] = useState({
		imagecolor: 'black',
		uppertext: "Upper Text",
		lowertext: "Lower Text",
		textcolor: { upper: 'white', lower: 'white' },
		textsize: { upper: "25px", lower: "25px" },
		textweight: { upper: "normal", lower: 'normal' },
		image: null,
		imageurl: null
	})
    const [user,setuser] = useState(Cookies.get('user_details')?JSON.parse(Cookies.get('user_details')):null)
    console.log(user);
    const [authtoken,setauthtoken] = useState(typeof window!=='undefined' && localStorage.getItem('access_token') || typeof window!=='undefined' && localStorage.getItem('refresh_token')?{'access_token':typeof window!=='undefined' && localStorage.getItem('access_token'),'refresh_token':typeof window!=='undefined' && localStorage.getItem('refresh_token')}:null)
    const openoffcanvas = () =>{
		
		document.getElementById('offcanvas').classList.toggle('smenu')
	}
    const [OrderDetails,setOrderDetails] = useState({
        user:user?.username,
        Phone_Number:"",
        address:"",
        city:"",
        state:"KARNATAKA",
        pincode:"",
        product:"",
        price_of_product:"",
        quantity:"",
        color:"",
        size:"",
        ordered_image_url:"",
        payment_method:"Razorpay",
        final_amount_with_gst:""
    })

    const [RazorPayDetails,setRazorPayDetails] = useState(null)
    const [ShippingDetails,setShippingDetails] = useState(null)
    const Logout = () =>{
        if(typeof window!=='undefined'){
            localStorage.clear()
        }
        setauthtoken(null)
        setuser(null)
        Cookies.remove('user_details')
		Cookies.remove('access')
		Cookies.remove('refreh')
        axios.get('/api/auth/Logout').then((response)=>{
            router.push('/JoinUs')
            toast.success('Logged Out Succesfully')
        })
    }
    const [IsModal,setIsModal] = useState(false)
    console.log('RazorPayDetails',RazorPayDetails);
    const ContextData = {
        openoffcanvas:openoffcanvas,
        username:username,
        setusername:setusername,
        imagestate:imagestate,
        setimagestate:setimagestate,
        AddImage:AddImage,
        setAddImage:setAddImage,
        AddTextBox:AddTextBox,
        setAddTextBox:setAddTextBox,
        loading:loading,
        setloading:setloading,
        usercreatedimage:usercreatedimage,
        setusercreatedimage:setusercreatedimage,
        RemoveTextId:RemoveTextId,
        setRemoveTextId:setRemoveTextId,
        RemoveImageId:RemoveImageId,
        setRemoveImageId:setRemoveImageId,
        AllProducts:AllProducts,
        setAllProducts:setAllProducts,
        FilterQuery:FilterQuery,
        setFilterQuery:setFilterQuery,
        user:user,
        setuser:setuser,
        authtoken:authtoken,
        setauthtoken:setauthtoken,
        Logout:Logout,
        Each_Product:Each_Product,
        setEach_Product:setEach_Product,
        OrderDetails:OrderDetails,
        setOrderDetails:setOrderDetails,
        RazorPayDetails:RazorPayDetails,
        setRazorPayDetails:setRazorPayDetails,
        IsModal:IsModal,
        setIsModal:setIsModal,
        ShippingDetails:ShippingDetails,
        setShippingDetails:setShippingDetails,
    }
    console.log(OrderDetails);
    return (
        <Context.Provider value={ContextData}>
            {children}
        </Context.Provider>
    )
}