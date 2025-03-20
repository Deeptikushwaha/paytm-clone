import { Link } from "react-router"
export function Bottomwarning({label,buttonText, to}){
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="underline pl-1 cursor-pointer" to={to}>
            {buttonText}
            </Link>
        </div>
    )
}