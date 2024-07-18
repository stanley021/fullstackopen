const Header = ({ course }) => <h1>{course.name}</h1>


const Content = ({parts}) =>{
    return (
    <>
    {parts.map(note => 
        <p key ={note.id}>
            <Part part = {note}/>
        </p>
    )}
    </> 
    )
}

const Part = ( {part} ) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
const Total = ({parts}) =>{
    // let total = 0
    // for (let i = 0; i< parts.length; i++){
    //     total += parts[i].exercises
    // }

    const total = parts.reduce((s,p)=>{
        return s + p.exercises
    },0)

    return(
        <>
        Total of {total} exercises
        </>
    )

}
   
    


const Course = ({course}) => {
    console.log(course)

  
    return (
        <div>
            {course.map(course =>
                <>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total parts ={course.parts}/>
                </>



            )}
        </div>
        

    )
  }
  
  export default Course