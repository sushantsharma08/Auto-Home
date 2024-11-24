import axios from "axios";
import {useState } from "react";

const LoginAsPartner = () => {

  const Origin = 'auto-home-orcin.vercel.app';
    
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

        e.preventDefault();
        // const log = await axios.post('https://auto-home-orcin.vercel.app/auth/login/as_partner',formData)

         await axios.post(`https://${Origin}/auth/login/as_partner`, formData)
        //  await axios.post('http://localhost:8000/auth/login/as_partner', formData)

            .then(
                async (res) => {
                    //a sve token in localstorage !!!!! (change this meathod of storage).
                    localStorage.setItem("token", res.data?.token);

                    // retrieve homeID,userID based on token
                         await axios.get(`https://${Origin}/user/homeid`, {
                        //  await axios.get("http://localhost:8000/user/homeid", {
                            headers: {
                                'Authorization': `Bearer ${res.data?.token}`,
                            }
                        }).then((res)=>{ 
                    //a sve data in localstorage !!!!! (change this meathod of storage).

                        localStorage.setItem("home",res.data?.home_id,);
                        localStorage.setItem("user",res.data?.user_id);
                        
                        return res;
                    });
                    window.location.href = "/devices"
                    return res
                }
            );
        // if (log.data.token) {
        // localStorage.setItem("token",log.data.token);
        // }else{
        //     alert('username or password invalid')
        // }

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