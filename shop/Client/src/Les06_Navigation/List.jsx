import React, { useEffect, useState } from "react";
import Product from "./Product";
import { json } from "react-router-dom";
export default function List() {
  const [product, setProduct] = useState([]);
  const [btnState,setBtnState] = useState(false);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        
      });
  }, []);
  const sortByLowest = ()=>{
    fetch('https://fakestoreapi.com/products?sort=desc')
            .then(res=>res.json())
            .then(json=>setProduct(json))
            setBtnState(true);
  }
  const sortByHighest = ()=>{
    fetch('https://fakestoreapi.com/products?sort=asc')
    .then(res=>res.json())
    .then(json=>{setProduct(json)

    setBtnState(false);
  }
  return (
    <div>
      <div class="btn-group m-3 " role="group">
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          checked={btnState}
        />
        <label class="btn btn-outline-primary" for="btnradio1" onClick={sortByLowest}>
          Lowest
        </label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          checked={!btnState}
        />
        <label class="btn btn-outline-primary" for="btnradio2" onClick={sortByHighest}>
          Highest
        </label>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {product.map((obj) => (
          <Product product={obj}></Product>
        ))}
      </div>
    </div>
  );
}
