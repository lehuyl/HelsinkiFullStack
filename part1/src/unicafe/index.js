import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistic = (props) => {
    //1.10 non-table
    // if(props.text === 'positive'){
    //     return <p>{props.text} {props.clicks} %</p>
    // } else {
    //     return <p>{props.text} {props.clicks}</p>
    // }

    if(props.text === 'positive'){
        return (
            <tr>
                <td>{props.text}</td> 
                <td>{props.clicks} %</td>
            </tr>            
        )
    } else {
        return (
            <tr>
                <td>{props.text}</td> 
                <td>{props.clicks}</td>
            </tr>
        )
    }
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = (props.good*1 + props.neutral*0 + props.bad*-1)/all
    const positive = props.good/all

    if(all === 0){
        return <p>No feedback given</p>
    } else {
        return (
            //1.10 non-table
            // <div>
            //     <Statistic clicks={props.good} text="good"/>
                // <Statistic clicks={props.neutral} text="neutral"/>
                // <Statistic clicks={props.bad} text="bad"/>

                // <Statistic clicks={all} text='all'/>
                // <Statistic clicks={average} text='average'/>
                // <Statistic clicks={positive*100} text='positive'/>
            // </div>

            <table>
                <tbody>
                    <Statistic clicks={props.good} text="good"/>
                    <Statistic clicks={props.neutral} text="neutral"/>
                    <Statistic clicks={props.bad} text="bad"/>

                    <Statistic clicks={all} text='all'/>
                    <Statistic clicks={average} text='average'/>
                    <Statistic clicks={positive*100} text='positive'/>
                </tbody>
            </table>
        )
    }
}

const Buttons = (props) => {
    return (
        <div>
            <Button onClick={()=>props.goodArr[1](props.goodArr[0] + 1)} text="good"/>
            <Button onClick={()=>props.neutralArr[1](props.neutralArr[0] + 1)} text='neutral'/>
            <Button onClick={()=>props.badArr[1](props.badArr[0] + 1)} text='bad'/>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Heading title="give feedback"/>
            <Buttons goodArr={[good,setGood]} neutralArr={[neutral, setNeutral]} badArr={[bad,setBad]}/>
            <Heading title="statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)