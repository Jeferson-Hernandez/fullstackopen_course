import { useState, useEffect } from 'react'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function App() {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))
  const [counter, setCounter] = useState(0)
  
  const handleSelected = () => setSelected(Math.floor(Math.random() * 6))
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  useEffect(() => {
    const copy = [...points]
    copy.sort()
    setCounter(points.indexOf(copy[copy.length - 1]))
  }, [points])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      <span>has {points[selected]} votes</span> <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleSelected}>next anecdote</button><br />

      <h1>Anecdote with most votes</h1>
      {anecdotes[counter]} <br />
      <span>has {points[counter]} votes</span>
    </div>
  )
}

export default App
