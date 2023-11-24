import React, { useEffect } from "react";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import {
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom/cjs/react-router-dom";

function App() {
	useEffect(() => {
		document.title = "Keebi3.";
	}, []);

	return (
		// <div>
		// 	<HomeScreen />
		// </div>
		<Router>
			<Switch>
				<Route path="/login">
					<LoginScreen />
				</Route>
				<Route path="/">
					<HomeScreen />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
