import React from "react";
import { ConfigProvider } from "antd";
import { Input } from "antd";

const { Search } = Input;

export default function SearchDrawer() {
	const onSearch = () => {
		window.location.href = "/search";
	}

	return (
		<ConfigProvider theme={{token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' }}}>
			<a className="hover:text-[#FFF5D6] font-bold text-3xl font-mono" href="/">
					Keebi3.
			</a>
			<Search
				placeholder="Nhập từ khóa tìm kiếm"
				onSearch={onSearch}
				style={{
					width: 1000,
					paddingLeft: 200
      	}}
				size="large"
    	/>
		</ConfigProvider>
	);
}