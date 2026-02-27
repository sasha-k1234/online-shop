import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";

function ProductDetail(props) {
  const params = useParams();
  const [product,setProduct] = useState(null);
  useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res=>res.json())
            .then(json=>{
              setProduct(json)
            })
          },[])

          // const product = {
  //   id: 1,
  //   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   price: 109.95,
  //   description:
  //     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   category: "men's clothing",
  //   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   rating: { rate: 3.9, count: 120 },
  // };
  
  const calcRating =()=>{
    const ratingsArr = [];
    let countOfFilled = Math.round(product?.rating.rate);
    let countOfBlank = 5-countOfFilled;
    for(let i=0;i<countOfFilled;i++){
      ratingsArr.push(<i class="bi bi-star-fill"></i>);
    }
    for(let i=0;i<countOfBlank;i++){
      ratingsArr.push(<i class="bi bi-star"></i>);
    }
    return ratingsArr;
  } 

  return <div class="card mb-3" style={{maxWidth:"540px;",margin:"auto",marginTop:"200px"}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src={product?.image} class="img-fluid rounded-start" alt={product?.title}/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p class='card-text'><h6 class="text-body-secondary" >{product?.category}</h6></p>
        <h5 class="card-title">{product?.title}</h5>
        <p class="card-text">{product?.description}</p>
        <p class="card-text text-white"><h3 class="">{product?.price}$</h3></p>
        { <p class="card-text text-warning"><span className="text-white">rating:</span> {calcRating()}</p> }
      </div>
    </div>
  </div>
</div>
}

export default ProductDetail;
