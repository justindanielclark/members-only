import _mongo from "@/lib/mongoDB/_mongo";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest, { params: { requestId } }: { params: { requestId: string } }) {
  try {
    const result = await _mongo.friendRequests.deleteFriendRequestByID(requestId);
    const message = "Message Retracted!";
    return NextResponse.json({ message }, { status: 200, statusText: message });
  } catch (err) {
    const message = "There was an error retracting that request";
    return NextResponse.json({ message }, { status: 500, statusText: message });
  }
}
