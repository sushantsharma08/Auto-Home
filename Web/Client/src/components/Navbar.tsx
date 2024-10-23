import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar' style={{display:"flex"}}>
            <div className="dashboard">
                <Link className='navItem' to="/">Dashboard</Link>
            </div>
            <div className="home">
                <Link className='navItem' to="/Home">Home</Link>
            </div>
            <div className="login">
                <Link className='navItem' to="/Login">Login</Link>
            </div>
            <div className="register">
                <Link className='navItem' to="/Register">Register</Link>
            </div>
        </div>
    )
}

export default Navbar