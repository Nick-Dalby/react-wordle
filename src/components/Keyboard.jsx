const letters = [
  [
    { key: 'q' },
    { key: 'w' },
    { key: 'e' },
    { key: 'r' },
    { key: 't' },
    { key: 'y' },
    { key: 'u' },
    { key: 'i' },
    { key: 'o' },
    { key: 'p' },
  ],
  [
    { key: 'a' },
    { key: 's' },
    { key: 'd' },
    { key: 'f' },
    { key: 'g' },
    { key: 'h' },
    { key: 'j' },
    { key: 'k' },
    { key: 'l' },
  ],
  [
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
  ],
]

const Keyboard = ({ usedKeys }) => {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {letters[0].map((letter) => {
          const color = usedKeys[letter.key]
          return <div key={letter.key} className={color}>{letter.key}</div>
        })}
      </div>
      <div className="keyboard-row">
        {letters[1].map((letter) => {
          const color = usedKeys[letter.key]
          return <div key={letter.key} className={color}>{letter.key}</div>
        })}
      </div>
      <div className="keyboard-row">
        {letters[2].map((letter) => {
          const color = usedKeys[letter.key]
          return <div key={letter.key} className={color}>{letter.key}</div>
        })}
      </div>
    </div>
  )
}
export default Keyboard
