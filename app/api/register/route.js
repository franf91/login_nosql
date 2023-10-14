import { connectMongoDB } from "@/lib/mongobd";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
	try {
		const { fName, lName, email, password } = await req.json();

		const hashedPassword = await bcrypt.hash(password, 10);

		await connectMongoDB();

		await User.create({ fName, lName, email, password: hashedPassword });

		return NextResponse.json({ message: "User registered." }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while registering user." },
			{ status: 500 }
		);
	}
}
