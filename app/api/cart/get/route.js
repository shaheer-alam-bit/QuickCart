import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({
      success: true,
      cartItems: user.cartItems,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
