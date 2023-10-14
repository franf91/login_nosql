"use client";
import Login from "./component/Login";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		redirect("/dashboard");
	}

	return (
		<div className="index">
			<Login />
		</div>
	);
}
