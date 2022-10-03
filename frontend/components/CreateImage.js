import React from 'react'
import { ref, uploadBytes, listAll, getDownloadURL ,} from 'firebase/storage'
import { storage } from '../config/firebaseConfig'
import {v4} from 'uuid'
import { useContext } from 'react'
import Context from '../context/context'
import ImageElement from './ImageElement'
import { useState } from 'react'
import {GrAdd} from 'react-icons/gr'

export default function CreateImage(props) {

    const {setloading,setimagestate,imagestate,setAddImage,AddImage} = useContext(Context)
    const [no_of_images,set_no_of_images] = useState(0)
    const uploadImage = (e) => {
        setloading(true)
        if (e.target.files[0]) {
            

            

            const uploadtask = ref(storage, `GUEST/${e.target.files[0].name + v4()}`)
            uploadBytes(uploadtask, e.target.files[0]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    
                    
                    
                    no_of_images = no_of_images + 1
                    set_no_of_images(no_of_images)
                    imagestate[`imageurl${no_of_images}`] = url
                    imagestate[`image${no_of_images}`] = e.target.files[0]
                    setAddImage([...AddImage,<ImageElement key={no_of_images} no_of_images={no_of_images} url={url} id={`IMAGE_BOX${no_of_images}`} />])
                    setloading(false)
                }).catch((error) => {
                    
                })
                alert('images uploaded')

            }).catch((error) => {
                
            })


        }

    }
    return (
        <div>
            
            <div className='mx-auto flex justify-center'>
                <label for="UploadImage" className='p-2 flex px-4  bg-gradient-to-tr cursor-pointer from-rose-600 to-violet-600 text-white rounded-md font-medium '><GrAdd className='my-auto  w-7 invert  h-7 mx-2' /> <div>ADD IMAGE</div></label>
                <input name="UploadImage" id="UploadImage" type="file" className='hidden 5' placeholder='Lower Text' onChange={(e) => {
                    uploadImage(e)

                }} />
            </div>
        </div>
    )
}
