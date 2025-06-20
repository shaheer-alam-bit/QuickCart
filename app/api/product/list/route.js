import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    await connectDB();

    const products = await Product.find();
    if (!products || products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No products found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Products fetched successfully.",
      products,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
