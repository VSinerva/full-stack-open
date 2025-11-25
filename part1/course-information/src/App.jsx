const Header = props => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = props => {
  return (
    <p> {props.course.name} {props.course.exercises} </p>
  )
}

const Content = props => {
  return (
    <>
      <Part course={props.courses[0]} />
      <Part course={props.courses[1]} />
      <Part course={props.courses[2]} />
    </>
  )
}

const Total = props => {
  return (
    <p>Number of exercises {props.courses.reduce((a, b) => a + b.exercises, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content courses={[part1, part2, part3]} />
      <Total courses={[part1, part2, part3]} />
    </div>
  )
}

export default App
