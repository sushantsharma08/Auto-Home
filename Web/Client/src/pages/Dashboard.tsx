
const Dashboard = () => {


  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>


      <div style={{ color: "grey", zIndex: "1" }}>

        <section className="dashboard-welcome">

          <span className="hive-dashboard glow" style={{ color: "#36827F", fontSize: "65px", fontFamily: "fantasy", fontWeight: "bolder" }}> H.I.V.E</span>

          <div className="dashboard-welcome-message" >
            <br /> Home Intelligent Virtual Ecosystem
          </div>
          <span className="dashboard-catchphrase">"Where Comfort Meets Control."</span>

          {/* <span>"Efficiency You Can Feel, Savings You’ll See."</span>
        <span>"Smart Living Without Breaking the Bank."</span>
        <span>"Automation That Fits Your Budget."</span>
        <span>"Intelligence That’s Easy on Your Wallet."</span>
        <span>"Spend Less, Automate More."</span> */}



          <div className="relaystat">
          

          </div>

        </section>
      </div>

    </div>

  )
}

export default Dashboard