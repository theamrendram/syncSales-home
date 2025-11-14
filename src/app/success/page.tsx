import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
const SuccessPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-400">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Success</CardTitle>
          <CardDescription className="text-md text-gray-500">
            Your free trial has been started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can now start using the syncsales dashboard.</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://dashboard.syncsales.tech" target="_blank">
              <ExternalLink className="h-4 w-4" />
              Go to Dashboard{" "}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
