import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
export async function POST(request: NextRequest) {
  const { userId, getToken } = await auth();
  const token = await getToken();
  console.log("getToken", token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Handle FormData from the frontend
    const formData = await request.formData();
    const organizationName = formData.get("organizationName") as string;
    const description = formData.get("description") as string;
    const organizationLogo = formData.get("organizationLogo") as File | null;

    // Create FormData for backend API
    const backendFormData = new FormData();
    backendFormData.append("organizationName", organizationName);
    backendFormData.append("description", description);

    if (organizationLogo && organizationLogo.size > 0) {
      backendFormData.append("organizationLogo", organizationLogo);
    }

    console.log("backendFormData", backendFormData);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/org`,
      backendFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log("Organization creation error:", error);
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Organization creation failed",
      },
      { status: error.response?.status || 500 },
    );
  }
}
