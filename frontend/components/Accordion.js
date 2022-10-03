import React from 'react'
import {MdArrowDropDown} from 'react-icons/md'
export default function Accordion(props) {
    
    return (
        <div>
            <ul id="accordion" className='max-w-[400px]   rounded-[5px] '>
                <li className='list-none w-full  bg-white   rounded-[4px] shadow-[0_0_20px_0] '>
                    
                    <label  className='p-[10px] flex items-center justify-between text-2xl cursor-pointer bg-black text-white  ' htmlFor={props.id}>{props.header} <MdArrowDropDown/></label>
                    <input  className='hidden peer' type="checkbox" name="accordion_li" id={props.id} />
                    
                    <div id="content" className='overflow-hidden transition-all peer-checked:max-h-[400px] max-h-0 fade-in-out peer-checked:p-3 rounded-md'>{props.children}</div>
                    
                </li>
                
            </ul>
            
        </div>
    )
}
