import { useState } from 'react'


const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )

}

const Statistics = (props) => {

  const {good, neutral, bad} = props.props
  const total = bad+good+neutral
  const avg = (good - bad)/total
  const pos = (good)/(total)

  if (total === 0){
    return (
      <div>
      No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={total}/>
      <StatisticLine text="Average" value={avg}/>
      <StatisticLine text="Positive" value={pos}/>
      </tbody>
    </table>
      

  )
  
}

const App = () => {
  // save clicks of each button to its own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const stats = {
    good : good,
    neutral : neutral,
    bad : bad,

  }
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick = {() => setGood(good+1)}>
        Good
      </button>
      <button onClick ={() => setNeutral(neutral + 1)}>
        Neutral
      </button>
      <button onClick = {() => setBad(bad+1)}>
        Bad
      </button>


      <h1>Statistics</h1>
      <Statistics props = {stats}/>

    </div>
  )
}

export default App