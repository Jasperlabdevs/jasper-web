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
            <div className="texts">
                <h3>{title}</h3>
                <p>{description}</p>
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
            <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Configuration