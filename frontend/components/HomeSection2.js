import React from 'react'
import home2 from '../public/images/home2.jpg'
import Image from 'next/image'

export default function HomeSection2() {
    return (
        <div>
            <section className="text-gray-600 body-font mx-5 md:mx-20 text-center">
                    <h1 className='mt-16 mb-5 lg:my-16 text-black font-bold text-center text-3xl lg:text-5xl'>HOW WE CLIMBED UP </h1>
                <div className="container px-5  mx-auto lg:grid grid-cols-2 text-sm md:text-xl">
                    <div className="flex flex-wrap -mx-4 mt-auto mb-auto   content-start sm:pr-10">
                        <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-xl md:text-xl mb-2 text-gray-900">Moon hashtag pop-up try-hard offal truffaut</h1>
                            <div className="leading-relaxed">Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable fingerstache kickstarter.</div>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
                            <p className="leading-relaxed">Users</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2>
                            <p className="leading-relaxed">Subscribes</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                            <p className="leading-relaxed">Downloads</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
                            <p className="leading-relaxed">Products</p>
                        </div>
                    </div>
                    <div className=" w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                        <div className="object-cover object-center w-full h-full">
                        <Image placeholder="blur" className='h-full w-full'  src={home2} alt="stats"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
