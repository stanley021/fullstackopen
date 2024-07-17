import { useState } from 'react'
import './App.css'

const Bestanecdote = (param) =>{
  let {array, anecdotes} = param

  let maxNumber = array[0]
  let index = [0]
  for (let i = 0; i < array.length; i++){
    if (array[i] > maxNumber){
      maxNumber = array[i];
      index = i;
    }
  }
  


  return(
    <div>
    <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>Has {array[index]} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const [array, setArray] = useState(new Array(8).fill(0))


  const changeSelection = () =>{
    const randomNum = Math.floor(Math.random() * 7) + 1;
    setSelected(randomNum)
  }

  const voting = () =>{
    const copy = [...array]
    copy[selected] += 1
    setArray(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        The votes : {array[selected]}
      </div>
    <button onClick={voting}>Vote</button>
    <button onClick={changeSelection}>Next Anecdote</button>

    
    <Bestanecdote array = {array} anecdotes = {anecdotes}/>


    </div>
    
    
  )
}

export default App