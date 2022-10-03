import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import DragDiv from './DragDiv'
export default function TextBox(props) {
        const {RemoveTextId,setRemoveTextId} = useContext(Context)
    return (
        <div id={`OuterBox${props.no_of_text_box}`} onClick={(e)=>{
            
            setRemoveTextId(e.target.id)
        }}>
            <div id={props.no_of_text_box} className={` text-center translate-y-[100px]   z-[10] mx-auto flex justify-center `}>
                <DragDiv header={`TextBox${props.no_of_text_box}`} wrapper={`textbox${props.no_of_text_box}`} className="relative flex justify-center">
                    <div id={`TextBox${props.no_of_text_box}`} className=''>

                        <p id={props.id} className={` text-white w-max z-[10] p-1 transition-all fade-in-out  border-2 border-dashed border-gray-100/0 focus:border-gray-100/100
                        active:border-gray-100/100
                        hover:border-gray-100/100`}>{props.id}</p>

                    </div>
                </DragDiv>
            </div>
        </div>
    )
}
