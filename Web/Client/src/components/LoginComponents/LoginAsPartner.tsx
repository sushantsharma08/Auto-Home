import axios from "axios";
import { useState } from "react";

const LoginAsPartner = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('hey');
        
        e.preventDefault();
        const log = await axios.post('http://localhost:8000/auth/login/as_partner',formData);
        console.log(log);
        
    };


    return (
        <div className="form-box">
            <form onSubmit={handleSubmit}>


                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn">Login(as partner)</button>
                {/* <button type="submit">h</button> */}
            </form>
        </div>
    )
}

export default LoginAsPartner