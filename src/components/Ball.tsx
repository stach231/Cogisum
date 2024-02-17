import { useState, useEffect, useRef } from "react";
import { CSSProperties } from "react";
import "../App.css"

interface Props{
    position: number;
    value: number;
    play: boolean;
    add: [number,number,number][];
    mainValue: number;
    onChangeValue: (newValue:number) => void;
}


export default function Ball({position,value,play,add,mainValue,onChangeValue}:Props){
    
    const [click, setClick] = useState<boolean>(false); // Start animacji
    const [clickEnd, setClickEnd] = useState<boolean>(false); // Restart animacji
    const clickValue = useRef<boolean>(false); // Obecność animacji

    const ballStyle = {
        position: "absolute", 
        top: "50%", 
        left: `${25*position}%`, 
        transform: `translate(-${25*position}%,-50%)`,
        zIndex: 1
    }

    

    useEffect(() => {
        // Czas po którym cień piłki znika z widoku html
        setTimeout(()=>{
            clickValue.current = false
            setClickEnd(oldClickEnd => !oldClickEnd)
        },400)
    }, [click,position])
    
    return(
        <>
            <div className="ball" style={ballStyle} onClick={
                ()=>{
                    clickValue.current = true; 
                    setClick(oldClick => !oldClick); 
                    onChangeValue(add[value][position-1])
                    }}>
                <label>{value}</label>
            </div>
            {
                clickValue.current && <div className="ball" style={{...ballStyle, "--x": position , animation: "clickedAnimation 0.4s ease-out", animationFillMode: "forwards", zIndex: 0 } as CSSProperties}></div>
            }
        </>
    )
}