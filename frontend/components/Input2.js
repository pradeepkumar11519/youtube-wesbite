import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function Input2({ id, name, className, type, placeholder, value, as, ...rest }) {
    return (
        <div>
            <Field as={as} name={name} {...rest}>
                {
                    ({ field, form, meta }) => {
                        return (
                            <div className='flex'>
                                <input className={className} type={type} placeholder={placeholder} value={value} {...field} />
                                <ErrorMessage name={name} >
                                    {
                                        (msg) => {
                                            return (
                                                <div className="">
                                                    <p className='p-1 text-center text-red-500 bg-white '>{msg}</p>
                                                </div>
                                            )
                                        }
                                    }

                                </ErrorMessage>
                            </div>
                        )

                    }
                }
            </Field>
        </div>
    )
}
