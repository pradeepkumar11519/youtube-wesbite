import React from 'react'
import Image from 'next/image'
import home1 from '../public/images/logo1.jpg'
import Head from 'next/head'
export default function HomeSection1() {
    return (
        <div id="homesection1">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap" rel="stylesheet" />
            </Head>
            <div className='lg:grid grid-cols-2  bg-opacity-30 pt-32  pb-10  bg-emerald-200 '>

                <div className=' p-16 -translate-x-6'>
                    <div className='border-2 border-black translate-x-3 mx-auto my-auto'>
                        <div className='sm:p-12
        pt-6 pl-6 border-2 border-black translate-x-6 translate-y-6 sm:translate-x-12 sm:translate-y-12 mx-auto my-auto'>
                            <div className=' 
                            -translate-x-6 -translate-y-6 sm:-translate-x-12 sm:-translate-y-12 mx-auto my-auto sm:pt-12 sm:pl-12'>
                                <Image layout='responsive' className='' src={home1} placeholder="blur" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='my-auto mx-5'>
                    <h1 className='md:text-3xl text-2xl lg:text-5xl font-bold text-center md:pt-10 pt-5'>LOREM IPSUM DOLOR.</h1>
                    <p id="homesection1p" className='mt-10 mb-5 text-xs md:text-xl font-bold text-center'>AIT ENIM SE, SI URATUR, QUAM HOC SUAVE! DICTURUM. GLORIOSA OSTENTATIO IN CONSTITUENDO SUMMO BONO. ROGES ENIM ARISTONEM, BONANE EI VIDEANTUR HAEC.</p>

                </div>
            </div>
        </div>
    )
}
