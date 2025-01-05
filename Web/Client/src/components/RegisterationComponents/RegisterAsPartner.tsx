import axios from "axios";
import { useState } from "react";


const RegisterAsPartner = () => {

  const Origin = 'auto-home-orcin.vercel.app';

    const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
      password: '',
      // confirmPassword: '',
      phone: '',
      home_id: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      // add react-toast for passwords not match
      // if (formData.password !== formData.confirmPassword) {
      //   alert('Passwords do not match!');
      // } else {
      //   console.log('Form submitted', formData);
      // }
    };

    const checkPasswords = (e:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(e.target.value);
      
      if (e.target.value != formData.password) {
        
      }
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // const log = await axios.post(`http://localhost:8000/auth/register/as_partner`, formData); 

      const log = await axios.post(`https://${Origin}/auth/register/as_partner`, formData);

      console.log(log);
      
    };



  return (
    <div className="form-box">
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              // value=""
              onChange={checkPasswords}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="home_id">Home ID (for connection to home environment) </label>
            <input
              type="text"
              id="home_id"
              name="home_id"
              value={formData.home_id}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">Register</button>
        </form>
      </div>
  )
}

export default RegisterAsPartner