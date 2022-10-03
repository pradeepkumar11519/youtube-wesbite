import { ContextProvider } from '../context/context'
import '../styles/globals.css'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
	Hydrate,
} from '@tanstack/react-query'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';











function MyApp({ Component, pageProps }) {
	const queryClient = React.useRef(new QueryClient())
	return (
		<>
			<QueryClientProvider client={queryClient.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<ContextProvider>

						<Navbar />
						<ToastContainer/>

						<Component {...pageProps} />
						

						{/* <Footer/> */}
					</ContextProvider>
				</Hydrate>
				<ReactQueryDevtools initialIsOpen={false}
					position="bottom-right" />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
