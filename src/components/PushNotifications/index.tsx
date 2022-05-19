import Configuration from "components/Configuration"

const PushNotifications =() => {

    const notificationData = [
        {
            notification: 'Access Notifications',
            description: 'By turning on this toggle, you aggree to recieve notifications for access requests'
        },
        {
            notification: 'Chat Notifications',
            description: 'By turning on this toggle, you aggree to recieve chat notifications'
        },
        {
            notification: 'Email Notifications',
            description: 'By turning on this toggle, you aggree to recieve email notifications'
        },
        {
            notification: 'Issue Notifications',
            description: 'By turning on this toggle, you aggree to recieve issue notifications'
        },
    ]

    return(
        <div className="mt-14 max-w-4xl" >
            <h4>Push Notifications</h4>
            
            <div className="flex flex-col gap-1" >
                {
                    notificationData.map(data=>(
                        <div key={data.notification}>
                            <Configuration
                                title={data.notification}
                                description={data.description}
                                hasCheckList={false}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PushNotifications