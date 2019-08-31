<<<<<<< HEAD
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)

    //0-filled array of 6
    const arr = new Array(7).join('0').split('').map(parseFloat)
    const countVote = () => {
        return arr[selected] += 1
    }
    return (
        <div>
        {props.anecdotes[selected]}
        <div></div>
        <Button onClick={()=>countVote} text="vote"/>
        <Button onCgit lick={()=>setSelected(Math.floor(Math.random()*6))} text="next anecdote"/>
=======
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part1 = (props) => {
    return (
        <p>{props.part1} {props.exercises1}</p>
    )
}

const Part2 = (props) => {
    return (
        <p>{props.part2} {props.exercises2}</p>
    )
}

const Part3 = (props) => {
    return (
        <p>{props.part3} {props.exercises3}</p>
    )
}

const Content = (props) => {

    return (
        <div>
            <Part1 part1={props.parts[0].name} exercises1={props.parts[0].exercises}/>
            <Part2 part2={props.parts[1].name} exercises2={props.parts[1].exercises}/>
            <Part3 part3={props.parts[2].name} exercises3={props.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

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
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
>>>>>>> b0493a23d599efcfdfbe8cd986a4e0d9ac29a937
        </div>
    )
}

<<<<<<< HEAD
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
=======
ReactDOM.render(<App />, document.getElementById('root'))
>>>>>>> b0493a23d599efcfdfbe8cd986a4e0d9ac29a937
