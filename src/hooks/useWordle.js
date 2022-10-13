import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow', c: 'grey'}

  // format a guess into an array of letter objects
  const formatGuess = () => {
    console.log('formatting the guess: ', currentGuess)
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: 'grey' }
    })

    // find any green letters
    formattedGuess.forEach((letter, index) => {
      if (solution[index] === letter.key) {
        formattedGuess[index].color = 'green'
        solutionArray[index] = null
      }
    })

    // find any yellow letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow'
        solutionArray[solutionArray.indexOf(letter.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => [...prevHistory, currentGuess])

    setTurn((prevTurn) => prevTurn + 1)

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys }

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key]
        if (letter.color === 'green') {
          newKeys[letter.key] = 'green'
          return
        }
        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow'
          return
        }
        if (
          letter.color === 'grey' &&
          currentColor !== 'green' &&
          currentColor !== 'yellow'
        ) {
          newKeys[letter.key] = 'grey'
          return
        }
      })
      return newKeys
    })

    setCurrentGuess('')
  }

  // destructure { key } from the event
  const handleKeyUp = ({ key }) => {
    console.log('key pressed: ', key)

    if (key === 'Enter') {
      if (turn > 5) {
        console.log('you used all your guesses!')
        return
      }
      // disallow duplicate guesses
      if (history.includes(currentGuess)) {
        console.log('you already tried that word!')
        return
      }
      // check word is 5 chars
      if (currentGuess.length !== 5) {
        console.log('word must be 5 characters')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
      console.log(formatted)
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp }
}
export default useWordle
