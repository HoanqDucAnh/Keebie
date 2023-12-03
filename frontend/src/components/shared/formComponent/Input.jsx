import React from "react";

export const Input = ({ label, type, id, placeholder }) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-gray-600">
				{label}
			</label>
			<input
				type={type}
				id={id}
				className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
				placeholder={placeholder}
			/>
		</div>
	);
};

const InputError = () => {
	return <div>error</div>;
};

const framer_error = {
	initial: {
		opacity: 0,
		y: 10,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: 10,
	},
	transition: {
		duration: 0.2,
	},
};
