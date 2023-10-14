"use client";
import LoginButton from "@/app/component/LoginButton";
import Register from "@/app/component/Register";
import { useState } from "react";
import { Alert } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
	const { data: session, status } = useSession();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const router = useRouter();

	if (status === "authenticated") {
		redirect("/dashboard");
	}

	const handleEmailInput = (e) => {
		setUser({ ...user, email: e.target.value });
	};
	const handlePasswordInput = (e) => {
		setUser({ ...user, password: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user.email || !user.password) {
			setError("Please fill in all fields.");
			return;
		}

		try {
			const res = await signIn("credentials", {
				email: user.email,
				password: user.password,
				redirect: false,
			});
			if (res.error) {
				setError("Invalid Credentials");
				return;
			}
			router.push("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="main-container">
			<h1>Login Page</h1>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					{error && <Alert severity="error">{error}</Alert>}
					<label className="input-title">email</label>
					<div className="input-container">
						<input
							onChange={handleEmailInput}
							className="form-input"
							type="email"
						></input>
					</div>
					<label className="input-title">password</label>
					<div className="input-container">
						<input
							onChange={handlePasswordInput}
							className="form-input"
							type="password"
						></input>
					</div>
					<LoginButton />
				</form>
			</div>
			<div className="new-user-container">
				<div className="new-user-line"></div>
				<div className="new-user">New User?</div>
				<div className="new-user-line"></div>
			</div>
			<Register />
		</div>
	);
}
