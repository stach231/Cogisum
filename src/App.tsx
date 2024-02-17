import { useState, useEffect, useRef } from 'react'
import './App.css'
import Ball from './components/Ball'
import StartButton from './components/StartButton'

function App() {

  const [values, setValues] = useState<number[]>([0,0,0]) // Trzy wartości widoczne na trzech piłkach
  const [play, setPlay] = useState<boolean>(false) // Stan gry
  const mainValue = useRef<number>(0) // Wartość, która jest aktualnie w trakcie partii
  const backgroundPlayRef = useRef<NodeJS.Timeout | null>(null) // Animacja początkowa
  const goal = useRef<number>(0) // Wartość docelowa partii
  const addValues = useRef<[number,number,number][]>([]) // Zbiór zasad dla określonych wartości w określonych piłkach

  const onChangePlay = () => {
    setPlay(true)
  }

  const onChangeMainValue = (newValue:number) => {
    mainValue.current = (mainValue.current + newValue + 1000)%1000
    setValues([Math.floor(mainValue.current/100),Math.floor((mainValue.current%100)/10),mainValue.current%10])
  }

  useEffect(() => {
    if(!play){
      goal.current = 0

      // Animacja początkowa
      backgroundPlayRef.current = setInterval(()=>{
          const value1 = Math.floor(Math.random()*10)
          const value2 = Math.floor(Math.random()*10)
          const value3 = Math.floor(Math.random()*10)
          setValues([value1,value2,value3])
      },800);
    }
    return () => {
      if(backgroundPlayRef.current) clearInterval(backgroundPlayRef.current)
    }
  },[play])

  useEffect(() => {
    
    // Wylosowanie początkowej wartości partii
    const value1 = Math.floor(Math.random()*10)
    const value2 = Math.floor(Math.random()*10)
    const value3 = Math.floor(Math.random()*10)
    setValues([value1,value2,value3])
    
    mainValue.current = value1*100+value2*10+value3

    // Wylosowanie docelowej wartości różnej od aktualnej
    while(goal.current===value1*100+value2*10+value3||goal.current===0){
      goal.current = Math.floor(Math.random()*1000)
    }

    addValues.current = []

    // Wylosowanie zasad
    for(let i=0; i<10; i++){
      const row: [number,number,number] = [0,0,0];
      row[0] = (Math.floor(Math.random()*200)-100)%100;
      row[1] = Math.floor(Math.random()*200)-100;
      row[1] = Math.floor(row[1]/100)*100+row[1]%10;
      row[2] = Math.floor((Math.floor(Math.random()*200)-100)/10)*10;

      addValues.current.push(row)
    }

    // Przerwanie animacji
    if (play && backgroundPlayRef.current){
      clearInterval(backgroundPlayRef.current)
    }
  },[play])

  useEffect(() => {
    // W momencie osiągnięcia wartości docelowej gra się kończy
    if(mainValue.current===goal.current){
      setPlay(false)
    }
  },[values])

  return (
    <>
      {!play && <div id="title">
        <label>Cogisum</label>  
      </div>}
      <div id="balls">
        <Ball position={1} value={values[0]} play={play} add={addValues.current} mainValue={mainValue.current} onChangeValue={onChangeMainValue}></Ball>
        <Ball position={2} value={values[1]} play={play} add={addValues.current} mainValue={mainValue.current} onChangeValue={onChangeMainValue}></Ball>
        <Ball position={3} value={values[2]} play={play} add={addValues.current} mainValue={mainValue.current} onChangeValue={onChangeMainValue}></Ball>
        {!play && <StartButton text="NOWA GRA" onChangePlay={onChangePlay}></StartButton>}
      </div>
      {play && <div id="goal">
        <label>Docelowa liczba: {goal.current}</label>
        </div>}    
    </>
  )
}

export default App
