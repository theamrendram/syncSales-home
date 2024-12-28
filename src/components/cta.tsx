import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function CTA() {
    return (
        <section className="border-t">
            <div className="relative">
                <div className="absolute inset-0 -z-10 gradient-secondary" />
                <div className="container py-24 sm:py-32">
                    <div className="flex flex-col items-center gap-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Ready to <span className="gradient-text">transform</span> your sales process?
                        </h2>
                        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Join thousands of sales teams using SyncSales to close more deals.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button size="lg" className="h-12 px-8 gradient-primary">
                                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-12 px-8">
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

