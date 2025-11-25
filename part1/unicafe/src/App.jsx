import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const FeedbackButton = ({value, setValue, text}) =>
  <button onClick={() => setValue(value + 1)}>{text}</button>

const Feedback = ({value, text}) => <p>{text} {value}</p>

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

      <Title text="statistics"/>
      <Feedback value={good} text="good"/>
      <Feedback value={neutral} text="neutral"/>
      <Feedback value={bad} text="bad"/>
    </div>
  )
}

export default App
