'use client'
import React, { useState } from 'react'
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { Input } from './ui/input'
import { Button } from './ui/button'

const CallToAction = () => {
    const { toast } = useToast()

    const [email, setEmail] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post("/api/email", { email })
        if (res.status === 200) {
            toast({
                title: "Success",
                description: "Thanks for signing up!",
            })
        } else {
            toast({
                title: "Error",
                description: "Something went wrong!",
            })
        }
        setEmail("")
    }
    return (
        <section className='min-h-[50vh] flex flex-col items-center justify-center px-8 sm:px-20 bg-primary'>
            <p className='text-4xl sm:text-5xl font-bold text-center py-4'>Get Early Access and Exclusive Discounts</p>
            <p className='text-2xl text-center'>Join our waiting list to be among the first to experience SyncSales and receive special offers.</p>
            <div className='w-full md:w-3/5 lg:w-2/5 py-4'>
                <form onSubmit={(e) => handleSubmit(e)} className='flex gap-4'>
                    <Input type="email" placeholder="Enter your email" className="w-full" name="email" value={email} onChange={(e) => handleChange(e)} />
                    <Button type='submit' className='bg-white text-black' variant={"ghost"}>Submit</Button>
                </form>
            </div>
        </section>
    )
}

export default CallToAction