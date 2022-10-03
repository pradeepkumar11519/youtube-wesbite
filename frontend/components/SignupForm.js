import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import Input from "./Input";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export default function SignupForm() {
	const initialValues = {
		email: '',
		password: '',
		username: '',
		confirm_password: '',
	}
	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid Email Format!').required('Required!').min(5, 'Atleast 5 characters required!'),

		password: Yup.string().required('Required!').matches(/^(?=.{6,})/, "Must Contain 6 Characters!")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])/,
				"Must Contain One Uppercase, One Lowercase!"
			)
			.matches(
				/^(?=.*[!@#\$%\^&\*])/,
				"Must Contain One Special Case Character!"
			)
			.matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number!"),

		username: Yup.string().required('Required!').min(5, 'Atleast 5 characters required!'),

		confirm_password: Yup.string().required('Required!')
			.test('passwords-match', 'Passwords must match!', function (value) {
				return this.parent.password === value
			})
	})
	const less = useCreateUser()
	const onSubmit = (values) => {

		less.mutate(values)

	}
	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{
					formik => {
						return (
							<Form id="signup" className=' absolute w-[280px]  transition-all fade-in-out left-[450px] overflow-hidden
							 content-center mx-auto' >
								<Input className='w-[200px] sm:w-full my-[5px] border-b-2 bg-transparent  outline-none py-[10px]' type="text" id="username" name="username" placeholder='Username' />
								<Input className='w-[200px] sm:w-full my-[5px] border-b-2 bg-transparent  outline-none py-[10px]' type="email" id="email" name="email" placeholder='Email' />
								<Input className='w-[200px] sm:w-full my-[5px] border-b-2 bg-transparent  outline-none py-[10px]' type="password" id="password" name="password" placeholder='Password' />
								<Input className='w-[200px] sm:w-full my-[5px] border-b-2 bg-transparent  outline-none py-[10px]' type="password" id="confirm_password" name="confirm_password" placeholder='Confirm Password' />
								<button className='sm:w-[85%] py-[10px] px-[30px] block sm:mx-auto bg-gradient-to-r from-orange-600 rounded-full text-white to-yellow-500 my-10' id="submit-btn" type="submit">SIGNUP</button>
							</Form>
						)
					}
				}
			</Formik>

		</div>
	)
}


const CreateUser = (user) => {

	return axios.post('https://youtube-backend-youtube-backen.herokuapp.com/api/v1/Signup/', user)
}


const useCreateUser = () => {
	const router = useRouter()
	return useMutation(CreateUser, {
		onSuccess: (response) => {

			
			toast.success('HEY!!! You Have Sigged In Succesfully')
		},
		onError: (error) => {
			const newerror = error.response.data

			if (error.message == "Network Error") {
				toast.error('Network Error Please Try After Some Time', { position: toast.POSITION.TOP_LEFT })
			}
			if (newerror.username || newerror.error) {
				toast.error(newerror.username ? newerror.username[0] : newerror.error[0], { position: toast.POSITION.TOP_LEFT })

			}
			else {
				toast.error('Signup Unsuccesful Retry Again Later', { position: toast.POSITION.TOP_LEFT })
			}


		}
	})
}