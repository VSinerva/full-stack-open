const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => <> {parts.map(part => <Part part={part} key={part.id} /> )} </>

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Course = ({course}) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
