
import React from 'react'
import { useState } from 'react'
import './App.css'

const Heading = ({ name }) => {
  return <h1>{name}</h1>
}

const Button = ({ label, Clicks, setClicks }) => {

  const handleClick = () => {
    if (label === 'good') {
      setClicks({
        ...Clicks, good: Clicks.good + 1, all: Clicks.all + 1,
        average: (Clicks.good + 1 - Clicks.bad) / (Clicks.all + 1),
        positive: ((Clicks.good + 1) / (Clicks.all + 1)) * 100,
      })
    }

    else if (label === 'neutral') {
      setClicks({
        ...Clicks, neutral: Clicks.neutral + 1, all: Clicks.all + 1,
        average: (Clicks.good - Clicks.bad) / (Clicks.all + 1),
        positive: ((Clicks.good) / (Clicks.all + 1)) * 100,
      })
    }

    else {
      setClicks({
        ...Clicks, bad: Clicks.bad + 1, all: Clicks.all + 1,
        average: (Clicks.good - Clicks.bad - 1) / (Clicks.all + 1),
        positive: ((Clicks.good) / (Clicks.all + 1)) * 100,
      })
    }

  }

  return <button onClick={handleClick}> {label} </button>
}

const StatisticLine = ({ text, value, }) => {

  // Table like structure
  return (

    <>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </>

  )
}

const Statistics = ({ Clicks }) => {

  if (Clicks.all == 0)
    return <p> No feedback given </p>

  return (
    <>
      <StatisticLine text="good" value={Clicks.good} />
      <StatisticLine text="neutral" value={Clicks.neutral} />
      <StatisticLine text="bad" value={Clicks.bad} />
      <StatisticLine text="all" value={Clicks.all} />
      <StatisticLine text="average" value={Clicks.average} />
      <StatisticLine text="postive" value={`${Clicks.positive} %`} />
    </>
  );
}

const App = () => {

  // save clicks of each button to its own state
  const [Clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  })

  return (
    <>
      <Heading name='Give feedback' />
      <Button label='good' Clicks={Clicks} setClicks={setClicks} />
      <Button label='neutral' Clicks={Clicks} setClicks={setClicks} />
      <Button label='bad' Clicks={Clicks} setClicks={setClicks} />
      <Heading name='Statistics' />
      <Statistics Clicks={Clicks} />
    </>
  )
}
export default App