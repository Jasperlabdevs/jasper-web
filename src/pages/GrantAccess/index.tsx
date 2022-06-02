import Header from "components/Header"
import SettingsHeader from "components/SubHeader"
import { accessHeaderData } from "helpers/data"
import { Outlet } from "react-router-dom"

const GrantAccess = () => {
    return(
        <div>
            <Header />
            <SettingsHeader headerData={accessHeaderData} head='Grant Access' />
            <div className="px-10 overflow-x-hidden" >
                <Outlet />
            </div>
        </div>
    )
} 

export default GrantAccess 