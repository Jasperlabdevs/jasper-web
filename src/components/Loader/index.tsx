import './style.css'

const Loader = () => (
    <div
    className={`fixed w-screen left-0 top-0 h-screen bg-transparent flex items-center justify-center z-[1000]`}
  >
    <div className=" w-[200px] h-[200px] bg-[#ffffff] rounded-xl flex items-center justify-center relative overflow-hidden">
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      
    </div>
  </div>
)

export default Loader