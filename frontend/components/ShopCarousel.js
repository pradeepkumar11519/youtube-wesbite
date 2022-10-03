import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import c1 from '../public/images/c1.webp'


export default function ShopCarousel() {
    return (
        <div className='w-[800px] shadow-2xl shadow-black h-fit rounded-md'>
            <Carousel autoPlay interval={2000} className="rounded-md"  infiniteLoop dynamicHeight={true} showThumbs={false}>
                <div className='rounded-full'>
                    <Image src={c1} placeholder="blur" />
                    <p className="legend">Legend 1</p>
                </div>
                <div className='rounded-full'>
                    <Image placeholder="blur" src={c1} />
                    <p className="legend">Legend 2</p>
                </div>
                <div className='rounded-full'>
                    <Image placeholde="blur" src={c1} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    )
}
