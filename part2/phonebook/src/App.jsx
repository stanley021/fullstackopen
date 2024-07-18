import { useState } from 'react'

const PersonForm = ({addPerson,newName,nameChange,newNumber,numberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={nameChange}/></div>
      <div>number: <input value={newNumber} onChange={numberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (persons) =>{
  
  if(persons.filter){
  const filteredPersons = persons.list.filter(person => 
    person.name.toLowerCase().includes(persons.filter.toLowerCase()));

    console.log("he",filteredPersons)

    return(
      <div>
        {filteredPersons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )
  
      }
      </div>
      
    )
  }


  return(
    <div>
      {persons.list.map(person =>
      <p key={person.id}>{person.name} {person.number}</p>
    )

    }
    </div>
    
  )
}

const Filter = ({filter, setNewFilter}) =>{
  

  const NewFilter = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)

  }

  return(
    <div>Filter: <input value = {filter} onChange ={NewFilter}/></div>
  )
  
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const nameChange = (event) =>{
    setNewName(event.target.value)
  }
  const numberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const addPerson = (event) =>{
    event.preventDefault()
    const nameExist = persons.some(person => newName === person.name)
    if (nameExist){
      alert(`${newName} already exists`)
      return;
    }
    const newPerson = {
      name : newName,
      number : newNumber,
    }
    setPersons([...persons,newPerson])
  }


  
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} setNewFilter = {setNewFilter}/>

      <h3>Add a new</h3>
      <PersonForm addPerson ={addPerson} newName = {newName} nameChange = {nameChange} newNumber={newNumber} numberChange={numberChange}/>

      
      <h3>Numbers</h3>

      <Persons list = {persons} filter={filter}/>
      
    </div>
  )
}

export default App