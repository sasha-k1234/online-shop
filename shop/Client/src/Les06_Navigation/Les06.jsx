import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import List from "./List";
import Product from "./Product";
import ProductCreate from "./ProductCreate";
import NotFound from "./NotFound";
import  Registration  from "./Registration";
import ProductDetail from "./ProductDetail";
export default function Les06() {
  return (
    <div className="text-white">
      <BrowserRouter>
        <Header></Header>
        <div style={{ marginTop: "70px" }}></div>
        <Routes>
          <Route path="/" element={<Navigate to='/Product/List' />} />
          <Route path="About" element={<About />} />
          <Route path="Registration" element={<Registration/>}></Route>
          <Route path="Product">
            <Route path="" element={<Product />}></Route>
            <Route path="Detail/:id" element={<ProductDetail />} />
            <Route path="List" element={<List />} />
            <Route path="Create" element={<ProductCreate />} />
          </Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
