export default function ActionButton({ size = 1, onClick, children }){
    return (
        <div className={`p-${size} rounded-full flex justify-center items-center transition duration-75 active:bg-gray-900 active:bg-opacity-10 dark:active:bg-gray-100 dark:active:bg-opacity-10`} onClick={onClick}>{children}</div>
    )
}