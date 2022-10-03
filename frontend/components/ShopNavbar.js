import React from 'react'
import Accordion from './Accordion'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
export default function ShopNavbar() {
    return (
        <div className='m-3 h-screen '>
            <div className='flex mb-10 '>
                <input className='p-2 shadow-2xl  border-2 border-black rounded-md w-full' type="text" id="search" name="search" placeholder="search" />
                <button className='w-11 h-11 rounded-md  my-auto p-3   invert bg-white mx-1  flex items-center '><FaSearch className='' /></button>
            </div>
            <div className=''>
                <ul>
                    <li>
                        <Link href="/Shop"><a className='p-[10px] flex items-center justify-between text-2xl cursor-pointer bg-black text-white  '>SHOP PAGE</a></Link>
                    </li>
                </ul>
            </div>
            <div className='my-10'>
            <Accordion id="Caps" header="DESIGN YOUR CLOTH">
                <ul>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="/Shop/Design/Tshirt"><a>T-SHIRT</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>TROUSERS</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>HOODIES</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>PILLOWS</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>CAPS/HATS</a></Link>
                    </li>
                </ul>
            </Accordion>
            </div>
            <div className='my-10'>
            <Accordion id="Tshirts" header="T-SHIRTS">
                <ul>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="/Shop/Tshirt"><a>ALL T-SHIRTS</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 2</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 3</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 4</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 5</a></Link>
                    </li>
                </ul>
            </Accordion>
            </div>
            <div className='my-10'>
            <Accordion id="Trousers" header="TROUSERS">
                <ul>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 1</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 2</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 3</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 4</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 5</a></Link>
                    </li>
                </ul>
            </Accordion>
            </div>
            <div className='my-10'>
            <Accordion id="Hoodies" header="HOODIES">
                <ul>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 1</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 2</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 3</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 4</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 5</a></Link>
                    </li>
                </ul>
            </Accordion>
            </div>
            <div className='my-10'>
            <Accordion id="Caps" header="CAPS/HATS">
                <ul>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 1</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 2</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 3</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 4</a></Link>
                    </li>
                    <li className='my-2 text-black/60 hover:text-black transition-all fade-in-out'>
                        <Link href="#"><a>Link 5</a></Link>
                    </li>
                </ul>
            </Accordion>
            </div>
            
        </div>
    )
}
