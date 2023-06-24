import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;
//   console.log(method);
//   switch (method) {
//     case "GET": {
//       await GET(req, res);
//       return;
//     }
//     case "POST": {
//       await POST(req, res);
//       return;
//     }
//     case "PUT": {
//       await PUT(req, res);
//       return;
//     }
//     case "DELETE": {
//       await DELETE(req, res);
//       return;
//     }
//     default: {
//       res.status(405).json({ message: "Request Type Not Allowed" });
//       return;
//     }
//   }
// }

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.cookies);
  const user = await _mongo.user.retrieveUser("justindanielclark@gmail.com", "google");
  return NextResponse.json({ user });
}
export async function POST(req: Request, res: Response) {
  const user = await _mongo.user.retrieveUser("justindanielclark@gmail.com", "google");
  console.log(user);
  return NextResponse.json({ user });
}
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const result = await _mongo.user.updateUserWatchedList(data.lookup, data.movies);
    return NextResponse.json({ message: "Success" });
  } catch {}
}
export async function DELETE(req: Request, res: Response) {
  const user = await _mongo.user.retrieveUser("justindanielclark@gmail.com", "google");
  console.log(user);
  return NextResponse.json({ user });
}
