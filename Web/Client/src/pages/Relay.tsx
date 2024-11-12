import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Origin = 'auto-home-orcin.vercel.app'

const Relay = () => {

    const { isLoading, error, data: Relay, refetch } = useQuery({
        queryKey: ['key'],
        queryFn: () => {
            // return axios.get('localhost:8000/relay/relayStatus')
            return axios.get(`https://${Origin}/relay/relayStatus`)
        }
    });

    const TurnOn = (e: any) => {
        let relayStatus = Relay?.data.relayStatus;
        relayStatus[e.target.id] = 0;
        // axios.patch('localhost:8000/relay/updateRelay', {
        axios.patch(`https://${Origin}/relay/updateRelay`, {
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
        axios.patch(`https://${Origin}/relay/updateRelay`, {
            relayStatus
        }).then(() => {
            refetch();
        });
        AddPing(e.target.id);
    }

    const AddPing = (id: any) => {

        document.getElementById(id)?.classList.add("ping");
        setTimeout(() => {
            document.getElementById(id)?.classList.remove("ping");
        }, 10000);

    }

    const cancelClicked = (e: any) => {
        let id = e.target.name;
        hideEditables(id);
    }

    const editClicked = (e: any) => {
        let id = e.target.name;
        document.getElementById(`cancelBtn${id}`)?.classList.remove('hidden');
        document.getElementById(`input${id}`)?.classList.remove('hidden');
        document.getElementById(`save${id}`)?.classList.remove('hidden');
        document.getElementById(`title${id}`)?.classList.add('hidden');
        document.getElementById(`edit${id}`)?.classList.add('hidden');

    }

    const saveClicked = (e: any) => {
        let RelayDevices = Relay?.data;
        let id = e.target.name;
        // let prevName = (document.getElementById(`title${id}`) as HTMLHeadingElement)?.innerText;
        let newName = (document.getElementById(`input${id}`) as HTMLInputElement)?.value;
        // console.log(prevName + " to: " + newName.toUpperCase());
        // (document.getElementById(`title${id}`) as HTMLHeadingElement).innerText = newName;
        hideEditables(id);
        // console.log(Relay?.data.relayDevices);
        if (newName.length!=0) {
        RelayDevices.relayDevices[id] = newName.toUpperCase();
        const relayDevices = Relay?.data.relayDevices
        axios.patch(`https://${Origin}/relay/updateRelay`, {
            relayDevices
        }).then(() => {
            refetch();
        });
        }else{
            alert('field cannot be empty');
        }
        // console.log(Relay?.data.relayDevices);
    }

    const hideEditables = (id: string) => {

        document.getElementById(`cancelBtn${id}`)?.classList.add('hidden');
        document.getElementById(`input${id}`)?.classList.add('hidden');
        document.getElementById(`save${id}`)?.classList.add('hidden');
        document.getElementById(`title${id}`)?.classList.remove('hidden');
        document.getElementById(`edit${id}`)?.classList.remove('hidden');
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
                        <div style={{ textAlign: "center", color: "grey", display: "flex", width: "300px", justifyContent: "space-between", }}>
                            <h2 id={`title${index}`}>{Relay?.data.relayDevices[index]}</h2>

                            <input id={`input${index}`} className="hidden" type="text" name={index} style={{ color: "white", height: "30px", marginLeft: "30px" }} />

                            <button id={`edit${index}`} name={index} className="editBtn" style={{ color: "white", padding: "5px" }}
                                onClick={e => editClicked(e)}
                            >Edit</button>
                            <button id={`cancelBtn${index}`} name={index} className="cancelBtn hidden" style={{ color: "white", padding: "5px" }}
                                onClick={e => cancelClicked(e)}
                            >Cancel</button>
                            <button id={`save${index}`} name={index} className="saveBtn hidden" style={{ color: "white", padding: "5px" }} type="button"
                                onClick={e => saveClicked(e)}
                            >Save</button>
                        </div>
                        <div key={index}
                            style={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
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