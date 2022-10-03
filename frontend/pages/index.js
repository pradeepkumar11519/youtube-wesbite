import Head from 'next/head'
import Image from 'next/image'
import HomeSection1 from '../components/HomeSection1'
import HomeSection2 from '../components/HomeSection2'
import HomeSection3 from '../components/HomeSection3'
import Script from 'next/script'


export default function Home() {
	
	return (
		<div id='Home' className=''>

			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" crossorigin/>
				
				

			
			</Head>

			{/* 1st home page section  */}
			<div>
			<HomeSection1/>
			</div>

			<div>
				<HomeSection2/>
			</div>


			<div>
				<HomeSection3/>
			</div>
			









			


		</div>
	)
}
