import Header from "components/Header"
import SettingsHeader from "components/SettingsHeader"
import { Outlet } from "react-router-dom"

const Settings = () => {
    return(
        <div>
            <Header />
            <SettingsHeader />
            <div className="px-10 overflow-x-hidden" >
                <Outlet />
            </div>
        </div>
    )
} 

export default Settings 