import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { GridBackgroundDemo } from "./GridBackground";
import Link from "next/link";

export function Hero() {
  return (
    <GridBackgroundDemo>
      <div className="relative text-white" >
        <div className="absolute inset-0 -z-10 gradient-secondary" />
        <div className="container flex flex-col items-center justify-center space-y-10 py-32 md:py-40 lg:py-48">
          <div className="space-y-6 text-center">
            <Badge
              variant="secondary"
              className="w-fit mx-auto bg-neutral-300 text-neutral-900">
              Trusted by leading media buyers
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Lead Generation <br className="hidden sm:inline" />
              <span className="gradient-text">Sales Pipeline</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Automate your outreach, qualify leads instantly, and close more
              deals with our all-in-one sales automation platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup" className="h-12 px-8 gradient-primary rounded-lg text-white flex items-center justify-center">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* <Link href="/demo" className="h-12 px-8 bg-white">
              Watch Demo
            </Link> */}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </GridBackgroundDemo>
  );
}
