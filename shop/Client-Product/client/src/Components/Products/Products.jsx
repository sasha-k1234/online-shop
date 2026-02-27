import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, getProductsAction } from "../../Store/Reducer";
import { Link,NavLink } from 'react-router-dom';
function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  const productCards = products.map((el) => (
    <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 py-3">
        <h2 class="display-5">{el.title}</h2>
        <p class="lead">{el.description}</p>
        <p class='lead'>{el.price}$</p>
      </div>
      <img
        src={el.imagePath}
        class="shadow-sm mx-auto"
        style={{ width: "80%", height: "300px", borderRadius: "21px 21px 0 0" }}
      ></img>
    </div>
  ));

  // const result = [];
  // for (let i = 0; i < productCards.length; i+=2) {
  //   result.push(<div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
  //     {productCards[i]}
  //     {productCards[i+1]}
  //   </div>)
  
  const addToCart = (productId) =>{
    dispatch(addToCartAction(productId))
  }
  return (
    <main>
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
        <div class="col-md-6 p-lg-5 mx-auto my-5">
          <h1 class="display-3 fw-bold">Browse our products</h1>
          <h3 class="fw-normal text-muted mb-3">
            Build anything you want with Aperture
          </h3>
          {/* <div class="d-flex gap-3 justify-content-center lead fw-normal">
            <a class="icon-link" href="#">
              Learn more
              <svg class="bi">
                <use href="#chevron-right"></use>
              </svg>
            </a>
            <a class="icon-link" href="#">
              Buy
              <svg class="bi">
                <use href="#chevron-right"></use>
              </svg>
            </a>
          </div> */}
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
      </div> */}

      <div class="container mt-5">
        <div class="row row-cols-md-2 g-4">
          {/* {productCards} */}
          {products.map((p) => (
            <div class="col">
              <div class="card shadow-sm h-100 ">
                <img
                  class="card-img-top mx-auto mt-3"
                  src={p.imagePath}
                  style={{ width: "18rem" }}
                />
                <div class="card-body text-center">
                  <h4 class="card-title">{p.title}</h4>
                  <p class="card-text fs-5">{p.description}</p>
                  <h3 className='card-text'>{p.price}$</h3>
                  <button onClick={()=>addToCart(p._id)}   class="btn btn-dark fw-medium"><i class="bi bi-bag-plus-fill"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p class="col-md-4 mb-0 text-body-secondary">© 2024 Store, Inc</p>
      <h2 class='text-body-secondary'><i class="bi bi-shop-window fs-2"></i></h2>
      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
      </ul>
    </footer>
    </main>
  );
}

export default Products;
