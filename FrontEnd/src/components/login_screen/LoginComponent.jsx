import React from "react";

export default function LoginScreen() {
	return (
		<div class="bg-gray-100 flex justify-center items-center h-screen">
			<div class="w-1/2 h-screen hidden lg:block">
				<img
					src="https://keebsforall.com/cdn/shop/products/Zoom65_1.webp?v=1674710934&width=2048"
					alt="Placeholder Image"
					class="object-cover w-full h-full"
				/>
			</div>

			<div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 font-mono">
				<h1 class="text-2xl font-semibold mb-4">Login</h1>
				<form action="#" method="POST">
					<div class="mb-4">
						<label for="username" class="block text-gray-600">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
							autocomplete="off"
						/>
					</div>

					<div class="mb-4">
						<label for="password" class="block text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
							autocomplete="off"
						/>
					</div>

					<div class="mb-4 flex items-center">
						<input
							type="checkbox"
							id="remember"
							name="remember"
							class="text-black"
						/>
						<label for="remember" class="text-gray-600 ml-2">
							Remember Me
						</label>
					</div>

					<div class="mb-6 text-black">
						<a href="#" class="hover:underline">
							Forgot Password?
						</a>
					</div>

					<button
						type="submit"
						class="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
					>
						Login
					</button>
				</form>
				<div class="mt-6 text-black-500 text-center">
					<a href="#" class="hover:underline">
						Sign up Here
					</a>
				</div>
			</div>
		</div>
	);
}
