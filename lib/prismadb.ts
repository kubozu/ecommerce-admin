import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
//開発環境用
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
