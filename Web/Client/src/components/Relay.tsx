import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Relay = () => {

    const { isLoading, error, data: Relay,refetch } = useQuery({
        queryKey: ['key'],
        queryFn: () => {
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
        console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 0;
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        }).then(()=>{
            refetch();
        })
        // refetch();
    }

    const TurnOff = (e: any) => {
        console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 1;
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        }).then(()=>{
            refetch();
        })
        // refetch();

    }

    if (isLoading) {
        return (
            <>
                <h2>Loadin...</h2>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h2>Errorm occured...</h2>
            </>
        )
    }
 
    return (
        <section style={{border:"1px solid red", display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div>
            {Relay?.data.relayStatus.map((relay: any, index: any) =>
                <div key={index} id={index}>
                    <span><h2>Device id : {index+1}</h2></span>
                    {relay == 1 ?
                        <button id={index.toString()}
                            onClick={e => TurnOn(e)} >
                            Turn On</button> :
                        <button id={index.toString()}
                            onClick={e => TurnOff(e)} >
                            Turn Off</button>
                    }
                </div>
            )}
            </div>


        </section>
    )
}

export default Relay