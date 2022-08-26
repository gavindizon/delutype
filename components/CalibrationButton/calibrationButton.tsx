import React, { FC, useState } from "react";
import Link from "next/link";
import { BsReception1 } from "react-icons/bs";


type Props = {
    onClick?: Function;
    className?: string;
    id?: string;
    clicks?: number;
    hide?: boolean;
    type?: "button" | "submit" | "reset";
    setRemaining: Function;
};


const CalibrationButton: FC<Props> = ({ className = "", id = "", clicks = 0, hide = false, onClick, type = "button", setRemaining}) => {

    className += "w-5 h-5 rounded-full bg-green-300 ";

    const [count, setCount] = useState(300)
    const [isFinished, setisFinished] = useState(false)

    
    return (
        <button
            
            onClick={(e) => {

                setCount((count )=> count+100)

                if (count+100 === 800){

                    setisFinished(true)
                    setRemaining((remaining:number)=> remaining-1)

                }
           
                
            }}
          
            className={`w-5 h-5 rounded-full ${isFinished ? "bg-red-500" : "bg-green-" + count} ${hide ? "hidden" : ""}`}
            
            id={id}
        >
        &nbsp;    
        </button>
    );
};

export default CalibrationButton;
