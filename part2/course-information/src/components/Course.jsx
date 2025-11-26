const CourseHeader = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => <> {parts.map(part => <Part part={part} key={part.id} /> )} </>

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Course = ({course}) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0)
  return (
    <div>
      <CourseHeader name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course
