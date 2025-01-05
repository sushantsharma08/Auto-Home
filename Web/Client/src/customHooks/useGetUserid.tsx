import axios from 'axios'
import { useState } from 'react'

const useGetUserid = async (token:string|null): Promise<string | null> => {
  const Origin = 'auto-home-orcin.vercel.app';
    
    // const token = useGetToken();
    console.log(token);

    const [Id, setId] = useState<string | null>(null);
    const userID = await axios.get(`https://${Origin}/user/homeid`, {
    // const userID = await axios.get("http://localhost:8000/user/homeid", {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
//     .then(res=>{localStorage.setItem("userid",res.data?.home_id)
// });

    setId(userID.data?.home_id);
    console.log(userID.data?.home_id);

    return Id;
}

export default useGetUserid