export const converImageToBinary = (image) => {
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onloadend = () => {
		return reader.result;
	};
};
