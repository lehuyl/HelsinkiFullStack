import React from 'react'

const Course = ({course}) => {
    const printParts = course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

    const add = (sum, part) => {
        return sum + part.exercises
    }
    return (
        <div>
            <h1>{course.name}</h1>
            {printParts}
            {/* reduce requires function and initial value */}
            <p>total of {course.parts.reduce(add,0)} exercises</p>
        </div>
    )
}

export default Course