import React from "react";
import { Breadcrumb } from "antd";
import ProductRow from "../components/shared/productComponent/ProductRow";
import ProdCard from "../components/shared/productComponent/ProdCard";

export default function SearchScreen() {
  return (
    <div>
      <Breadcrumb
        className="mt-5 ml-5 mb-2 font-mono"
        separator=">"
        items={[
          {
            title: "Trang chủ",
            href: "/",
          },
          {
            title: "Tìm kiếm",
            href: "/search",
          }
        ]}
      />
      <div className="bg-white p-5 font-mono">
        <p className="text-2xl font-bold">Kết quả tìm kiếm</p>
      </div>
    </div>
  );
} 