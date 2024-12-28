'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Script from 'next/script'

declare global {
    interface Window {
        Razorpay: any;
    }
}

const plans = {
    free: { name: "Free", price: 0, trialDays: 0 },
    pro: { name: "Pro", price: 4900, trialDays: 14 }, // Price in paise (49 INR)
    enterprise: { name: "Enterprise", price: 9900, trialDays: 14 } // Price in paise (99 INR)
}

function Checkout() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedPlan = searchParams.get('plan') || 'pro'
    const [isAnnual, setIsAnnual] = useState(false)
    const [isTrial, setIsTrial] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const plan = plans[selectedPlan as keyof typeof plans]
    const price = isAnnual ? plan.price * 12 * 0.9 : plan.price // 10% discount for annual

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handlePayment = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/create-razorpay-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan: selectedPlan, isAnnual, isTrial }),
            })

            const data = await response.json()

            if (data.error) {
                console.error('Error:', data.error)
                setIsLoading(false)
                return
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: 'SyncSales',
                description: `${plan.name} Plan - ${isAnnual ? 'Annual' : 'Monthly'}`,
                order_id: data.id,
                handler: function (response: any) {
                    router.push(`/success?order_id=${response.razorpay_order_id}`)
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '9876543210'
                },
                theme: {
                    color: '#3B82F6'
                }
            }

            const razorpayInstance = new window.Razorpay(options)
            razorpayInstance.open()
        } catch (error) {
            console.error('Error:', error)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="mx-auto px-4 py-20">
                <h1 className="text-3xl font-bold text-center mb-8">Complete Your Order</h1>
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>Review your plan details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>Plan:</span>
                            <span className="font-semibold">{plan.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Billing:</span>
                            <div className="flex items-center space-x-2">
                                <span>Monthly</span>
                                <Switch
                                    checked={isAnnual}
                                    onCheckedChange={setIsAnnual}
                                />
                                <span>Annual (Save 10%)</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-semibold">
                                ₹{(price / 100).toFixed(2)} / {isAnnual ? 'year' : 'month'}
                            </span>
                        </div>
                        {plan.trialDays > 0 && (
                            <div className="flex justify-between items-center">
                                <span>Free Trial:</span>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={isTrial}
                                        onCheckedChange={setIsTrial}
                                    />
                                    <span>{plan.trialDays} days</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={handlePayment}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : isTrial ? `Start ${plan.trialDays}-Day Free Trial` : `Pay ₹${(price / 100).toFixed(2)}`}
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}



export default function CheckoutPage() {
    <Suspense fallback={<div>Loading...</div>}>
        <Checkout />
    </Suspense>
}