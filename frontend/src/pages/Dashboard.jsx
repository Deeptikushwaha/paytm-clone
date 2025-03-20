import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";

export const Dashboard=()=>{
    const [balance, setBalance] = useState(()=>{
        return parseFloat(localStorage.getItem("initialBalance")) || 0
    });
    
        const fetchBalance = async()=>{
            const response = await axios.get("http://localhost:4000/api/v1/account/balance",{
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            })
            setBalance(response.data.balance.toFixed(2))
        }
        useEffect(()=>{
            fetchBalance();
        },[])
    return (
        <div>
            <Appbar/>
            <div className="m-8">
                <Balance value={balance}/>
                <Users/>
            </div>
        </div>
    )
}

