# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```










/////////////////////////////////////////////////
* Middleware is important. What is middleware?? *

## LECTURE NOTES w7d1 ##

- Components
  - the things that components are for
  - how to make one
  - what are they made up of

- building a project from scratch
  - using Storybook
  - combining out things outside of Storybook


## REACT
 - a framework for website front end
 - for building UI, not only on the web?

## COMPONENTS 
  - Core to React
  - Functions (also class components) but focusing on functions.

VISUAL/BEHAVOIURAL "is a function of" DATA

###############################
Start a React project: npx create-react-app dashboard

const Hello = (props) => {
  console.log()
}


Can writing single expressions in {} in React div

<div style ={{
  display:flex,
}}>

Inline CSS shit in React needs two brackets?

-npm i styled-components (?)
-tagged template literal
- looping use map. 
if statements to ternary conditions








WHAT IS STATE 
- Remembered information about a system
- Props is state that another component owns. 
- Components are functions that take in state and props and output DOM elements.
- New vlaue of state is created everytime the component runs and renders Each props and stae is for a particular render

PURE FUNCTIONS
- One that doesn't have any side effects. It doesn't perform any mutations. Given the same input, returns the same output.

Not Pure --- depends on external input and therefore has side affects. 


import React, {useEffect, useState, useRef }

const [count, setCount ] = useState(0);
const [name, setName] = useState("Nima");
const [dimensions, setDimensions] =useState({width: 0, height: 0})

useEffect(() => {
  window.addEventListener('resize', (event) => {
    setDimensions({
      width:event.target.innerWidth, 
      height: event.target.innerHeight})
  })
}, [dimensions]);

function App() {
  const [count, setCount] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1)
  }, 2000);
  return () => {
    clearInterval(interval)
  }
}, []);

const add = () => {
  setCount(count + 1);
}

return (
  <div className= "App">
  <h1>{props.thing}</h1>
  <h2>{count}</h2>
  <button onClick={add}>Add</button>
  <h2>{name}</h2>
  <button onClick={() => setName("james")}>Change/button>)
)

WHAT IS THIS? Use effect contains the side affacts and keesp them until .....when? 

Useeffect handles side effects. 




const reducer = (accumulator, currentValue) => {
  return accumulator + currentValue;
}
const sum = arr.reduce(reducer, 0)
