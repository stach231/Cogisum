interface Props {
    text: string
    onChangePlay: () => void;
}

export default function StartButton({text,onChangePlay}:Props){
    
    const buttonStyle = {
        position: "absolute",
        left: "50%",
        top: "250px",
        transform: "translateX(-50%)",
        backGroundColor: "#aaaadd"
    }
    
    return(
        <>
            <button className='myButton' style={buttonStyle} onClick={onChangePlay}>{text}</button>
        </>
    )
}