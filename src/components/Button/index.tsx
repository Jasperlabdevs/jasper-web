import "./style.css"

type ButtonType = {
    title:string;
    type?:"submit" | "button" | "reset" | undefined;
    loading?:boolean;
    secondary?:boolean;
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({title, loading, type="submit", onClick, secondary=false}:ButtonType) => {
    return(
        <button onClick={onClick} className={` p-4 w-full relative rounded-lg mt-10 text-lg ${secondary ? 'bg-transparent text-black': 'bg-primary text-[#FFFFFF]'} `} type={type} >
            {!!loading ? <span className="spinner" ></span> : title }
        </button>
    )
}

export default Button