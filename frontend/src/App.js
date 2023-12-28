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
import { getAllProductsAPI } from "./services/SystemServices";
import useProdOnDisplayStore from "./stores/ProdOnDisplay";

function App() {
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	const setDisplayProducts = useProdOnDisplayStore(
		(state) => state.updateAllDisplayProducts
	);

	const fetchProducts = async () => {
		const res = await getAllProductsAPI();
		if (res) {
			setDisplayProducts(res.data);
		}
	};

	useEffect(() => {
		document.title = "Keebi3.";
		fetchProducts();
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
					<Route path="/contact">
						<ContactScreen />
					</Route>
					<Route path="/profile">
						<ProfileScreen />
					</Route>
					<Route path="/admin">
						<AdminScreen />
					</Route>
					<Route path="/product">
						<ProductDetailScreen />
					</Route>
					<Route path="/product_page">
						<ProductPageScreen />
					</Route>
					<Route path="/cart">
						<CartScreen />
					</Route>
					<Route path="/404">
						<NotFoundScreen />
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
