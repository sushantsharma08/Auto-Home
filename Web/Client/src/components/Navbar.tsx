import { useState } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isAuthenticated, setisAuthenticated] = useState(null || Boolean)

    setInterval(() => {
        let loc = Boolean(localStorage.getItem("isAuthenticated"));
        setisAuthenticated(loc);
    }, 1000);

    const handleActive = (e: any) => {
        //  console.log(e.target?.id);
        const navItems = document.querySelectorAll(".navItem");
        navItems.forEach((item) => {
            item.classList.remove("active");
        })

        document.getElementById(`${e.target.id}`)?.classList.add('active');
    }

    return (
        <div className='navbar'>
            <div
                style={{ display: isAuthenticated == true ? "block" : "none" }}
                className="dashboard">
                <Link id='system' className='navItem' to="/" onClick={(e) => handleActive(e)}>Home Environment</Link>
            </div>
            <div
                style={{ display: isAuthenticated ? "inherit" : "none" }}
                className="home">
                <Link id='control' className='navItem' onClick={(e) => handleActive(e)} to="/devices">Devices</Link>
            </div>
            <div
                style={{ display: isAuthenticated ? "none" : "inherit" }}
                className="login">
                <Link id='login' className='navItem' onClick={(e) => handleActive(e)} to="/Login">Login</Link>
            </div>
            <div
                style={{ display: isAuthenticated ? "none" : "inherit" }}
                className="register">
                <Link id='register' className='navItem' onClick={(e) => handleActive(e)} to="/Register">Register</Link>
            </div>
        </div>
    )
}

export default Navbar