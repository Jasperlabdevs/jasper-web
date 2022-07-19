import "./style.css";

type ButtonType = {
  title: string | any;
  type?: "submit" | "button" | "reset" | undefined;
  loading?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  smallSecondary?: boolean;
  smallSecondaryred?: boolean;
  smallPrimary?: boolean;
  other?: boolean;
  red?: boolean;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({
  title,
  loading,
  type = "submit",
  onClick,
  disable,
  secondary = false,
  tertiary = false,
  other = false,
  red = false,
  smallPrimary = false,
  smallSecondary = false,
  smallSecondaryred = false,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={` p-4 w-full relative rounded-lg mt-10 
            ${
              secondary === false &&
              other === false &&
              "bg-primary border border-primary text-[#FFFFFF]"
            } 
            ${secondary && " text-black "}
            ${disable && "cursor-not-allowed"}
            ${
              smallPrimary && "bg-primary text-[#ffffff] p-3 md:px-8 w-fit mt-0"
            } 
            ${
              smallSecondary &&
              "bg-[#ffffff] text-primary border py-3 border-primary text-xs p-2 md:px-8 w-fit mt-0"
            } 
            ${
              smallSecondaryred &&
              "bg-[#ffffff] text-red border py-3 border-red text-xs p-2 md:px-8 w-fit mt-0"
            } 
            ${
              tertiary &&
              "bg-faded border-none py-3 text-primary text-xs font-thin p-2 md:px-8 w-fit mt-0"
            } 
            ${
              red &&
              "bg-red text-[#fff] border-red border mt-0 p-3 md:px-8 w-fit"
            } 
            ${other && "bg-[#ffffff] text-primary border-primary border"} `}
      type={type}
    >
      {!!loading ? <span className="spinner"></span> : title}
    </button>
  );
};

export default Button;
