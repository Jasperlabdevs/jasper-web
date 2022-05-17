import Header from "components/Header"
import { Select } from "components/Input";
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NotificationCard from "./NotificationCard";


const Dashboard = () => {

    const [activeTab, setActiveTab] = useState(1)

    const notifTabs =[
        {
            id:1,
            name: 'All',
        },
        {
            id:2,
            name: 'Access Requests',
        },
        {
            id:3,
            name: 'Payment',
        },
        {
            id:4,
            name: 'Issues',
        },
        {
            id:5,
            name: 'Post Requests',
        },
    ]

    const stats = [
        {
            id:1,
            title: 'number of users',
            stat: 100,
            image:''
        },
        {
            id:2,
            title: 'active gates',
            stat: 2,
            image:''
        },
        {
            id:3,
            title: 'message credit balance',
            stat: 88,
            image:''
        },
    ]

    const data = [
        {
          "name": "Mon",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Tue",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Wed",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Thurs",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Fri",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Sat",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Sun",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
      ]

    return(
        <div>
            <Header />

            <div className="py-4 px-10 mt-10 lg:pt-0 pr-0 lg:mt-0 flex gap-10" >
                <div className="grow pt-10 pr-10 lg:pr-0" >
                    <h5>Welcome Back, Emmanuel</h5>
                    <p className="text-lg" >Here's what is foing on at Lawoke Estate</p>

                    <div className="flex flex-col md:flex-row gap-6 mt-12" >
                        {
                            stats.map((data:any)=>(
                                <div key={data.id} className="border w-full rounded-xl h-fit min-h-20 p-6" >
                                    <p className="uppercase" >{data.title}</p>
                                    <h1 className="mt-8">{data.stat}</h1>
                                </div>
                            ))
                        }
                    </div>

                    <div className="my-8 mt-14" >
                        <div className="flex justify-between items-center" >
                            <h4>Access Overview</h4>
                            <Select 
                                placeholder="Weekly"
                                label=""
                                list={[]} name={undefined}  />

                        </div>
                        <div className="h-[400px]" >
                            <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart  data={data}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0083FF" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#0083FF" stopOpacity={0}/>
                                            </linearGradient>
                                            
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid vertical={false}  />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stroke="#0083FF" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                                    
                                    </AreaChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
                <aside className="w-[500px] border-l border-[#EFF1F5] py-10 hidden lg:block" >
                    <h4 className="px-10 mb-6" >Notifications</h4>
                    <div className="flex px-10 border-b border-[#EFF1F5]" >
                        {
                            notifTabs.map((data:any) =>(
                                <div key={data.id} onClick={()=>setActiveTab(data.id)} className={`text-grey_text px-2 py-1.5 cursor-pointer ${data.id === activeTab && 'text-black border-b border-primary'} `} >
                                    {data.name}
                                </div>
                            ) )
                        }
                    </div>

                    <div className=" py-5" >
                        <NotificationCard />
                        <NotificationCard type="warning" />
                        <NotificationCard type="notif" />
                    </div>


                </aside>

            </div>
        </div>
    )
}

export default Dashboard