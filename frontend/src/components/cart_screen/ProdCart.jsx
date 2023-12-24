import React from "react";
import { InputNumber } from "antd";

export default function ProdCart({
	id,
	name,
	price,
	instock,
	quantity,
	image,
}) {
	return (
		<div className="flex flex-row my-6 flex-wrap">
			<img src="https://picsum.photos/200" alt="" className="w-24 h-24" />
			<div className="ml-5 basis-2/5 m-auto">
				<p className="text-xl">asdf</p>
				<p className="text-lg">Giá: </p>
				<p className="">Còn lại: 6 sản phẩm</p>
			</div>
			<div className="mr-5 flex basis-2/5 justify-end m-auto">
				<div>
					<p className="text-xl text-center">Số lượng</p>
					<InputNumber min={1} max={instock} defaultValue={1} />
				</div>
			</div>
		</div>
	);
}
