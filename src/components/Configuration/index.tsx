import "./style.css"
import { checklistData } from "helpers/data"

type ConfigurationProp = {
    title:string;
    description:string;
    hasCheckList?:boolean;
}

const Configuration = ({title, description, hasCheckList}:ConfigurationProp) => {
    return(
        <div className="config">
            <div className="texts ">
                <p className="!text-black mb-2" >{title}</p>
                <p className="text-sm" >{description}</p>
                { hasCheckList && 
                <div className="checklist">
                    {
                        checklistData.map(data => (
                            <label key={data.id} className="checkbox">{data.name}
                                <input type="checkbox" checked={data.checked} />
                                <span className="checkmark"></span>
                            </label>
                        ))
                    }
                </div>
                }
            </div>
            <label className="switch mt-4">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Configuration