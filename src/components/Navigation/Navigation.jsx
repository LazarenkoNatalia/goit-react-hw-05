import { NavLink} from 'react-router-dom'
import stylBar from './Navigation.module.css'
import clsx from 'clsx'

const getClassNames=({
    isActive

})=> {
    return clsx(stylBar.link, isActive && stylBar.isActive)
}

export default function  Navigation() {
    return (<nav className={stylBar.container}> <NavLink className= { getClassNames}
        to='/' > Home </NavLink>
        
        <NavLink className={getClassNames}
        to='/movies' > Movies </NavLink> </nav>)
}
