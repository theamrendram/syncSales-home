"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    // NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import logo from "@/public/syncsales_logo.png"
import logoWhite from "@/public/syncsales white logo.png"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <NavigationMenu className="bg-white shadow-lg p-2 sm:m-4 lg:w-[80vw] lg:mx-auto rounded-lg bg-opacity-40">
            <Image src={logoWhite} alt="Logo" width={150} height={100} />
            <NavigationMenuList className="hidden md:flex">
                <div className="flex gap-2">
                    <NavigationMenuItem>
                        <Link href="#features" legacyBehavior passHref className="">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className="text-lg text-white"> Features</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#pricing" legacyBehavior passHref className="text-lg">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className="text-lg text-white">Pricing</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#setup" legacyBehavior passHref className="text-lg">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className="text-lg text-white">Easy Setup</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </div>
            </NavigationMenuList>
            <div className="flex gap-2">
                {/* <Button>
                    Login
                </Button>
                <Button className="w-full" >
                    Sign Up
                </Button> */}
                <Button className="w-[150px] text-lg">Contact</Button>
            </div>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Navbar