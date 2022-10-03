import React from 'react'
import { useEffect } from 'react'
import {FiMove} from 'react-icons/fi'
export default function DragDiv(props) {
    useEffect(()=>{
        const wrapper = document.getElementById(props.wrapper)
        const onDrag = ({movementX,movementY}) =>{
           let getStyle = window.getComputedStyle (wrapper)
        

           let left = parseInt(getStyle.left)
           let top = parseInt(getStyle.top)
           
           wrapper.style.left =`${left + movementX}px` 
           wrapper.style.top =`${top + movementY}px` 
        }
        let header = document.getElementById(props.header)
        
        header.addEventListener('pointerdown',()=>{
            header.addEventListener("pointermove",onDrag)
            
        })
        document.addEventListener('pointerup',()=>{
            header.removeEventListener("pointermove",onDrag)
        })
    },[])
    return (
        <div className={`${props.className} flex justify-center `}>
            <div id={props.wrapper} className='absolute cursor-pointer flex'>
                <div  className={` hidden bg-rose-500 p-3 hover:opacity-100 opacity-30 transition-all fade-in-out text-white`}><FiMove/></div>
                <div id={props.header}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
