import { connectMongoDB } from "@/lib/mongobd";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await connectMongoDB();
		const { email } = await req.json();

		const emailExists = await User.findOne({ email }).select("_id");
		return NextResponse.json({ emailExists });
	} catch (error) {
		console.log(error);
	}
}
