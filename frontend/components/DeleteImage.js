import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import {GrSubtract} from 'react-icons/gr'
export default function DeleteImage() {
    const {setAddImage,RemoveImageId,AddImage} = useContext(Context)
    const RemoveImage = () =>{
        setAddImage(AddImage.filter((data,index)=>data.props.id !== RemoveImageId))
    }
  return (
    <div>
      <div className='my-10 text-center flex justify-center mx-auto'>
        <button onClick={RemoveImage} className='p-2 flex bg-gradient-to-tr from-rose-600 to-violet-600 text-white rounded-md font-medium my-auto py-2 '><GrSubtract className='my-auto  w-7 invert h-7 mx-2'/> <div>DELETE IMAGE</div></button>
      </div>
    </div>
  )
}
