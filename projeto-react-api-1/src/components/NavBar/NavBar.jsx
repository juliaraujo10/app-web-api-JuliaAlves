import { Link, Outlet } from 'react-router-dom'
import Container from '../Container/Container.jsx'
import styles from './navbar.module.css'

export default function NavBar(){

    return(
        <div>
            <Container>
                <ul className={styles.list}>

                    <li className={styles.item}>
                        <Link to='/'>HOME</Link>    
                    </li>

                    <li className={styles.item}>
                        <Link to='/book'>BOOKS</Link>
                    </li>

                    <li className={styles.item}> 
                        <Link to='/newbook'>REGISTER BOOK</Link>
                    </li>

                </ul>
                
            <Outlet/>
            </Container>

        </div>
    )
}