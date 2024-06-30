export const Square = ({children, isSelected, updateBoard, index}) => {

    const classTurn = isSelected ? 'text-white bg-sky-500/80' : '' //Esta parte del codigo se debe adaptar con tailwindcss

    const handleClick = () => {
    updateBoard(index)
    }

    return (
    <div className={`${classTurn} size-24 border-2 text-4xl grid items-center cursor-pointer font-semibold rounded-lg border-yellow-600`} onClick={handleClick}>
        {children}
    </div>
    )
}