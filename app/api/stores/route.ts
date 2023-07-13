import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    // console.log("[Request]", req.json());
    //ユーザーIDをclerkから取得
    const { userId } = auth();
    // type SignedInAuthObject = {
    //     sessionClaims: JwtPayload;
    //     sessionId: string;
    //     session: Session | undefined;
    //     actor: ActClaim | undefined;
    //     userId: string;
    //     user: User | undefined;
    //     orgId: string | undefined;
    //     orgRole: string | undefined;
    //     orgSlug: string | undefined;
    //     organization: Organization | undefined;
    //     getToken: ServerGetToken;
    //     debug: AuthObjectDebug;
    // };

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //Create storeのフォームを取得
    const body = req.json();
    //E-commerceのnameを取得
    const { name } = await body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
