// import React from 'react'
// import ReactDOM from 'react-dom'

// const Header = (props) => {
//     return (
//         <h1>{props.course}</h1>
//     )
// }

// const Part1 = (props) => {
//     return (
//         <p>{props.part1} {props.exercises1}</p>
//     )
// }

// const Part2 = (props) => {
//     return (
//         <p>{props.part2} {props.exercises2}</p>
//     )
// }

// const Part3 = (props) => {
//     return (
//         <p>{props.part3} {props.exercises3}</p>
//     )
// }

// const Content = (props) => {

//     return (
//         <div>
//             <Part1 part1={props.parts[0].name} exercises1={props.parts[0].exercises}/>
//             <Part2 part2={props.parts[1].name} exercises2={props.parts[1].exercises}/>
//             <Part3 part3={props.parts[2].name} exercises3={props.parts[2].exercises}/>
//         </div>
//     )
// }

// const Total = (props) => {
//     return (
//         <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     )
// }

// const App = () => {
//     const course = {
//         name: 'Half Stack application development',
//         parts: [
//         {
//             name: 'Fundamentals of React',
//             exercises: 10
//         },
//         {
//             name: 'Using props to pass data',
//             exercises: 7
//         },
//         {
//             name: 'State of a component',
//             exercises: 14
//         }
//         ]
//     }

//     return (
//         <div>
//             <Header course={course.name}/>
//             <Content parts={course.parts}/>
//             <Total parts={course.parts}/>
//         </div>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'))

// import React from 'react'
// import ReactDOM from 'react-dom'

// const Hello = ({name,age}) => {
//     // const name = props.name
//     // const age = props.age
//     const bornYear= () => new Date().getFullYear() - age
        
//     return (
//       <div>
//         <p>
//           Hello {name}, you are {age} years old
//         </p>
//         <p>So you were probably born in {bornYear()}</p>
//       </div>
//     )
//   }
  
//   const App = (props) => {
//     const {counter} = props
//     return (
//         <div>{counter}</div>
//     )
//     // const name = 'Peter'
//     // const age = 10
  
//     // return (
//     //   <div>
//     //     <h1>Greetings</h1>
//     //     <Hello name="Maya" age={26 + 10} />
//     //     <Hello name={name} age={age} />
//     //   </div>
//     // )
//   }
// let counter = 1

// const refresh = () => {
//     ReactDOM.render(<App counter={counter} />, 
//     document.getElementById('root'))
//   }
  
//   setInterval(() => {
//       refresh()
//       counter +=1
//   }, 1000)

import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// const Display = ({counter}) => {
//     return (
//         <div>{counter}</div>
//     )
// }




// const App = (props) => {
//     const [ counter, setCounter ] = useState(0)

//     const setToValue = (value) => {
//         return ( 
//             setCounter(value)
//         )
//     }
    
//     return (
//         <div>
//             <Display counter={counter}/>
//             <Button onClick={() => setToValue(counter+1)} text='plus'/>  
//             <Button onClick={() => setToValue(0)} text='reset'/> 
//             <Button onClick={() => setToValue(counter-1)} text='minus'/>  
//         </div>
//   )
// }

// const History = (props) => {
//     console.log("prop value is",props.allClicks,"yeet")
//     if (props.allClicks.length === 0) {
//       return (
//         <div>
//           the app is used by pressing the buttons
//         </div>
//       )
//     }
  
//     return (
//       <div>
//         button press history: {props.allClicks.join(' ')}
//       </div>
//     )
//   }

//   const Button = ({ onClick, text }) => (
//     <button onClick={onClick}>
//       {text}
//     </button>
//   )

// const App = (props) => {
//     const [left, setLeft] = useState(0)
//     const [right, setRight] = useState(0)
//     const [allClicks, setAll] = useState([])
  
//     const handleLeftClick = () => {
//       setAll(allClicks.concat('L'))
//       setLeft(left + 1)
//     }
  
//     const handleRightClick = () => {
//       setAll(allClicks.concat('R'))
//       setRight(right + 1)
//     }
  
//     return (
//       <div>
//         <div>
//           {left}
//           {/* <button onClick={handleLeftClick}>left</button> */}
//           <Button onClick={handleLeftClick} text="left" />
//           <Button onClick={handleRightClick} text="right"/>
//           {/* <button onClick={handleRightClick}>right</button> */}
//           {right}
//           <History allClicks={allClicks} />
//         </div>
//       </div>
//     )
//   }
// ReactDOM.render(
//   <App />, 
//   document.getElementById('root')
// )
// function handleClick2(){
//     console.log('clicssked')
    
// }
// const App = (props) => {
//     const [value, setValue] = useState(10)
//     const setToZero = (val) => {
//         return (
//             setValue(val)
//         )
//     }

//     const handleClick = () => {
//         console.log('clicked')
//         setValue(0)
//     }
//     return (
//       <div>
//         {value}
//         {/* // setting setValue(0) in onClick gets called immediately which causes react to rerender infinitely*/}
//         <button onClick={handleClick}>reset to zero</button>
//       </div>
//     )
//   }

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Display = (props) => {
    return (
        <div>{props.value}</div>
    )
}
const App = (props) => {
    const [value, setValue] = useState(10)
    
    // hightlight-start
    const setToValue = (newValue) => {
      setValue(newValue)
    }
    // hightlight-end
    
    return (
      <div>
        <Display value={value}/>
        {/* // hightlight-start */}
        {/* <button onClick={()=>setToValue(1000)}>thousand</button>
        <button onClick={() => setToValue(0)}>reset</button>
        <button onClick={() => setToValue(value + 1)}>increment</button> */}
        {/* // hightlight-end */}
        <Button handleClick={()=>setToValue(1000)} text='thousand'></Button>
        <Button handleClick={()=>setToValue(0)} text='reset'></Button>
        <Button handleClick={()=>setToValue(value+1)} text='increment'></Button>

      </div>
    )
  }

  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )