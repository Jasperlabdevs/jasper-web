import "./style.css"

type ButtonType = {
    title:string;
    type?:"submit" | "button" | "reset" | undefined;
    loading?:boolean;
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({title, loading, type="submit", onClick}:ButtonType) => {
    return(
        <button onClick={onClick} className="bg-primary text-[#FFFFFF] p-4 w-full relative rounded-lg mt-10 text-lg" type={type} >
            {!!loading ? <span className="spinner" ></span> : title }
        </button>
    )
}

export default Button