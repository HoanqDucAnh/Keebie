import React from "react";
import { Breadcrumb } from "antd";
import ProdCart from "../components/shared/productComponent/ProdCart";

export default function CartScreen() {

  return (
    <div>
      <Breadcrumb
				className="ml-5 mr-5 mt-5 mb-3 font-mono"
				separator=">"
				items={[
					{
						title: "Trang chủ",
						href: "/",
					},
					{
						title: "Giỏ hàng",
						href: "/cart",
					},
				]}
			/>

      <div className="bg-white p-10 font-mono">
        <p className="text-xl">Giỏ hàng của bạn</p>
        
        <div className="flex justify-between">
          <div className="">
            <ProdCart />
            <ProdCart />
            <ProdCart />
          </div>

          <div className="">
            
          </div>
        </div>
      </div>
    </div>
  );
}

