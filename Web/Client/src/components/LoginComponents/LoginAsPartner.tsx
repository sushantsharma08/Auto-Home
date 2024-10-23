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
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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
          </form>
        </div>
    )
}

export default LoginAsPartner