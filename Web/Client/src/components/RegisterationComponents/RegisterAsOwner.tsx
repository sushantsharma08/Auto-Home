import axios from "axios";
import { useState } from "react";

const RegisterAsOwner = () => {

  const Origin = 'auto-home-orcin.vercel.app';


    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
    
      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const ownerUsername = formData.username;
        const   relayStatus = [1,1,1,1,1,1,1,1] ;
        const relayDevices = ["DEVICE1","DEVICE2","DEVICE3","DEVICE4","DEVICE5","DEVICE6","DEVICE7","DEVICE8"];

       const relay = await axios.post(`https://${Origin}/relay/add_relay`,{ownerUsername,  relayStatus, relayDevices})
      //  const relay = await axios.post(`http://localhost:8000/relay/add_relay`,{ownerUsername,  relayStatus, relayDevices})
      //  .then(
       const owner = await axios.post(`https://${Origin}/auth/register/as_owner`,{...formData,home_id:relay.data.id})
      //  const owner = await axios.post(`http://localhost:8000/auth/register/as_owner`,{...formData,home_id:relay.data.id})
      //  )

       console.log(owner);

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
                value={formData.confirmPassword}
                onChange={handleChange}
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
  
            <button type="submit" className="btn">Register</button>
          </form>
        </div>
    )
}

export default RegisterAsOwner