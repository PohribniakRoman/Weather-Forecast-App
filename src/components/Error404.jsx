import { NavLink } from "react-router-dom";

export default function Error404() {
    return(
        <section>
            Error404,page was not found
            <NavLink to={"/wethermap/"}>Home</NavLink> 
        </section>
    )
}