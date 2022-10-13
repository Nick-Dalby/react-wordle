import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'


function App() {
  const [solution, setSolution] = useState(null)

  // useEffect(() => {
  //   // using https://www.npmjs.com/package/json-server
  //   // find an api to do this later or host it?
  //   fetch('http://localhost:3001/solutions')
  //   .then(res => res.json())
  //   .then(json => {
  //     const randomSolution = json[Math.floor(Math.random() * json.length)]
  //     // setSolution(randomSolution.word)
  //   })
  // },[setSolution])

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
      .then(res => res.json())
      .then(json => {
        console.log(json[0])
        setSolution(json[0])
      })
  },[setSolution])

  
  return (
    <div>
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  )
}

export default App
