'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')
    const [orderDetails, setOrderDetails] = useState<any>(null)

    useEffect(() => {
        if (orderId) {
            // Fetch order details from your server
            fetch(`/api/order-details?order_id=${orderId}`)
                .then(res => res.json())
                .then(data => setOrderDetails(data))
        }
    }, [orderId])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-20">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Thank You for Your Order!</CardTitle>
                        <CardDescription>Your subscription has been confirmed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {orderDetails ? (
                            <>
                                <p><strong>Order ID:</strong> {orderDetails.id}</p>
                                <p><strong>Plan:</strong> {orderDetails.notes.planName}</p>
                                <p><strong>Amount:</strong> ₹{(orderDetails.amount / 100).toFixed(2)}</p>
                                <p><strong>Billing:</strong> {orderDetails.notes.billingType}</p>
                                {orderDetails.notes.isTrial === 'true' && (
                                    <p><strong>Trial:</strong> {orderDetails.notes.planName === 'Free' ? 'N/A' : '14 days'}</p>
                                )}
                            </>
                        ) : (
                            <p>Loading order details...</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Link href="https://dashboard.syncsales.tech">
                            <Button className="w-full">Go to Dashboard</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

