import React from 'react'
import { useContext } from 'react'
import Context from '../context/context'
import DragDiv from './DragDiv'
export default function ImageElement(props) {
    const {imagestate,setRemoveImageId,RemoveImageId} = useContext(Context)
    return (
        <div>
            <div onClick={(e)=>{
                setRemoveImageId(e.target.id)
            }} id={props.id} className='z-[-10] translate-y-[140px] '>
                <DragDiv header={`IMAGE${props.no_of_images}`} wrapper={`image${props.no_of_images}`} className="relative">
                    <img id={props.id} className="rounded max-w-[300px] max-h-[200px]  z-[-10]" src={props.url} alt="content" />
                </DragDiv>
            </div>
        </div>
    )
}
