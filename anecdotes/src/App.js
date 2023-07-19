
import React from 'react'
import { useState } from 'react'


const MostVoted = ({ points, anecdotes, isArrival }) => {

  // take an empty array 
  let arrayofPoints = [];

  // push values in empty array
  for (let point in points) {
    arrayofPoints.push([point, points[point]]);
  }

  // sort that array 
  arrayofPoints.sort(function (a, b) {
    return a[1] - b[1];
  });


  // determine length & select last
  let lengthofarrayofPoints = arrayofPoints.length;
  let new_selected = arrayofPoints[lengthofarrayofPoints - 1][0]


  if (isArrival === 'Yes') {
    return (
      <>
        <p> No anecdotes rated yet </p>
      </>
    )
  }

  return (
    <>
      <Heading label={'Anecdotes with most vote'} />
      <Anecdotes anecdotes={anecdotes} selected={new_selected} points={points} />
    </>
  )
}

const Heading = ({ label }) => {
  return (
    <h1>{label}</h1>
  )
}

const Anecdotes = ({ anecdotes, selected, points }) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>{`has ${points[selected]} votes`}</p>
    </>
  )
}

const NextButton = ({ labal, setSelected, anecdotes }) => {

  const Change_anecdotes = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber)

  }

  return (
    <button onClick={Change_anecdotes}>{labal}</button>
  )
}

const VoteButton = ({ labal, copy, selected, setpoints, setisArrival }) => {

  const vote_anecdotes = () => {
    copy[selected] += 1;
    setpoints(copy);
    setisArrival('NO')

  }

  return (
    <button onClick={vote_anecdotes}>{labal}</button>
  )

}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [isArrival, setisArrival] = useState('Yes')

  const obj = {};

  for (let i = 0; i < anecdotes.length; i++) {
    obj[i] = 0;
  }

  const [points, setpoints] = useState({
    ...obj
  })

  const copy = { ...points }

  return (
    <>
      <Heading label={'Anecdotes of the day'} />
      <Anecdotes anecdotes={anecdotes} selected={selected} points={points} />
      <VoteButton labal={'vote'} copy={copy} setpoints={setpoints} selected={selected} setisArrival={setisArrival} />
      <NextButton labal='Next anecdote' setSelected={setSelected} anecdotes={anecdotes} />

      {/* show the most voted anecdote */}
      <MostVoted points={points} anecdotes={anecdotes} isArrival={isArrival} />

    </>
  )
}

export default App