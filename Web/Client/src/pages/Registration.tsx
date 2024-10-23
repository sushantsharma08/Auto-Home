import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterAsOwner from "../components/RegisterAsOwner";
import RegisterAsPartner from "../components/RegisterAsPartner";

const Registration = () => {

  const [isOwner, setIsOwner] = useState(true);

  const handleAccount = (e: any) => {
    if (e.target.className === 'owner') {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
    console.log(isOwner);

  }

  return (

    <div className="container ">
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

    </div>
  );
}

export default Registration



