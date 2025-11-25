import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const FeedbackButton = ({value, setValue, text}) =>
  <button onClick={() => setValue(value + 1)}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return (
    <>
      <Title text="statistics"/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad) / total}</p>
      <p>positive {100 * good/ total} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Title text="give feedback"/>
      <FeedbackButton value={good} setValue={setGood} text="good" />
      <FeedbackButton value={neutral} setValue={setNeutral} text="neutral" />
      <FeedbackButton value={bad} setValue={setBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
