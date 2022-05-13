import "./style.css"

type ButtonType = {
    title:string;
    type?:"submit" | "button" | "reset" | undefined;
    loading?:boolean;
    secondary?:boolean;
    tertiary?:boolean
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({title, loading, type="submit", onClick, secondary=false, tertiary=false}:ButtonType) => {
    return(
        <button onClick={onClick} className={` p-4 w-full relative rounded-lg mt-10 text-lg ${secondary ? 'bg-transparent text-black': 'bg-primary text-[#FFFFFF]'} ${tertiary && 'bg-faded text-primary mt-0'} `} type={type} >
            {!!loading ? <span className="spinner" ></span> : title }
        </button>
    )
}

export default Button