export const Button = ({value, className, onClick, disabledCond}) =>{
    return (
        <>
        <button
            className={className}
            onClick={onClick}
            disabled={disabledCond}>
         {value}
         </button>
        </>)
    }