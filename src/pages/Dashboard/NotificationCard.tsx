import Button from "components/Button"

type NotificationType ={
    type?: 'warning' | 'notif' 
}

const NotificationCard = ({type}:NotificationType) => {
    return(
        <div className="flex items-center justify-between w-full my-4">

            <div className="flex gap-4" >
                <div className={`rounded-xl bg-faded w-14 h-14  ${type === 'warning' && 'bg-faded_red'} ${type === 'notif' && 'bg-faded_yellow'} `} ></div>
                <div>
                    <p className="font-semibold !text-black" >
                        Multiple Access Request
                    </p>
                    <p className="!text-black py-1 text-sm" >
                        For 20 guests; 2nd to Fed. 3rd
                    </p>
                    <p className="pt-1.5">
                        <span className="h-10 w-10 rounded-full bg-icon_background text-xs" >sse</span>
                        Emmanuel Willimas
                    </p>
                </div>
            </div>
            <div className="w-32" >
            <Button title={"Review"} tertiary/>

            </div>

        </div>
    )
}

export default NotificationCard