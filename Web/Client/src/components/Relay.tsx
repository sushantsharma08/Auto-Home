import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Relay = () => {

    const { isLoading, error, data: Relay } = useQuery({
        queryKey: ['key'],
        queryFn: () => {
            return axios.get('https://auto-home-orcin.vercel.app/relay/relayStatus')
        }
    });


    const TurnOn = (e: any) => {
        console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 0;
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        })
    }

    const TurnOff = (e: any) => {
        console.log(e);
        // res[e.target.id] = 0;
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 1;
        axios.patch('https://auto-home-orcin.vercel.app/relay/updateRelay', {
            relayStatus
        })
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
    console.log(Relay?.data.relayStatus);

    return (
        <section>
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

        </section>
    )
}

export default Relay