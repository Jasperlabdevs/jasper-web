import Configuration from '../Configuration'
import React from 'react'
import { configurationData, TableContent } from 'helpers/data'

const AccessConfig =()=>{
    return(
        <div className='mt-10 ' >
                <section>
                    <h3>Access Rules</h3>
                    {
                        configurationData.map(data=>(
                            <div key={data.id}>
                                <Configuration
                                    title={data.title}
                                    description={data.description}
                                    hasCheckList={data.hasCheckList}
                                />
                                {data.id ===6 &&  <h4>MULTIPLE ACCESS</h4> }
                            </div>
                        ))
                    }
                   
                    <h5 className='py-4 -mb-10 md:mb-0' >Select additional Information you'd like to capture before granting access.</h5>
                    <table className='w-full max-w-5xl'>
                        <thead className='invisible md:visible' >
                            <tr className='text-grey_text border-b ' >
                                <th className='text-left text-grey_text py-4' >Addition Information</th>
                                <th className=' text-grey_text'>Make Required</th>
                                <th className=' text-grey_text' >Show in estate/visitor access history</th>
                                <th className='text-left text-grey_text' >Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                TableContent.map(data => (
                                    
                                    <tr className='border-b' >
                                        <td className='text-left'>{data.additionalInfomation}</td>
                                        <td className='py-5' >
                                            <div className='flex text-center mx-auto w-fit items-center gap-4'>
                                                {data.requried}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>

                                            </div>
                                        </td>
                                        <td >
                                            <div className='flex mx-auto text-center w-fit items-center gap-4'>
                                                {data.show}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                                </svg>    
                                            </div>
                                        </td>
                                        <td className='pl-4' >
                                            <label className="checkbox">
                                                <input type="checkbox" checked={data.select} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
        </div>
    ) 
}

export default AccessConfig