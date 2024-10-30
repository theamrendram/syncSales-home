'use client'
import React, { useState } from 'react'
import axios from "axios"
import { Input } from './ui/input'
import { Button } from './ui/button'

const CallToAction = () => {

    const [email, setEmail] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const res = axios.post("/api/email", { email })
        console.log(res)
        setEmail("")
    }
    return (
        <section className='min-h-[50vh] flex flex-col items-center justify-center px-20 bg-primary'>
            <p className='text-5xl font-bold text-center py-4'>Get Early Access and Exclusive Discounts</p>
            <p className='text-2xl text-center'>Join our waiting list to be among the first to experience SyncSales and receive special offers.</p>
            <div className='w-2/5 py-4'>
                <form onSubmit={(e) => handleSubmit(e)} className='flex gap-4 px-20'>
                    <Input type="email" placeholder="Enter your email" className="w-full" name="email" value={email} onChange={(e) => handleChange(e)} />
                    <Button type='submit' className='bg-white text-black' variant={"ghost"}>Submit</Button>
                </form>
            </div>
        </section>
    )
}

export default CallToAction