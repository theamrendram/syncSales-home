"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  Megaphone,
  Search,
  Settings,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function UserManual() {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
        <div className="flex items-center gap-2 font-semibold">
          <Layers className="h-6 w-6 text-primary" />
          <span>SyncSales</span>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full rounded-lg bg-background pl-8 md:w-80"
          />
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="#">Log In</Link>
        </Button>
        <Button size="sm">Sign Up</Button>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_200px]">
        <aside className="hidden border-r md:block">
          <div className="sticky top-16 overflow-y-auto p-4 h-[calc(100vh-4rem)]">
            <nav className="grid gap-2">
              <Button
                variant={activeTab === "introduction" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("introduction")}>
                <Home className="mr-2 h-4 w-4" />
                Introduction
              </Button>
              <Button
                variant={
                  activeTab === "getting-started" ? "secondary" : "ghost"
                }
                className="justify-start"
                onClick={() => setActiveTab("getting-started")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Getting Started
              </Button>
              <Button
                variant={activeTab === "managing-leads" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("managing-leads")}>
                <Users className="mr-2 h-4 w-4" />
                Managing Leads
              </Button>
              <Button
                variant={activeTab === "webhooks-api" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("webhooks-api")}>
                <Code className="mr-2 h-4 w-4" />
                Webhooks & API
              </Button>
              <Button
                variant={
                  activeTab === "campaign-management" ? "secondary" : "ghost"
                }
                className="justify-start"
                onClick={() => setActiveTab("campaign-management")}>
                <Megaphone className="mr-2 h-4 w-4" />
                Campaign Management
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsList className="md:hidden mb-4 w-full">
              <TabsTrigger value="introduction" className="flex-1">
                Introduction
              </TabsTrigger>
              <TabsTrigger value="getting-started" className="flex-1">
                Getting Started
              </TabsTrigger>
              <TabsTrigger value="managing-leads" className="flex-1">
                Managing Leads
              </TabsTrigger>
              <TabsTrigger value="webhooks-api" className="flex-1">
                Webhooks & API
              </TabsTrigger>
              <TabsTrigger value="campaign-management" className="flex-1">
                Campaign Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="introduction" className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Introduction
                </h1>
                <p className="text-muted-foreground">
                  Welcome to the SyncSales User Guide. Learn how to use
                  SyncSales to manage your leads effectively.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>What is SyncSales?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    SyncSales is a SaaS-based lead management platform that
                    helps lead publishers collect, manage, and distribute leads
                    efficiently. It acts as a central hub where leads from
                    multiple landing pages can be received and forwarded to
                    third-party CRMs via webhooks.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Benefits of SyncSales:</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          <strong>Centralized Lead Management</strong> – Store
                          and organize all your leads in one place.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          <strong>Automated Lead Distribution</strong> – Send
                          leads to external CRMs with custom webhooks.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          <strong>Campaign & Route System</strong> – Easily
                          manage campaigns and define lead flows.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          <strong>Advanced Analytics</strong> – Track lead
                          performance and optimize campaigns.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          <strong>Webmaster Access</strong> – Share
                          campaign-wise leads with external partners securely.
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Who is This Guide For?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>This guide is designed for:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      <span>
                        <strong>Lead Publishers</strong> – Who want to collect
                        leads from various landing pages.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-primary" />
                      <span>
                        <strong>Sales & Marketing Teams</strong> – Who need a
                        structured lead management system.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Code className="mr-2 h-5 w-5 text-primary" />
                      <span>
                        <strong>Developers & Businesses</strong> – Who want to
                        integrate SyncSales with their CRM using APIs.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("getting-started")}>
                  Next: Getting Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Getting Started
                </h1>
                <p className="text-muted-foreground">
                  Before you start using SyncSales, follow these steps to set up
                  your account and configure the basics.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sign Up & Log In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Visit SyncSales</p>
                        <p className="text-sm text-muted-foreground">
                          Navigate to the SyncSales website to begin the sign-up
                          process.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Click on &quot;Sign Up&quot; and enter your details
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You can sign up using:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>Email & Password</li>
                          <li>Google Authentication (if enabled)</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Verify your email (if required)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check your inbox for a verification email and follow
                          the instructions.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Log in to access the dashboard
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Once verified, log in with your credentials to access
                          your SyncSales dashboard.
                        </p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-4 rounded-md bg-muted p-4">
                    <div className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <p className="text-sm">
                        <strong>Tip:</strong> Already have an account? Click on
                        &quot;Log In&quot; instead.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    After logging in, complete your profile to get the best
                    experience.
                  </p>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Navigate to the Profile Settings section
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Click on your profile icon in the top-right corner and
                          select &quot;Profile Settings&quot;.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Fill in the following details:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>Company Name</li>
                          <li>Business Industry</li>
                          <li>Contact Information</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Click Save Changes to update your profile
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Make sure to save your changes before leaving the
                          page.
                        </p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-4 rounded-md bg-muted p-4">
                    <div className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <p className="text-sm">
                        <strong>Why?</strong> A complete profile helps in
                        customizing your dashboard and tracking leads
                        efficiently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Explore the Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Once you log in, you&apos;ll be taken to the SyncSales
                    Dashboard, where you can:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                      <span>View lead analytics and campaign performance.</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                      <span>Create Routes (to manage lead flow).</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                      <span>Set up Campaigns (to collect leads).</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                      <span>
                        Configure Webhooks (to send leads to third-party tools).
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center rounded-md bg-muted p-4">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Next Step: Setting Up Your First Route
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Learn how to create routes to manage your lead flow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("introduction")}>
                  Previous: Introduction
                </Button>
                <Button onClick={() => setActiveTab("managing-leads")}>
                  Next: Managing Leads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="managing-leads" className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Managing Leads
                </h1>
                <p className="text-muted-foreground">
                  Learn how to add, import, filter, and manage your leads
                  effectively in SyncSales.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="adding-leads">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <UserPlus className="mr-2 h-5 w-5" />
                      <span>Adding Leads Manually</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      You can add leads manually to your SyncSales account. This
                      is useful when you receive leads from sources that are not
                      connected to your SyncSales account.
                    </p>
                    <Card>
                      <CardHeader>
                        <CardTitle>Steps to Add a New Lead</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-4">
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              1
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Navigate to the Leads section
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Click on &quot;Leads&quot; in the main
                                navigation menu.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              2
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Click on &quot;Add Lead&quot; button
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Look for the &quot;Add Lead&quot; button in the
                                top-right corner of the Leads page.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              3
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Fill in the lead details
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Enter all the required information for the lead.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              4
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">Select a campaign</p>
                              <p className="text-sm text-muted-foreground">
                                Choose which campaign this lead belongs to.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              5
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Click &quot;Save&quot; to add the lead
                              </p>
                              <p className="text-sm text-muted-foreground">
                                The lead will be added to your database and
                                processed according to your campaign settings.
                              </p>
                            </div>
                          </li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Required Fields and Best Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Required Fields:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Full Name</li>
                              <li>Email Address</li>
                              <li>Phone Number</li>
                              <li>Campaign</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Best Practices:
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Always verify the email format before adding a
                                  lead.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Include as much information as possible to
                                  improve lead quality.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Add tags to categorize leads for better
                                  organization.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Set the correct lead source for accurate
                                  analytics.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="importing-leads">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      <span>Importing Leads in Bulk</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      SyncSales allows you to import leads in bulk using CSV
                      files or API integration. This is useful when you have a
                      large number of leads to add at once.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle>Uploading CSV</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-4">
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              1
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Navigate to the Leads section
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Click on &quot;Leads&quot; in the main
                                navigation menu.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              2
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Click on &quot;Import Leads&quot; button
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Look for the &quot;Import Leads&quot; button in
                                the top-right corner of the Leads page.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              3
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Select &quot;CSV Upload&quot; option
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Choose the CSV upload option from the import
                                methods.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              4
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Upload your CSV file
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Click on &quot;Choose File&quot; and select your
                                CSV file.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              5
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Map CSV columns to lead fields
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Match each column in your CSV to the
                                corresponding field in SyncSales.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              6
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">Select a campaign</p>
                              <p className="text-sm text-muted-foreground">
                                Choose which campaign these leads belong to.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                              7
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">
                                Click &quot;Import&quot; to start the import
                                process
                              </p>
                              <p className="text-sm text-muted-foreground">
                                The leads will be imported and processed
                                according to your campaign settings.
                              </p>
                            </div>
                          </li>
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Mapping Lead Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          When importing leads, you need to map the columns in
                          your CSV file to the corresponding fields in
                          SyncSales. Here&apos;s how to ensure your data is
                          mapped correctly:
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              CSV Format Requirements:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>
                                The first row should contain column headers
                              </li>
                              <li>
                                Each subsequent row should represent a single
                                lead
                              </li>
                              <li>Use UTF-8 encoding for special characters</li>
                              <li>Maximum file size: 10MB</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Field Mapping Tips:
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Match column names to SyncSales field names
                                  when possible.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Use the preview feature to verify your mapping
                                  before importing.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  Save your mapping templates for future
                                  imports.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <span>
                                  For custom fields, ensure they exist in
                                  SyncSales before importing.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="filtering-leads">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      <span>Filtering & Searching Leads</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p>
                      SyncSales provides powerful filtering and searching
                      capabilities to help you find specific leads quickly.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle>How to Find Specific Leads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Basic Search:</h4>
                            <ol className="space-y-2">
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  1
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Navigate to the Leads section
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Click on &quot;Leads&quot; in the main
                                    navigation menu.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  2
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Use the search bar
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Enter keywords, names, email addresses, or
                                    phone numbers to find matching leads.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  3
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    View search results
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    The leads matching your search criteria will
                                    be displayed in the list.
                                  </p>
                                </div>
                              </li>
                            </ol>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Quick Filters:</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              SyncSales provides quick filters to help you find
                              leads based on common criteria:
                            </p>
                            <ul className="space-y-2">
                              <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                                <span>
                                  <strong>Recent Leads</strong> - Shows leads
                                  added in the last 24 hours
                                </span>
                              </li>
                              <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                                <span>
                                  <strong>By Campaign</strong> - Filter leads by
                                  specific campaign
                                </span>
                              </li>
                              <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                                <span>
                                  <strong>By Status</strong> - Filter leads by
                                  their current status
                                </span>
                              </li>
                              <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                                <span>
                                  <strong>By Source</strong> - Filter leads by
                                  their source
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Using Advanced Filters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          SyncSales offers advanced filtering options to help
                          you find leads based on specific criteria.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Advanced Filter Options:
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-medium">
                                    Date Range Filters
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Filter leads by creation date, last update,
                                    or conversion date.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-medium">
                                    Custom Field Filters
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Filter by any custom field you&apos;ve added
                                    to your leads.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-medium">Tag Filters</p>
                                  <p className="text-sm text-muted-foreground">
                                    Find leads with specific tags or
                                    combinations of tags.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <p className="font-medium">
                                    Geographic Filters
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Filter leads by country, state, city, or zip
                                    code.
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Creating Saved Filters:
                            </h4>
                            <ol className="space-y-2">
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  1
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Set up your advanced filters
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Configure the filters to match your
                                    criteria.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  2
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Click &quot;Save Filter&quot;
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Give your filter a name that describes its
                                    purpose.
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                                  3
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Access saved filters
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Your saved filters will appear in the
                                    filters dropdown for quick access.
                                  </p>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("getting-started")}>
                  Previous: Getting Started
                </Button>
                <Button onClick={() => setActiveTab("webhooks-api")}>
                  Next: Webhooks & API Integration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="webhooks-api" className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Webhooks & API Integration
                </h1>
                <p className="text-muted-foreground">
                  Learn how to integrate SyncSales with your existing systems
                  using webhooks and API.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Setting Up Webhooks</CardTitle>
                  <CardDescription>
                    Webhooks allow you to receive real-time notifications when
                    leads are created or updated in SyncSales.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">
                    How to Configure Webhook Endpoints
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Navigate to Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Click on the&quot;Settings&quot; icon in the main
                          navigation menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Select&quot;Webhooks&quot;
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Find and click on the&quot;Webhooks&quot; option in
                          the settings menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Click &quot;Add Webhook&quot;</p>
                        <p className="text-sm text-muted-foreground">
                          Click on the &quot;Add Webhook&quot; button to create a new
                          webhook.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Configure the webhook</p>
                        <p className="text-sm text-muted-foreground">
                          Enter the following information:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>
                            Webhook Name: A descriptive name for your webhook
                          </li>
                          <li>
                            Endpoint URL: The URL where SyncSales will send the
                            data
                          </li>
                          <li>
                            Secret Key: A secret key for securing the webhook
                            (optional but recommended)
                          </li>
                          <li>
                            Events: Select which events should trigger the
                            webhook (e.g., lead created, lead updated)
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        5
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Save the webhook</p>
                        <p className="text-sm text-muted-foreground">
                          Click &quot;Save&quot; to create the webhook. SyncSales will now
                          send data to your endpoint when the selected events
                          occur.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">
                      Managing Multiple Endpoints
                    </h3>
                    <p className="mb-2">
                      You can set up multiple webhook endpoints to send lead
                      data to different systems:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          Create separate webhooks for different campaigns to
                          route leads to specific CRMs.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          Set up webhooks with different event triggers for
                          various notification needs.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          Use the webhook testing feature to verify your
                          endpoints are receiving data correctly.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>
                          Monitor webhook delivery status and retry failed
                          deliveries from the webhook logs.
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Using SyncSales API</CardTitle>
                  <CardDescription>
                    The SyncSales API allows you to programmatically interact
                    with your SyncSales account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Generating API Keys</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Navigate to Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Click on the &quot;Settings&quot; icon in the main navigation
                          menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Select &quot;API Keys&quot;</p>
                        <p className="text-sm text-muted-foreground">
                          Find and click on the &quot;API Keys&quot; option in the
                          settings menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Click &quot;Generate New API Key&quot;
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Click on the &quot;Generate New API Key&quot; button.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Configure the API key</p>
                        <p className="text-sm text-muted-foreground">
                          Enter a name for your API key and select the
                          permissions you want to grant.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        5
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Save and copy your API key
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Click &quot;Generate&quot; to create the API key. Make sure to
                          copy and store it securely, as it won&apos;t be displayed
                          again.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">
                      Example API Requests
                    </h3>
                    <p className="mb-2">
                      Here are some common API requests you can use with
                      SyncSales:
                    </p>

                    <div className="space-y-4">
                      <div className="rounded-md bg-muted p-4">
                        <h4 className="font-medium mb-2">Creating a Lead</h4>
                        <div className="bg-background rounded-md p-3 text-sm font-mono overflow-x-auto">
                          <pre>
                            {`POST https://api.syncsales.com/v1/leads
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "campaign_id": "camp_12345",
  "source": "API"
}`}
                          </pre>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <h4 className="font-medium mb-2">Retrieving Leads</h4>
                        <div className="bg-background rounded-md p-3 text-sm font-mono overflow-x-auto">
                          <pre>
                            {`GET https://api.syncsales.com/v1/leads?campaign_id=camp_12345&limit=10
Authorization: Bearer YOUR_API_KEY`}
                          </pre>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <h4 className="font-medium mb-2">Updating a Lead</h4>
                        <div className="bg-background rounded-md p-3 text-sm font-mono overflow-x-auto">
                          <pre>
                            {`PATCH https://api.syncsales.com/v1/leads/lead_12345
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "status": "qualified",
  "notes": "Customer is interested in our premium plan"
}`}
                          </pre>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <h4 className="font-medium mb-2">
                          Creating a Campaign
                        </h4>
                        <div className="bg-background rounded-md p-3 text-sm font-mono overflow-x-auto">
                          <pre>
                            {`POST https://api.syncsales.com/v1/campaigns
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "name": "Summer Promotion",
  "description": "Summer 2023 promotional campaign",
  "status": "active"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-md bg-muted p-4">
                      <div className="flex items-start">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        <p className="text-sm">
                          <strong>Note:</strong> For a complete list of API
                          endpoints and parameters, refer to our
                          <Link
                            href="#"
                            className="text-primary ml-1 hover:underline">
                            API Documentation
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("managing-leads")}>
                  Previous: Managing Leads
                </Button>
                <Button onClick={() => setActiveTab("campaign-management")}>
                  Next: Campaign Management
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="campaign-management" className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Campaign Management
                </h1>
                <p className="text-muted-foreground">
                  Learn how to create, manage, and track campaigns in SyncSales.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Creating a New Campaign</CardTitle>
                  <CardDescription>
                    Campaigns help you organize your leads and track their
                    performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Steps to Create and Configure Campaigns
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Navigate to Campaigns</p>
                        <p className="text-sm text-muted-foreground">
                          Click on &quot;Campaigns&quot; in the main navigation menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Click &quot;Create Campaign&quot;</p>
                        <p className="text-sm text-muted-foreground">
                          Click on the &quot;Create Campaign&quot; button in the top-right
                          corner.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Enter campaign details</p>
                        <p className="text-sm text-muted-foreground">
                          Fill in the following information:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>
                            Campaign Name: A descriptive name for your campaign
                          </li>
                          <li>
                            Description: A brief description of the campaign&apos;s
                            purpose
                          </li>
                          <li>Start Date: When the campaign will start</li>
                          <li>
                            End Date: When the campaign will end (optional)
                          </li>
                          <li>Status: Active, Paused, or Draft</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Configure lead routing</p>
                        <p className="text-sm text-muted-foreground">
                          Set up how leads from this campaign will be routed:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>Select destination webhooks</li>
                          <li>Configure lead distribution rules</li>
                          <li>Set up lead validation criteria</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        5
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          Set up tracking parameters
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Configure tracking parameters to monitor campaign
                          performance:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>UTM parameters</li>
                          <li>Custom tracking parameters</li>
                          <li>Conversion goals</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        6
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Save the campaign</p>
                        <p className="text-sm text-muted-foreground">
                          Click &quot;Save&quot; to create the campaign. You can now start
                          collecting leads for this campaign.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tracking Campaign Performance</CardTitle>
                  <CardDescription>
                    Monitor and analyze your campaign performance to optimize
                    your lead generation efforts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Viewing Campaign Analytics
                  </h3>
                  <p>
                    SyncSales provides comprehensive analytics to help you
                    understand how your campaigns are performing:
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-2">Lead Volume Metrics</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Total Leads</p>
                            <p className="text-sm text-muted-foreground">
                              The total number of leads generated by the
                              campaign.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Daily Lead Count</p>
                            <p className="text-sm text-muted-foreground">
                              The number of leads generated each day.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Lead Growth Rate</p>
                            <p className="text-sm text-muted-foreground">
                              The percentage increase in leads over time.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-2">Lead Quality Metrics</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Conversion Rate</p>
                            <p className="text-sm text-muted-foreground">
                              The percentage of leads that convert to customers.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Lead Quality Score</p>
                            <p className="text-sm text-muted-foreground">
                              A score indicating the quality of leads based on
                              predefined criteria.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Bounce Rate</p>
                            <p className="text-sm text-muted-foreground">
                              The percentage of leads that are rejected or don&apos;t
                              respond to follow-ups.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-2">Source Analysis</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Lead Sources</p>
                            <p className="text-sm text-muted-foreground">
                              Breakdown of leads by source (landing pages,
                              referrals, etc.).
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">Channel Performance</p>
                            <p className="text-sm text-muted-foreground">
                              Comparison of different marketing channels.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-medium">UTM Analysis</p>
                            <p className="text-sm text-muted-foreground">
                              Detailed breakdown of leads by UTM parameters.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">
                    Understanding Conversion Rates
                  </h3>
                  <p className="mb-4">
                    Conversion rates help you understand how effectively your
                    campaigns are turning leads into customers:
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="font-medium mb-2">
                        Types of Conversion Metrics
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">
                              Lead-to-Opportunity Conversion
                            </p>
                            <p className="text-sm text-muted-foreground">
                              The percentage of leads that become sales
                              opportunities.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">
                              Opportunity-to-Customer Conversion
                            </p>
                            <p className="text-sm text-muted-foreground">
                              The percentage of opportunities that become
                              customers.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">
                              Overall Lead-to-Customer Conversion
                            </p>
                            <p className="text-sm text-muted-foreground">
                              The percentage of leads that ultimately become
                              customers.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <h4 className="font-medium mb-2">
                        Improving Conversion Rates
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            Segment your leads to deliver more targeted
                            follow-ups.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            Optimize your lead qualification criteria to focus
                            on high-quality leads.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            Implement A/B testing on your landing pages to
                            improve initial conversion.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            Set up automated follow-up sequences to nurture
                            leads.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-md border p-4">
                    <div className="flex items-start">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Export and Share Reports</p>
                        <p className="text-sm text-muted-foreground">
                          SyncSales allows you to export campaign performance
                          reports in various formats (PDF, CSV, Excel) and share
                          them with team members or stakeholders. You can also
                          schedule automated reports to be sent via email on a
                          daily, weekly, or monthly basis.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("webhooks-api")}>
                  Previous: Webhooks & API Integration
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("introduction")}>
                  Back to Introduction
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <aside className="hidden lg:block border-l">
          <div className="sticky top-16 overflow-y-auto p-4 h-[calc(100vh-4rem)]">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">On This Page</h4>
                {activeTab === "introduction" && (
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#what-is-syncsales"
                        className="text-muted-foreground hover:text-foreground">
                        What is SyncSales?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#who-is-this-guide-for"
                        className="text-muted-foreground hover:text-foreground">
                        Who is This Guide For?
                      </Link>
                    </li>
                  </ul>
                )}

                {activeTab === "getting-started" && (
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#sign-up-log-in"
                        className="text-muted-foreground hover:text-foreground">
                        Sign Up & Log In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#complete-profile"
                        className="text-muted-foreground hover:text-foreground">
                        Complete Your Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#explore-dashboard"
                        className="text-muted-foreground hover:text-foreground">
                        Explore the Dashboard
                      </Link>
                    </li>
                  </ul>
                )}

                {activeTab === "managing-leads" && (
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#adding-leads"
                        className="text-muted-foreground hover:text-foreground">
                        Adding Leads Manually
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#importing-leads"
                        className="text-muted-foreground hover:text-foreground">
                        Importing Leads in Bulk
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#filtering-leads"
                        className="text-muted-foreground hover:text-foreground">
                        Filtering & Searching Leads
                      </Link>
                    </li>
                  </ul>
                )}

                {activeTab === "webhooks-api" && (
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#setting-up-webhooks"
                        className="text-muted-foreground hover:text-foreground">
                        Setting Up Webhooks
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#using-api"
                        className="text-muted-foreground hover:text-foreground">
                        Using SyncSales API
                      </Link>
                    </li>
                  </ul>
                )}

                {activeTab === "campaign-management" && (
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="#creating-campaign"
                        className="text-muted-foreground hover:text-foreground">
                        Creating a New Campaign
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#tracking-performance"
                        className="text-muted-foreground hover:text-foreground">
                        Tracking Campaign Performance
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-1">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      API Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Release Notes
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is available 24/7 to assist you with any
                  questions.
                </p>
                <Button size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
