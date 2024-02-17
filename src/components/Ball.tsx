import { useState, useEffect, useRef } from "react";
import { CSSProperties } from "react";
import "../App.css"

interface Props{
    position: number;
    value: number;
}


export default function Ball({position,value}:Props){
    
    const [click, setClick] = useState<boolean>(false);
    const [clickEnd, setClickEnd] = useState<boolean>(false);
    const clickValue = useRef<number>(0); 

    const ballStyle = {
        position: "absolute", 
        top: "50%", 
        left: `${25*position}%`, 
        transform: `translate(-${25*position}%,-50%)`,
        zIndex: 1
    }

    useEffect(() => {
        // Czas po którym cień ballu zniknie z widoku html
        setTimeout(()=>{
            clickValue.current = 0
            setClickEnd(oldClickEnd => !oldClickEnd)
        },400)
    }, [click,position])
    
    return(
        <>
            <div className="ball" style={ballStyle} onClick={()=>{clickValue.current = 1; setClick(oldClick => !oldClick); }}>
                <label>{value}</label>
            </div>
            {
                clickValue.current > 0 && <div className="ball" style={{...ballStyle, "--x": position , animation: "clickedAnimation 0.4s ease-out", animationFillMode: "forwards", zIndex: 0 } as CSSProperties}></div>
            }
        </>
    )
}