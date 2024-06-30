import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constans'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'



function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X // la doble interrogante (??) evalua si la variable (turnFromStorage) es null o undifined
  })
  const [winner, setWinner] = useState(null) //Null es que no hay ganador, false es que hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}
  
  const updateBoard = (index) => {
    // no actualizamos la posicion
    // si ya tiene algo o si hay un ganador
    if(board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board] //spread y rest operator. para crear una copia de un array de forma superficiol
    // const newBoard1 = structuredClone(board) metodo para crear una copia profunda del array
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  

  return (
    <main className='w-fit m-10 text-center'>
      <h1 className='mb-4 text-yellow-600 font-bold text-2xl'>TIC TAC TOE</h1>
      <button className='border rounded-2xl w-52 h-10 mb-4 font-medium border-white text-yellow-600 bg-black hover:bg-white hover:border-yellow-600 hover:text-yellow-600 hover:transition-transform hover:scale-110' onClick={resetGame}>Reset del juego</button>
      <section className='grid grid-cols-3 gap-2'>
        {
          board.map((square, index) => {
          return (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
          )
          
        })
      }        
      </section>
      <section className='flex justify-center m-4 relative gap-2 rounded-lg'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
