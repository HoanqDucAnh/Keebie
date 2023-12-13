import React, { useEffect } from "react";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpScreen from "./screen/SignUpScreen";
import NavigationBar from "./components/shared/NavigationBar";
import MyToast from "./components/shared/MyToast";
import Footer from "./components/shared/Footer";
import Layout from "antd/es/layout/layout";
import NotFoundScreen from "./screen/NotFoundScreen";
import AdminScreen from "./screen/AdminScreen";

function App() {
	useEffect(() => {
		document.title = "Keebi3.";
	}, []);

	return (
		<Layout>
			<Router>
				<NavigationBar />
				<MyToast />
				<Switch>
					<Route exact path="/">
						<HomeScreen />
					</Route>
					<Route path="/login">
						<LoginScreen />
					</Route>
					<Route path="/signup">
						<SignUpScreen />
					</Route>
					<Route path="/admin">
						<AdminScreen />
					</Route>
					<Route path="*">
						<NotFoundScreen />
					</Route>
				</Switch>
			</Router>
			<Footer />
		</Layout>
	);
}

export default App;
