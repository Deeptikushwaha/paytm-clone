import React from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { Bottomwarning } from '../components/Bottomwarning'

export const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
        <Heading label={"Sign in"}/>
        <Subheading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="Alex123@gmail.com" label={"Email"}/>
        <InputBox placeholder="123654" label={"Password"}/>
        <div className='pt-7'>
            <Button label={"Sign in"}/>
        </div>
        <Bottomwarning label={"Don't have an account?"} buttonText={"Sign up for account"} to={"/signup"}/>
    </div>
    </div>
    </div>
  )
}

