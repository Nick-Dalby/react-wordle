import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

import Grid from './Grid'
import Keyboard from './Keyboard'
import Modal from './Modal'

const Wordle = ({solution}) => {
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyUp)
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyUp)

    }

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])



  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn}/>
      <Keyboard usedKeys={usedKeys}/>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}
export default Wordle
