const Header = props => <h1>{props.name}</h1>

const Part = props => <p> {props.part.name} {props.part.exercises} </p>

const Content = props => {
  const parts = []
  props.parts.forEach(part => parts.push(<Part part={part} key={part.name}/>))
  return <> {parts} </>
}

const Total = props => <p>Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
