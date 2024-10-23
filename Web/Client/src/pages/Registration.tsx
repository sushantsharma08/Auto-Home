import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterAsOwner from "../components/RegisterAsOwner";
import RegisterAsPartner from "../components/RegisterAsPartner";

const Registration = () => {
  // function useState(arg0: { username: string; email: string; password: string; confirmPassword: string; }): [any, any] {
  //   throw new Error("Function not implemented.");
  // }

  const [isOwner, setIsOwner] = useState(true);

  // const [formData, setFormData] = useState({
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   phoneNumber: '',
  //   home_id: '',
  // });

  const handleAccount = (e: any) => {
    if (e.target.className === 'owner') {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
    console.log(isOwner);

  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  //   // add react-toast for passwords not match
  //   // if (formData.password !== formData.confirmPassword) {
  //   //   alert('Passwords do not match!');
  //   // } else {
  //   //   console.log('Form submitted', formData);
  //   // }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     alert('Passwords do not match!');
  //   } else {
  //     console.log('Form submitted', formData);
  //   }
  // };

  return (

    <div className="container">
      <div className="header">

        <div className="heading">Register</div>

        <div className="account_type">
          <Link to={'asOwner'} className="owner" style={{ border: '1px solid', borderColor: isOwner ? "yellow" : "grey" }} onClick={e => handleAccount(e)} >As Owner</Link>

          <Link to={'asPartner'} className="partner" style={{ border: '1px solid', borderColor: isOwner ? "grey" : "Green" }} onClick={handleAccount} >As Partner</Link>
        </div>

        <div className="about">
          <p style={{ display: isOwner ? 'block' : 'none' }}>Create an owner account to manage your home environment with the ESP32 and gain the ability to add new partner accounts. As an owner, you'll have full control over your smart home settings and the power to manage access for other household members.</p>
          <p style={{ display: isOwner ? 'none' : 'block' }}>
            Join a home environment as a home partner using a shared Home ID to gain access and control over the devices within the home.
          </p>
        </div>

      </div>

      <Routes>
        <Route path="asOwner" element={<RegisterAsOwner />} />
        <Route path="asPartner" element={<RegisterAsPartner />} />
      </Routes>


      {/* <div className="form-box">
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
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="home_id">Home ID</label>
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
      </div> */}
    </div>
  );
}

export default Registration



