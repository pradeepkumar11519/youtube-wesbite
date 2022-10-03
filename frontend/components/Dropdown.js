import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useRouter } from 'next/router'
export default function Dropdown() {
    const [activestate,setactivestate] = useState()
    const router = useRouter()
    useEffect(()=>{
        document.addEventListener('click',e=>{
            const isDropDownButton = e.target.matches(['data-dropdown-button'])

            

            if(!isDropDownButton && e.target.closest('[data-dropdown]')!==null){
                return 
            }
            else{
                
                document.getElementById('dropdown').classList.remove('active')
            }
            
            
                
            

            
        })
    },[])
        
    

    return (
        <div className='header  '>

            <div id="dropdown" className={`dropdown  relative`} data-dropdown>
                
                    <a data-dropdown-button onClick={()=>{
                        document.getElementById('dropdown').classList.toggle('active')
                    }} className={`cursor-pointer hover:text-black hover:border-t-4 hover:border-teal-500 text-xl transition-all  fade-in-out p-1 link 
            `}>MORE </a>
             
              
                <div id="dropdown-menu"  className="dropdown-menu absolute border-2 border-rose-500 left-0 top-10 bg-black p-5 rounded-md shadow-2xl  transition-all fade-in-out translate-y-[-10px] pointer-events-none flex">
                    <ul className='mx-5'>
                        <hr/>
                        <li className='my-4 text-xl '>
                            <Link href="/Videos"><a className={`text-white ${router.pathname==="/Videos"?"text-rose-500":""}`}>VIDEOS</a></Link>
                        </li>
                        <hr/>
                        <li className='my-4 text-xl '>
                            <Link href="/Shop"><a className={`text-white ${router.pathname==="/Shop"?"text-rose-500":""}`}>SHOP</a></Link>
                        </li>
                        <hr/>
                        <li className='my-4 text-xl '>
                            <Link href="/ChatRoom"><a className={`text-white ${router.pathname==="/ChatRoom"?"text-rose-500":""}`}>CHATROOM</a></Link>
                        </li>
                        <hr/>
                    </ul>
                    <ul className='mx-5'>
                    <hr/>
                        <li className='my-4 text-xl '>
                            <Link href="/About"><a className={`text-white ${router.pathname==="/About"?"text-rose-500":""}`}>ABOUT</a></Link>
                        </li>
                        <hr/>
                        <li className='my-4 text-xl '>
                            <Link href="/Contact"><a className={`text-white ${router.pathname==="/Contact"?"text-rose-500":""}`}>CONTACT</a></Link>
                        </li>
                        <hr/>
                        
                        
                    </ul>
                </div>
            </div>
            <style jsx>
                {`
                .dropdown-menu{
                    opacity:0;
                }
                .dropdown.active > .link + .dropdown-menu{
                    opacity:1;
                    transform:translateY(0);
                    pointer-events:auto;
                }
            `}
            </style>
        </div>
    )
}
