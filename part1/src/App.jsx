const Header = (param) => {
  return (
    <h1>{param.course}</h1>
  )
}



const Content = (param) =>{
  return (
    <>
      <Part text = {param.p1}/>
        {/* {param.p1[0]} {param.p1[1]} */}
      <Part text = {param.p2}/>
      {/* {param.p2[0]} {param.p2[1]} */}
      <Part text = {param.p3}/>
      {/* {param.p3[0]} {param.p3[1]} */}

    </>
  )
}
const Part = (param) => {


  return (
    <p>{param.text[0]} {param.text[1]}</p>
  )
}


const Total = (param) => {
  return (
    <p>Number of exercises {param.param[0] + param.param[1] + param.param[2]}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1 = {[part1,exercises1]} p2 = {[part2,exercises2]} p3={[part3,exercises3]} />
      <Total param = {[exercises1,exercises2,exercises3]}/>
    </div>
  )
}

export default App