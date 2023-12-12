import React, { useEffect } from "react";
import LoginComponent from "../components/login_screen/LoginComponent";
import { useHistory } from "react-router-dom";

export default function LoginScreen() {
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			history.push("/");
		}
	}, []);

	return (
		<>
			<LoginComponent />
		</>
	);
}
