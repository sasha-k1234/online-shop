import React, { useEffect, useRef, useState } from "react";
import style from "./ProductCreate.module.css";
import { json } from "react-router-dom";
import { Toast } from "bootstrap";
import Product from "./Product";

export default function ProductCreate() {
  const [newProduct, setNewProduct] = useState(null);
  
  const inputRef0 = useRef(0);
  const inputRef1 = useRef(0);
  const inputRef2 = useRef(0);
  const inputRef3 = useRef(0);
  const inputRef4 = useRef(0);
  const toast = useRef(0);

  const createProduct = (e) => {
    e.preventDefault();

    const title = inputRef0.current.value;
    const price = inputRef1.current.value;
    const description = inputRef2.current.value;
    const image = inputRef3.current.value;
    const category = inputRef4.current.value;

    const obj ={
      title:  title ,
      price:  price ,
      description:  description ,
      image:  image ,
      category:  category ,
    }

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title:  title ,
        price:  price ,
        description:  description ,
        image:  image ,
        category:  category ,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const toastBootstrap = Toast.getOrCreateInstance(toast.current);
        toastBootstrap.show();
        productChange();
        inputRef0.current.value='';
        inputRef1.current.value='';
        inputRef2.current.value='';
        inputRef3.current.value='';
        inputRef4.current.value='';
      });
    
  };
 
  const productChange=()=>{
   const obj = {title:inputRef0.current.value
      ,price:inputRef1.current.value
      ,description:inputRef2.current.value,
      category:inputRef4.current.value,
      image:inputRef3.current.value}
      setNewProduct(obj);
  }
  
  return (
    <div className="container mt-3 ">
      <div className="row justify-content-center">
        <div className={`col-md-5 ${style.customContainer}`}>
          <form onSubmit={createProduct}>
            <div className="form-group mb-3">
              <h1 className="fs-4 text-center fw-medium">
                Create Your Own Product
              </h1>
              <label className="fw-semibold " for="input1">
                Title
              </label>
              <input
               
                ref={inputRef0}
                type="text"
                className="form-control"
                id="input1"
                placeholder="Your Title"
                name="title"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-semibold" for="input2">
                Price
              </label>
              <input
               
                ref={inputRef1}
                type="text"
                className="form-control"
                id="input2"
                placeholder="Your Price"
                name="price"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-semibold" for="input3">
                Description
              </label>
              <input
               
                ref={inputRef2}
                type="text"
                className="form-control"
                id="input3"
                placeholder="Your Description"
                name="description"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label className="fw-semibold" for="input4">
                Image
              </label>
              <input
                ref={inputRef3}
                type="text"
                class="form-control"
                id="input4"
                placeholder="Image Link"
                name="image"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label className="fw-semibold" for="input5">
                Category
              </label>
              <input
                ref={inputRef4}
                type="text"
                className="form-control"
                id="input5"
                placeholder="Your Category"
                name="category"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                class="btn btn-primary fw-semibold "
                
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div ref={toast} class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="me-auto">alert</strong>
    <small class="text-body-secondary">now</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    You have succesfully created product!
  </div>
</div>
     <Product product={newProduct===null?{}:newProduct} style={{display:newProduct===null?'none':'inline-block'}} ></Product> 
    </div>
  );
}
