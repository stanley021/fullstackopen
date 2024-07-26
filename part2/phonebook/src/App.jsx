import { useState,useEffect } from 'react'
import personService from './axios'
import "./App.css"

const PersonForm = ({addPerson,newName,nameChange,newNumber,numberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>Name: <input value={newName} onChange={nameChange}/></div>
      <div>Number: <input value={newNumber} onChange={numberChange}/></div>
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
    
    return(
      <div>
        {filteredPersons.map(person =>
        <>
        <p key={person.id}>{person.name} {person.number} <button onClick={()=> persons.remove(person.id)}>Delete</button></p>
        
        </>
      )
      }
      </div>
      
    )
  }


  return(
    <div>
      
      {persons.list.map(person =>
      <>
      <p key={person.id}>{person.name} {person.number} <button onClick={()=> persons.remove(person.id)}>Delete</button> </p>
      </>
    )}
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

const BNotification = ({message}) => {
  if (message === null){
    return null;
  }
  return(
    <div className='error'>
      {message}
    </div>
  )
}
const GNotification = ({message}) => {
  if (message === null){
    return null;
  }
  return(
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setsuccessMessage] = useState(null)
  

  const hook = () =>{
    personService.getAll().then(initialPersons=>{
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  const nameChange = (event) =>{
    setNewName(event.target.value)
  }

  const numberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
  
    // Find if a person with the same name already exists
    const nameExist = persons.find(person => newName === person.name);
  
    if (nameExist) {
      alert(`${newName} already exists`);
  
      if (window.confirm("Do you want to replace the old number with a new one?")) {
        // Prepare updated data
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };
  
        // Call update with the correct parameters: ID and updated data
        personService.update(nameExist.id, updatedPerson)
          .then(returnedPerson => {
            // Update state with the returned person data
            setPersons(persons.map(person => person.id !== nameExist.id ? person : returnedPerson));
            setsuccessMessage("Changed the user's number");
            setTimeout(() => setsuccessMessage(null), 5000);
          })
          .catch(error => {
            setErrorMessage("Failed to update user");
            setTimeout(() => setErrorMessage(null), 5000);
          });
  
      }
  
      return;
    }
  
    // For new person, omit the ID
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    // Create a new person entry
    personService.create(newPerson)
      .then(returnedPerson => {
        // Update state with the new person including the ID
        setPersons([...persons, returnedPerson]);
        setsuccessMessage("Added user to the database");
        setTimeout(() => setsuccessMessage(null), 5000);
      })
      .catch(error => {
        setErrorMessage("Failed to add user");
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };
  

  const handleDelete = (id) => {
    if (window.confirm("are you sure")){
      personService.remove(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id !== id));
      })
      
    }
  }


  
  
  
  return (
    <div className='root'>
      <h2>Phonebook</h2>
      <BNotification message={errorMessage}/>
      <GNotification message={successMessage}/>

      <Filter filter = {filter} setNewFilter = {setNewFilter}/>

      <h2>Add a new</h2>
      <PersonForm addPerson ={addPerson} newName = {newName} nameChange = {nameChange} newNumber={newNumber} numberChange={numberChange}/>

      
      <h2>Numbers</h2>

      <Persons list = {persons} filter={filter} remove = {handleDelete}/>
      
    </div>
  )
}

export default App