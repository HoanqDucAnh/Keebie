import React, { useState } from "react";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getAllCategoriesAPI } from "../../../services/AdminServices";

export default function TagSection({ onChange }) {
	const [options, setOptions] = useState([]);

	const handleClickGetAllCategories = async () => {
		let respond = await getAllCategoriesAPI();
		if (respond) {
			if (respond.status === 200) {
				let temp = [];
				respond.data.forEach((element) => {
					temp.push({ value: element.cat_name, id: element.id });
				});
				setOptions(temp);
			} else {
				toast.error(`Lấy danh sách thể loại thất bại, ${respond.data.message}`);
			}
		}
	};

	function findIdbyValue(findId, value) {
		return findId == value;
	}

	const handleChange = (value) => {
		let findedObject = options.find((element) =>
			findIdbyValue(element.value, value)
		);
		if (findedObject) {
			let option_id = findedObject.id;
			onChange(option_id);
		}
	};

	return (
		<div>
			<Select
				mode="tags"
				style={{
					width: "100%",
				}}
				onChange={handleChange}
				options={options}
				onClick={async () => handleClickGetAllCategories()}
			/>
		</div>
	);
}
