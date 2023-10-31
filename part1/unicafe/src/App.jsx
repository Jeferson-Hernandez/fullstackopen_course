import { useState } from 'react'

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({value, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good == 0 & neutral == 0 & bad == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
        <tbody>
          <StatisticLine value={good} text="Good" />
          <StatisticLine value={neutral} text="Neutral" />
          <StatisticLine value={bad} text="Bad" />
          <StatisticLine value={good + neutral + bad} text="All" />
          <StatisticLine value={(good - bad) / (good + neutral + bad)} text="Average" />
          <StatisticLine value={(good * 100) / (good + neutral + bad) + " %"} text="Positive" />     
        </tbody>
    </table>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handler={handleClickGood} text="Good" />
        <Button handler={handleClickNeutral} text="Neutral" />
        <Button handler={handleClickBad} text="Bad" />
      </div>      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
