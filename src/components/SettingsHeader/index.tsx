import { settingsHeaderData } from "helpers/data"
import { Link, useLocation } from "react-router-dom"


const SettingsHeader =()=>{

    const location = useLocation()

    return (
    <div className="hidden lg:block">
        <div className="flex px-10 items-center border-b border-[#F3F4F4] ">
            <h4 className="mr-36" >Settings</h4>
            <nav>
                <ul className="flex gap-6 " >
                    {
                        settingsHeaderData.map(data => (
                            <Link to={'/settings/'+data.link} key={data.id} className={`py-4 cursor-pointer hover:text-black text-grey_text ${('/settings/'+data.link) === location.pathname && 'border-b text-black border-primary'}`}  >{data.title}</Link>
                        ))
                    }
                </ul>
            </nav>

        </div>
    </div>
)}

export default SettingsHeader 