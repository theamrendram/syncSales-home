import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data", data);

  try {
    const res = await axios.post(
      "https://script.google.com/macros/s/AKfycbyak4XxqVfH9HFBHGXD5SpXqkQpZ6VIN0aKN9TdUc5cKexjl-2DDip-WQgULZeFllM/exec",
      {
        Email: data.email,
        Date: new Date().toISOString(),
      }
    );
    console.log("res", res);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ data });
}
