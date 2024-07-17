const Header = (param) => {
  return (
    <h1>{param.course}</h1>
  )
}



const Content = (param) =>{
  console.log(param.parts[0])
  return (
    <>
      <Part text = {param.parts[0]}/>
        {/* {param.p1[0]} {param.p1[1]} */}
      <Part text = {param.parts[1]}/>
      {/* {param.p2[0]} {param.p2[1]} */}
      <Part text = {param.parts[2]}/>
      {/* {param.p3[0]} {param.p3[1]} */}

    </>
  )
}
const Part = (param) => {

  
  return (
    <p>{param.text.name} {param.text.exercises}</p>
  )
}


const Total = (param) => {
  console.log(param.parts[0].exercises)
  return (
    <p>Number of exercises {param.parts[0].exercises + param.parts[1].exercises + param.parts[2].exercises}</p>
  )
}


const App = () => {


  const course = {
    name : 'Half Stack application development',

    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  }

//p1 = {[parts[0].name,parts[0].exercises]} p2 = {[parts[1].name,parts[1].exercises]} p3={[parts[2].name,parts[2].exercises]}
  return (
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App