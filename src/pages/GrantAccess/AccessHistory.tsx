import { TableContent } from "helpers/data"
import SVGs from "helpers/SVGs"
import { useState } from "react"


const AccessHistory = () => {
    const [activeTab, setActiveTab] = useState(1)

    const tabs = [
        {
            id: 1,
            name: 'All Access'
        },
        {
            id: 2,
            name: 'Multiple Access'
        },
    ]

    return(
        <div className="mt-10 " >
             <h4>Access History</h4>

             <div className="my-6 flex w-fit border-b border-[#EFF1F5]" >
                    {
                        tabs.map((data:any) =>(
                            <div key={data.id} onClick={()=>setActiveTab(data.id)} className={`text-grey_text px-2 py-1.5 cursor-pointer ${data.id === activeTab && 'text-black border-b border-primary'} `} >
                                {data.name}
                            </div>
                        ) )
                    }
                </div>
            {
                activeTab === 1 && 
                <table className='w-full '>
                            <thead className='' >
                                <tr className='text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]' >
                                    <th className='px-4  text-left text-grey_text py-4' >Visitor's Name</th>
                                    <th className='text-left text-grey_text'>Event Name</th>
                                    <th className='text-left text-grey_text' >Status</th>
                                    <th className='text-left text-grey_text' >Access Type</th>
                                    <th className='text-left text-grey_text' >Gate</th>
                                    <th className='text-left text-grey_text' >Code</th>
                                    <th className='text-left text-grey_text' >Phone Number</th>
                                    <th className='text-left text-grey_text' >Date/Time Generated</th>
                                    <th className='text-left text-grey_text' >More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    TableContent.map(data => (
                                        
                                        <tr className='border-b border-[#C3C9DA]' >
                                            <td className='text-left pl-4'>Kofi Emma</td>
                                            <td className='text-left' >N/A</td>
                                            <td 
                                                className={`p-2 px-4 my-4 w-fit rounded-full flex justify-center 
                                                    ${true && 'bg-faded_yellow text-yellow'}
                                                    ${false && 'bg-faded_red text-red'}
                                                    ${false && 'bg-faded_green text-green'} `} 
                                                >Generated</td>
                                            <td className="text-left">One-Time Access</td>
                                            <td className="text-left">1232</td>
                                            <td className="text-left">1232</td>
                                            <td className="text-left">08012345678</td>
                                            <td className="text-left">15th Fed, 2022 - 12:00pm</td>
                                            <td className='pl-4' >
                                                {SVGs.dots}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                </table>
            }
            {
                activeTab === 2 &&
                <table className='w-full '>
                <thead className='' >
                    <tr className='text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]' >
                        <th className='px-4  text-left text-grey_text py-4' >Visitor's Name</th>
                        <th className='text-left text-grey_text'>Phone Number</th>
                        <th className='text-left text-grey_text' >Status</th>
                        <th className='text-left text-grey_text' >Access Type</th>
                        <th className='text-left text-grey_text' >Gate</th>
                        <th className='text-left text-grey_text' >Event</th>
                        <th className='text-left text-grey_text' >Date/Time Generated</th>
                        <th className='text-left text-grey_text' >More</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        TableContent.map(data => (
                            
                            <tr className='border-b border-[#C3C9DA]' >
                                <td className='text-left pl-4'>Kofi Emma</td>
                                <td className='text-left' >N/A</td>
                                <td 
                                    className={`p-2 px-4 my-4 w-fit rounded-full flex justify-center 
                                        ${true && 'bg-faded_yellow text-yellow'}
                                        ${false && 'bg-faded_red text-red'}
                                        ${false && 'bg-faded_green text-green'} `} 
                                    >Generated</td>
                                <td className="text-left">One-Time Access</td>
                                <td className="text-left">1232</td>
                                <td className="text-left">08012345678</td>
                                <td className="text-left">15th Fed, 2022 - 12:00pm</td>
                                <td className='pl-4' >
                                    {SVGs.dots}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
    </table>
            }
        </div>
    )
}


export default AccessHistory