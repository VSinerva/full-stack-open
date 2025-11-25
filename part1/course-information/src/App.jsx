const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p> {props.name} {props.count} </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.names[0]} count={props.counts[0]} />
      <Part name={props.names[1]} count={props.counts[1]} />
      <Part name={props.names[2]} count={props.counts[2]} />
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
