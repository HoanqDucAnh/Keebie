import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyToast({
	type,
	message,
	position = toast.POSITION.TOP_RIGHT,
}) {
	switch (type) {
		case "success":
			toast.success(message, {
				position: position,
			});
			break;
		case "error":
			toast.error(message, {
				position: position,
			});
			break;
		case "info":
			toast.info(message, {
				position: position,
			});
			break;
		case "warn":
			toast.warn(message, {
				position: position,
			});
			break;
		default:
			toast(message, {
				position: position,
			});
			break;
	}

	return (
		<ToastContainer
			position={position}
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
}
