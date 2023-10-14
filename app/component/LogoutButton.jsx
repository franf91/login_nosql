"use client";
import { signOut } from "next-auth/react";
export default function LogoutButton() {
	return (
		<div>
			<button
				onClick={() => signOut({ callbackUrl: "/login" })}
				className="auth-button logout"
			>
				Logout
			</button>
		</div>
	);
}
