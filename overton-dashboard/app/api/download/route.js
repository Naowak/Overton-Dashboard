import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const fileId = "1E6IlvupLPyDGZBkAMS5cawdvcaeAAaoU"; // Replace with your Google Drive file ID
    const googleDriveLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Fetch the file from Google Drive
    const response = await axios.get(googleDriveLink, { responseType: "arraybuffer" });
    
    // Convert the array buffer to a string (assuming the file is JSON)
    const data = Buffer.from(response.data, "binary").toString("utf-8");

    // Send the JSON data back to the client
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }

}
