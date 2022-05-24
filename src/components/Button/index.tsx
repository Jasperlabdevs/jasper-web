import "./style.css"

type ButtonType = {
    title:string;
    type?:"submit" | "button" | "reset" | undefined;
    loading?:boolean;
    secondary?:boolean;
    tertiary?:boolean;
    other?:boolean;
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({title, loading, type="submit", onClick, secondary=false, tertiary=false, other=false}:ButtonType) => {
    return(
        <button onClick={onClick} className={` p-2 px-4 md:p-4 w-full relative rounded-lg mt-10 md:text-lg ${secondary ? 'bg-[#ffffff] text-black': 'bg-primary text-[#FFFFFF]'} ${tertiary && 'bg-faded text-primary text-sm font-medium p-3 px-5 w-fit mt-0'} ${other && 'bg-[#ffffff] text-primary border-primary border'} `} type={type} >
            {!!loading ? <span className="spinner" ></span> : title }
        </button>
    )
}

export default Button