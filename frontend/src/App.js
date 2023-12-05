import React, { useEffect } from "react";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpScreen from "./screen/SignUpScreen";
import NavigationBar from "./components/shared/NavigationBar";
import MyToast from "./components/shared/MyToast";
import Footer from "./components/shared/Footer";
import Layout from "antd/es/layout/layout";

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
				<Route path={"/"} exact>
					<HomeScreen />
				</Route>
				<Route path={"/login"} exact>
					<LoginScreen />
				</Route>
				<Route path={"/signup"} exact>
					<SignUpScreen />
				</Route>
			</Switch>
			</Router>
			<Footer />
		</Layout>
	);
}

export default App;
