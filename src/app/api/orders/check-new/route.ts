import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) return NextResponse.json({ count: 0 });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const count = await db.order.count({
    where: {
      restaurantId,
      status: "PENDING",
      createdAt: { gte: startOfDay },
    },
  });

  return NextResponse.json({ count });
}
