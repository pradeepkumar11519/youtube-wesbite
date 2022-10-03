import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import {GrSubtract} from 'react-icons/gr'
export default function DeleteTextbox() {
    const {RemoveTextId,AddTextBox,setAddTextBox} = useContext(Context)
    const RemoveTextBox = () =>{
        
        
        
        setAddTextBox(AddTextBox.filter((data,i)=>{
          if(data.props.id !== RemoveTextId){
            
            return data
          }
          
        }))
    }
  return (
    <div>
        <div className='text-center mx-auto flex justify-center '>
        <button className='p-2 flex bg-gradient-to-tr from-rose-600 to-violet-600 text-white rounded-md font-medium my-auto py-2 ' onClick = {RemoveTextBox} > <GrSubtract className='my-auto  w-7 invert h-7 mx-2'/> <div>DELETE TEXT</div></button>
        </div>
    </div>
  )
}
