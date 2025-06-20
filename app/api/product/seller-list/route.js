import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
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
  const isSeller = await authSeller(userId);

  if (!isSeller) {
    return NextResponse.json({
      success: false,
      message: "You are not authorized to view products",
    });
  }

  try {
    await connectDB();

    const products = await Product.find({ userId });
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
