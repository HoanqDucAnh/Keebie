import React from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError, isFormInvalid } from "../../../utils/validations";

export const Input = ({ label, type, id, placeholder }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, label);
	const isInvalid = isFormInvalid(inputError);

	return (
		<div className="mb-4 flex flex-col gap-2">
			<div className="flex justify-between ">
				<label htmlFor={id} className="block text-gray-600">
					{label}
				</label>
				<AnimatePresence mode="wait" initial={false}>
					{isInvalid && (
						<InputError
							message={inputError.error.message}
							key={inputError.error.message}
						/>
					)}
				</AnimatePresence>
			</div>
			<input
				type={type}
				id={id}
				className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]"
				placeholder={placeholder}
				{...register(label, {
					required: {
						value: true,
						message: `Không được để trống`,
					},
				})}
			/>
		</div>
	);
};

const InputError = ({ message }) => {
	return (
		<motion.p
			className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
			{...framer_error}
		>
			<MdError />
			{message}
		</motion.p>
	);
};

const framer_error = {
	initial: {
		opacity: 0,
		y: 15,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: 15,
	},
	transition: {
		duration: 0.2,
	},
};
