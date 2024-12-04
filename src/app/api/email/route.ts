import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data", data);

  // Get the user's IP address
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"; // Default to localhost if no IP found

  // Fetch the location data using ip-api
  let location = null;
  try {
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    location = locationResponse.data;
  } catch (err:any) {
    console.log("Error fetching location data:", err.message);
  }

  // Log the IP and location data
  console.log("IP Address:", ip);
  console.log("Location Data:", location);

  // Send data to the external API (Google Apps Script URL)
  try {
    const res = await axios.post(
      "https://script.google.com/macros/s/AKfycbyak4XxqVfH9HFBHGXD5SpXqkQpZ6VIN0aKN9TdUc5cKexjl-2DDip-WQgULZeFllM/exec",
      {
        Email: data.email,
        Date: new Date().toISOString(),
        ip: ip,
        location: location
          ? `${location.city}, ${location.regionName}, ${location.country}`
          : "Unknown",
      }
    );
    console.log("Response from external API:", res.data);
  } catch (err : any) {
    console.log("Error sending data to external API:", err.message);
  }

  // Return the collected data as a response
  return NextResponse.json({
    email: data.email,
    ip: ip,
    location: location || "Location not available",
  });
}
