"use client";
import LogoutButton from "@/app/component/LogoutButton";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const { data: session } = useSession();
	return (
		<div className="dashboard">
			<div className="userInfo">
				<div className="userInfoItem">
					<label>First Name: </label>
					{session?.user?.fName}
				</div>
				<div className="userInfoItem">
					<label>Last Name: </label>
					{session?.user?.lName}
				</div>
				<div className="userInfoItem">
					<label>Email: </label>
					{session?.user?.email}
				</div>
			</div>
			<LogoutButton />
		</div>
	);
}
