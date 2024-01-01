import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Footer from "./components/shared/Footer";
import NavigationBar from "./components/shared/NavigationBar";

const HomeScreen = lazy(() => import("./screen/HomeScreen"));
const LoginScreen = lazy(() => import("./screen/LoginScreen"));
const SignUpScreen = lazy(() => import("./screen/SignUpScreen"));
const MyToast = lazy(() => import("./components/shared/MyToast"));
const NotFoundScreen = lazy(() => import("./screen/NotFoundScreen"));
const ContactScreen = lazy(() => import("./screen/ContactScreen"));
const ProfileScreen = lazy(() => import("./screen/ProfileScreen"));
const AdminScreen = lazy(() => import("./screen/AdminScreen"));
const ProductDetailScreen = lazy(() =>
	import("./components/shared/productComponent/ProductDetail")
);
const ProductPageScreen = lazy(() => import("./screen/ProductPageScreen"));
const CartScreen = lazy(() => import("./screen/CartScreen"));
const PaymentScreen = lazy(() => import("./screen/PaymentScreen"));

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
						<Suspense fallback={<div>Loading...</div>}>
							<LoginScreen />
						</Suspense>
					</Route>
					<Route path="/signup">
						<Suspense fallback={<div>Loading...</div>}>
							<SignUpScreen />
						</Suspense>
					</Route>
					<Route path="/contact">
						<Suspense fallback={<div>Loading...</div>}>
							<ContactScreen />
						</Suspense>
					</Route>
					<Route path="/profile">
						<Suspense fallback={<div>Loading...</div>}>
							<ProfileScreen />
						</Suspense>
					</Route>
					<Route path="/admin">
						<Suspense fallback={<div>Loading...</div>}>
							<AdminScreen />
						</Suspense>
					</Route>
					<Route path="/product/:id">
						<Suspense fallback={<div>Loading...</div>}>
							<ProductDetailScreen />
						</Suspense>
					</Route>
					<Route path="/product_page">
						<Suspense fallback={<div>Loading...</div>}>
							{" "}
							<ProductPageScreen />
						</Suspense>
					</Route>
					<Route path="/cart">
						<Suspense fallback={<div>Loading...</div>}>
							<CartScreen />
						</Suspense>
					</Route>
					<Route path="/payment">
						<Suspense fallback={<div>Loading...</div>}>
							<PaymentScreen />
						</Suspense>
					</Route>
					<Route path="/404">
						<Suspense fallback={<div>Loading...</div>}>
							<NotFoundScreen />
						</Suspense>
					</Route>
					<Route exact path="/">
						<Suspense fallback={<div>Loading...</div>}>
							<HomeScreen />
						</Suspense>
					</Route>
					<Route path="*">
						<Suspense fallback={<div>Loading...</div>}>
							<NotFoundScreen />
						</Suspense>
					</Route>
				</Switch>
				<Footer />
			</Layout>
		</Router>
	);
}

export default App;
