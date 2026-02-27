import React from 'react'
import { Link,NavLink } from 'react-router-dom';
export default function Product(props) {
  const name = props.product.title;
  const image = props.product.image;
  const descr = props.product.description;
  const price = props.product.price;
  const id = props.product.id;

  
  return (
    <div>
       <div class="card h-100">
    <img src={image} class="card-img-top" style={{width:"180px"}} alt={name}/>
    <div class="card-body">
      <h5 class="card-title">{name}</h5>
      <p class="card-text">{descr}</p>
      <p class="card-text"><h3 class="text-body-secondary">{price}$</h3></p>
      <Link className='btn btn-info fw-medium ' to={`/Product/Detail/${id}`} >More Info</Link>
    </div>
  </div>
    </div>
  )
}
