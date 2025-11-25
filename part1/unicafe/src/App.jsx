import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({value, setValue, text}) =>
  <button onClick={() => setValue(value + 1)}>{text}</button>

const StatisticLine = (props) => {
  const text = props.text
  const value = props.value
  const suffix = props.suffix || ""

  return <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{suffix}</td>
  </tr>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) return (
    <>
      <Title text="statistics"/>
      <p>No feedback given</p>
    </>
  )

  const average = (good - bad) / total
  const positive  = 100 * good / total

  return (
    <>
      <Title text="statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average } />
          <StatisticLine text="positive " value={positive} suffix="%" />
        </tbody>
      </table>
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
      <Button value={good} setValue={setGood} text="good" />
      <Button value={neutral} setValue={setNeutral} text="neutral" />
      <Button value={bad} setValue={setBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
