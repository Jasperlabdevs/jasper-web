import "./style.css";

type ButtonType = {
  title: string | any;
  type?: "submit" | "button" | "reset" | undefined;
  loading?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  smallSecondary?: boolean;
  smallPrimary?: boolean;
  other?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({
  title,
  loading,
  type = "submit",
  onClick,
  secondary = false,
  tertiary = false,
  other = false,
  smallPrimary = false,
  smallSecondary = false,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={` p-4 w-full relative rounded-lg mt-10 
            ${
              secondary === false &&
              other === false &&
              "bg-primary border border-primary text-[#FFFFFF]"
            } 
            ${secondary && "bg-[#ffffff] text-black"}
            ${
              smallPrimary &&
              "bg-primary text-[#ffffff] text-xs p-2 md:p-2 md:px-8 w-fit mt-0"
            } 
            ${
              smallSecondary &&
              "bg-[#ffffff] text-primary border md:py-2 border-primary text-xs p-2 md:px-8 w-fit mt-0"
            } 
            ${
              tertiary &&
              "bg-faded border-none md:py-2 text-primary text-xs font-thin p-2 md:px-8 w-fit mt-0"
            } 
            ${other && "bg-[#ffffff] text-primary border-primary border"} `}
      type={type}
    >
      {!!loading ? <span className="spinner"></span> : title}
    </button>
  );
};

export default Button;
