import React, { useState } from 'react'
import { useSearchParams } from 'react-router'
import axios from "axios";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
  return (
    <div className='flex justify-center h-screen bg-gray-200'>
    <div className='flex flex-col justify-center h-full'>
        <div className='w-99 bg-white shadow-lg rounded-lg border h-min text-card-foreground max-w-md p-4 '>
            <div className='flex flex-col space-y-1.5 p-7'>
                <h2 className="text-3xl font-bold text-center">Send Money To</h2>
            </div>
            <div className='p-7'>
                <div className="flex justify-center mr-6 items-center space-x-4 py-7">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className='space-y-4'>
                <div className='space-y-2'>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' htmlFor="amount">
                        Amount(in Rs)
                    </label>
                    <input onChange={(e)=>{
                        setAmount(e.target.value);
                    }}
                    type="number" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm h-12"
                    id="amount"
                    placeholder="Enter amount" 
                    />
                </div>
                <button onClick={async()=>{
                    await axios.post("http://localhost:4000/api/v1/account/transfer",{
                        to: id,
                        amount
                    },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                }} className='bg-green-500 text-white rounded-md text-sm justify-center font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full '>
                     Transfer
                </button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}