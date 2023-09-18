import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// CORSを許可するヘッダーを定義する
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONSリクエストに対応する
export function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POSTリクエストに対応する
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // リクエストボディから商品IDを取得する
  const { productIds } = await req.json();

  // productIdsがない場合はエラーを返す
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // productIdsから商品情報を取得する
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Stripe Checkoutのセッションを作成する
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // 商品情報からStripe Checkoutのセッションの商品情報を作成する
  products.forEach((product) => {
    //line_itemsに商品情報を追加する
    line_items.push({
      price_data: {
        currency: "JPY",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber(),
      },
      quantity: 1,
    });
  });

  // Prismaに注文情報を作成する
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false, //Checkoutのみで決済はされていない
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });
  // Stripe Checkoutのセッションを作成する
  // Stripeのメタデータに注文IDを設定する
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
