import React, { useEffect } from "react";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpScreen from "./screen/SignUpScreen";
import NavigationBar from "./components/shared/NavigationBar";
import MyToast from "./components/shared/MyToast";

function App() {
	useEffect(() => {
		document.title = "Keebi3.";
	}, []);

	return (
		<Router>
			<NavigationBar />
			<MyToast />
			<Switch>
				{/* <Route path="/login">
					<LoginScreen />
				</Route>
				<Route path="/home">
					<HomeScreen />
				</Route>
				<Route path="/signup">
					<SignUpScreen />
				</Route> */}
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
	);
}

export default App;
