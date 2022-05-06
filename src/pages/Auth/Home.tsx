import SVGs from "helpers/SVGs"

const Home = () => {
    const roles = [
        {
            id:1,
            role: 'Community Manager',
            type: 'an Admin',
            icon: SVGs.person_plus
        },
        {
            id:2,
            role: 'Community Member',
            type: 'a User',
            icon: SVGs.person
        },
    ]
    return(
        <div className="mt-40 mx-auto text-center w-full md:min-w-[430px] max-w-[620px] ">
            <h3>Hey there! Welcome to Jasper</h3>
            <p className="text-grey_text mt-3" >Kindly select your appropraite role to get started</p>
            <hr className="mt-10 w-2/3 mx-auto"  />

            <div className="text-left mt-20 " >
                {
                    roles.map(data => (
                        <div className="p-4 my-8 w-full border rounded-md cursor-pointer flex justify-between items-center" key={data.id}>
                            <div>
                                <div className=" w-12 h-12 bg-faded rounded-full flex justify-center items-center text-primary">
                                    {data.icon}
                                </div>
                                <h4 className="mt-3 mb-4" >{data.role}</h4>
                                <p className="text-grey_text text-xs lg:text-sm leading-6 lg:leading-7" >Are you a {data.role}? <br /> Sign Up as {data.type} here.</p>
                            </div>
                           <div>
                               {SVGs.arrow_right}
                           </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home