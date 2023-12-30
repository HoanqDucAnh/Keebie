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
import ContactScreen from "./screen/ContactScreen";
import ProfileScreen from "./screen/ProfileScreen";
import AdminScreen from "./screen/AdminScreen";
import ProductDetailScreen from "./components/shared/productComponent/ProductDetail";
import ProductPageScreen from "./screen/ProductPageScreen";
import CartScreen from "./screen/CartScreen";
import PaymentScreen from "./screen/PaymentScreen";
import SearchScreen from "./screen/SearchScreen";

function App() {
	useEffect(() => {
		document.title = "Keebi3.";
	}, []);

	return (
		<Router>
			<Layout>
				<NavigationBar />
				<MyToast />
				<Switch>
					<Route path="/login">
						<LoginScreen />
					</Route>
					<Route path="/signup">
						<SignUpScreen />
					</Route>
					<Route path="/contact">
						<ContactScreen />
					</Route>
					<Route path="/profile">
						<ProfileScreen />
					</Route>
					<Route path="/admin">
						<AdminScreen />
					</Route>
					<Route path="/product/:id">
						<ProductDetailScreen />
					</Route>
					<Route path="/product_page">
						<ProductPageScreen />
					</Route>
					<Route path="/cart">
						<CartScreen />
					</Route>
					<Route path="/payment">
						<PaymentScreen />
					</Route>
					<Route path="/404">
						<NotFoundScreen />
					</Route>
					<Route path="/search">
						<SearchScreen />
					</Route>
					<Route exact path="/">
						<HomeScreen />
					</Route>
					<Route path="*">
						<NotFoundScreen />
					</Route>
				</Switch>
				<Footer />
			</Layout>
		</Router>
	);
}

export default App;
