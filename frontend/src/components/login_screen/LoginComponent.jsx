import React, { useState } from "react";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		if (e.target.name === "username") {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
		console.log(username, password);
	};

	return (
		<div className="bg-gray-100 flex justify-center items-center h-screen">
			<div className="w-1/2 h-screen hidden lg:block">
				<img
					src="https://keebsforall.com/cdn/shop/products/Zoom65_1.webp?v=1674710934&width=2048"
					alt="Placeholder Image"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 font-mono">
				<h1 className="text-2xl font-semibold mb-4">Login</h1>
				<form>
					<div className="mb-4">
						<label for="username" className="block text-gray-600">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
							autocomplete="off"
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label for="password" className="block text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
							autocomplete="off"
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							id="remember"
							name="remember"
							className="text-black"
						/>
						<label for="remember" className="text-gray-600 ml-2">
							Remember Me
						</label>
					</div>

					<div className="mb-6 text-black">
						<a href="#" className="hover:underline">
							Forgot Password?
						</a>
					</div>

					<button
						type="submit"
						className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
					>
						Login
					</button>
				</form>
				<div className="mt-6 text-black-500 text-center">
					<a href="/signup" className="hover:underline">
						Sign up Here
					</a>
				</div>
			</div>
		</div>
	);
}
