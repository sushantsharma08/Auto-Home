import axios from "axios";
import { useState } from "react";

const LoginAsOwner = () => {
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
    
      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

       
        // const log = await axios.post('http://localhost:8000/auth/login/as_owner',formData).then(

        // );
        // const log = await axios.post('https://auto-home-orcin.vercel.app/auth/login/as_partner',formData);
/*         if (log.data.status === 403) {
          alert(log.data.message) */
      // }
        // console.log(log);

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
  
            <button type="submit" className="btn">Login(as owner)</button>
          </form>
        </div>
    )
}

export default LoginAsOwner