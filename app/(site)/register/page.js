"use client";
import RegisterButton from "@/app/component/RegisterButton";
import React, { useState } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Register() {
	const { data: session, status } = useSession();

	const [user, setUser] = useState({
		fName: "",
		lName: "",
		email: "",
		password: "",
		passwordAgain: "",
	});

	const [error, setError] = useState("");

	const router = useRouter();

	if (status === "authenticated") {
		redirect("/dashboard");
	}

	const handleFirstNameInput = (e) => {
		setUser({ ...user, fName: e.target.value });
	};

	const handleLastNameInput = (e) => {
		setUser({ ...user, lName: e.target.value });
	};

	const handleEmailInput = (e) => {
		setUser({ ...user, email: e.target.value });
	};
	const handlePasswordInput = (e) => {
		setUser({ ...user, password: e.target.value });
	};
	const handlePasswordAgainInput = (e) => {
		setUser({ ...user, passwordAgain: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!user.fName ||
			!user.lName ||
			!user.email ||
			!user.password ||
			!user.passwordAgain
		) {
			setError("Please fill in all fields.");
			return;
		} else if (user.password != user.passwordAgain) {
			setError("Passwords dont match");
			return;
		}

		try {
			const resUserExists = await fetch("../../api/userExists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const { emailExists } = await resUserExists.json();

			if (emailExists) {
				setError("User already exists");
				return;
			}

			const res = await fetch("../../api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (res.ok) {
				const form = e.target;
				form.reset();
				router.push("/");
			} else {
				console.log("User registration failed.");
			}
		} catch (error) {
			console.log("Error during registration: ", error);
		}
	};

	return (
		<div className="main-container">
			<h1>Register</h1>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					{error && <Alert severity="error">{error}</Alert>}
					<label className="input-title">first name</label>
					<div className="input-container">
						<input
							onChange={handleFirstNameInput}
							className="form-input"
							type="text"
						></input>
					</div>
					<label className="input-title">last name</label>
					<div className="input-container">
						<input
							onChange={handleLastNameInput}
							className="form-input"
							type="text"
						></input>
					</div>
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
					<label className="input-title">password again</label>
					<div className="input-container">
						<input
							onChange={handlePasswordAgainInput}
							className="form-input"
							type="password"
						></input>
					</div>
					<RegisterButton />
				</form>
			</div>
		</div>
	);
}
