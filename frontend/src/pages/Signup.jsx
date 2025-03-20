import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { Bottomwarning } from '../components/Bottomwarning'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
    <div className='flex justify-center h-screen bg-slate-300'>
    <div className='flex flex-col justify-center'>
     <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-4'>
        <Heading label={"Sign up"}/>
        <Subheading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
            setFirstName(e.target.value);
        }} placeholder="Alex" label={"First Name"}/>
        <InputBox onChange={e=>{
            setLastName(e.target.value);
        }} placeholder="Turner" label={"Last Name"}/>
        <InputBox onChange={e=>{
            setUsername(e.target.value);
        }} placeholder="arcticmonkey1@gmail.com" label={"Email"}/>
        <InputBox onChange={e=>{
            setPassword(e.target.value);
        }} placeholder="123654" label={"Password"}/>

        <div className='pt-7'>
            <Button onClick={async()=>{
                const response = await axios.post("http://localhost:4000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                },{
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("initialBalance", response.data.balance);
                navigate("/dashboard")
            }} label={"Sign up"}/>
        </div>
        <Bottomwarning label={"Already have an account?"} buttonText={"Sign in to your account"} to={"/signin"}/>
    </div>
    </div>
    </div>
    
    
  )
}

