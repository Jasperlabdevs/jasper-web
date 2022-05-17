import Button from "components/Button"

type NotificationType ={
    type?: 'warning' | 'notif' 
}

const NotificationCard = ({type}:NotificationType) => {
    return(
        <div className="flex items-center justify-between w-full border-[#EFF1F5] border-b py-8 px-10">

            <div className="flex gap-6" >
                <div className={`rounded-xl bg-faded w-14 h-14  ${type === 'warning' && 'bg-faded_red'} ${type === 'notif' && 'bg-faded_yellow'} `} ></div>
                <div>
                    <p className="font-semibold !text-black" >
                        Multiple Access Request
                    </p>
                    <p className="!text-black py-1 text-sm" >
                        For 20 guests; 2nd to Fed. 3rd and the
                    </p>
                    <div className="pt-1.5 flex  gap-3 text-grey_text items-center">
                        <div className="h-6 w-6 rounded-full bg-icon_background text-xs" ></div>
                        <p className="text-sm" >Emmanuel Willimas • 3:15</p>
                    </div>
                </div>
            </div>
            <div className="w-fit" >
            <Button title={"Review"} tertiary/>

            </div>

        </div>
    )
}

export default NotificationCard