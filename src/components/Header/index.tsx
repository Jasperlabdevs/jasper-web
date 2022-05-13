import SVGs from "helpers/SVGs"

const Header = () => {
    return(
        <div className="py-3 px-4 flex items-center justify-between border-b border-[#F3F4F4]">
            <div className="flex items-center gap-4">
                {SVGs.hamburger}
                <h4 className="font-sans-display text-primary" >Jasper</h4>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-xs bg-faded text-primary rounded-lg px-4 py-3 " >88 Message Credits</p>
                {SVGs.bell}
            </div>

        </div>
    )
}

export default Header