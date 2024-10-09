import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Relay = () => {

    const { isLoading, error, data: Relay, refetch } = useQuery({
        queryKey: ['key'],
        queryFn: () => {
            // return axios.get('localhost:8000/relay/relayStatus')
            return axios.get('https://auto-home-orcin.vercel.app/relay/relayStatus')
        }
    });

    // const { isLoading, error, data: Relay } = useQuery(
    //     'querykey',
    //     () => {
    //         return axios.get('https://auto-home-orcin.vercel.app/relay/relayStatus')
    //     },{
    //         refetchInterval:
    //     }
    // );


    const TurnOn = (e: any) => {
        // console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 0;
        // axios.patch('localhost:8000/relay/updateRelay', {
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        }).then(() => {
            refetch();
        });
        AddPing(e.target.id);
    }

    const TurnOff = (e: any) => {
        console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 1;
        // axios.patch('localhost:8000/relay/updateRelay', {
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        }).then(() => {
            refetch();
        });
        AddPing(e.target.id);
    }

    const AddPing = (id:any)=>{

        document.getElementById(id)?.classList.add("ping");
        setTimeout(() => {
        document.getElementById(id)?.classList.remove("ping");
        },10000);

    }


    if (isLoading) {
        return (
            <>
                <h2>Loading...</h2>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h2>Error occured...</h2>
            </>
        )
    }

    return (
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                {Relay?.data.relayStatus.map((relay: any, index: any) =>
                    <>

                        <div style={{textAlign:"center"}}><h2>{Relay?.data.relayDevices[index]}</h2></div>
                        <div key={index} 
                        style={{ height:"150px",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                        >
                            {relay == 1 ?
                                <button className="deviceBtn turnOn " id={index.toString()}
                                    onClick={e => TurnOn(e)} >
                                    Turn On
                                </button>
                                :
                                <button className="deviceBtn turnOff " id={index.toString()}
                                    onClick={e => TurnOff(e)} >
                                    Turn Off
                                </button>
                            }
                        </div>
                    </>
                )}
            </div>


        </section>
    )
}

export default Relay