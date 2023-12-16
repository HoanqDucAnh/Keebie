import React from "react";
import { Breadcrumb } from 'antd';

export default function ProductPageScreen() {
    return (
        <div className="m-5">
        <Breadcrumb className="mb-3 font-mono" separator=">"
            items={[
            {
                title: 'Trang chủ',
                href: '/',
            },
            {
                title: 'Danh mục sản phẩm',
                href: '/product_page',
            },
            ]}
        />
        

        </div>
    );
}