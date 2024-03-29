import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params: { requestId } }: { params: { requestId: string } }) {
  try {
    await _mongo.friendRequests.deleteFriendRequestByID(requestId);
    const message = "Friend Request Deleted!";
    return NextResponse.json({ message }, { status: 200, statusText: message });
  } catch (err) {
    const message = "There Was An Error Deleting That Friend Request!";
    return NextResponse.json({ message }, { status: 500, statusText: message });
  }
}
