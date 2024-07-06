import { Square } from "./Square"


export function WinnerModal({winner, resetGame}){
    if(winner === null) return null
    const winnerText = winner === false ? 'Empate' : 'Ganó:'

    return (        
        <section className='absolute w-screen h-screen top-0 left-0 grid justify-center items-center'>
            <div className='flex-col p-10 place-content-between items-center bg-green-900/85 h-[300px] w-80 border flex rounded-[10px]'>
                <h2 className="font-bold text-xl text-yellow-700">
                {winnerText}
                </h2>

                <header className='text-yellow-600 font-semibold text-lg'>
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button className='h-8 w-44 border border-white bg-black text-yellow-600 font-normal text-lg rounded-2xl hover:bg-white hover:border-yellow-600 hover:text-yellow-600 hover:transition-transform hover:scale-110' onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
        
    )
}