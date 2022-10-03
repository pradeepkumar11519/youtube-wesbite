import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import Context from '../context/context'
import TextBox from './TextBox'
import {GrAdd} from 'react-icons/gr'
export default function CreateTextBox(props) {
    const {setAddTextBox,AddTextBox} = useContext(Context)
    let [no_of_text_box, set_no_of_text_box] = useState(0)
    
    const AddInput = () => {
        no_of_text_box = no_of_text_box + 1
        set_no_of_text_box(no_of_text_box )
        
        setAddTextBox([...AddTextBox,<TextBox key={no_of_text_box} no_of_text_box={no_of_text_box}  id={`Text_Box${no_of_text_box}`} />])
        
}

return (
    <div className='my-10  text-center flex justify-center tr'>
        <div>
            <button className=' p-2 flex bg-gradient-to-tr from-rose-600 to-violet-600 text-white rounded-md font-medium my-auto px-4' onClick={AddInput}> <GrAdd className='my-auto  w-7 invert h-7 mx-2' /> <div>ADD TEXT </div></button>
        </div>
        <style jsx>
            {`
            
            `}
        </style>
    </div>
)
}
