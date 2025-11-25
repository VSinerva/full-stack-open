const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p> {props.names[0]} {props.counts[0]} </p>
      <p> {props.names[1]} {props.counts[1]} </p>
      <p> {props.names[2]} {props.counts[2]} </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.counts.reduce((a, b) => a + b, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const names = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ]
  const counts = [
    10,
    7,
    14
  ]

  return (
    <div>
      <Header name={course} />
      <Content names={names} counts={counts} />
      <Total counts={counts} />
    </div>
  )
}

export default App
