import React, { useEffect,useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAction, getCartAction,  handleInc,handleDec } from "../../Store/Reducer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './Cart.module.css';
import { Bounce, ToastContainer, toast } from "react-toastify";
import { postOrderAction } from "../../Store/OrderReducer";

function Cart() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.product.cart);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
  }

  const addresRef = useRef(0);
  const emailRef = useRef(0);
  const phoneRef = useRef(0);

  useEffect(() => {
    dispatch(getCartAction());
  }, []);
 
  const decrement = (product) => {
    if (product.quantity===1) {
      return;
    }
    dispatch(handleDec(product.id));
  }

  const handleOrderCreate = () => {
      const order = {
        address:addresRef.current.value,
        email:emailRef.current.value,
        phoneNumber:phoneRef.current.value,
        products:cartProducts.map((p)=>({
          title:p.product.title,
          price:p.product.price,
          quantity:p.quantity,
        })),
      }

      dispatch(postOrderAction(order));
  }

  const cartProductRows = cartProducts.map((p,index)=>(
    <tr>
      <th scope="row">{index}</th>
      <td><img style={{width:"50px"}} src={p?.product?.imagePath ?? "image"}></img></td>
      <td>{p?.product?.title ?? "product"}</td>
      <td>{p?.product?.price ?? "price"}$</td>
      <td>{p.quantity}</td>
    </tr>
  ));

    

  return (
    <div class="container mt-5 ">
      <h1 className="text-center mb-4">Your Cart</h1>
      <div class="row row-cols-md-2 g-4 justify-content-center text-center">
        {cartProducts.map((p) => (
          <div class="col">
            <div class="card shadow-sm h-100 ">
              <img
                class="card-img-top  mx-auto mt-3 rounded "
                src={p?.product?.imagePath ?? "image"}
                style={{ width: "15rem" }}
              />
              <div class="card-body  ">
                <h4 class="card-title text-center">
                  {p?.product?.title ?? "product"}
                </h4>
                <h5 className="card-text m-3">
                  {p?.product?.price ?? "price"}$
                </h5>
                <div class="d-flex justify-content-between mb-4">
                  <button onClick={()=>dispatch(handleInc(p.id))} className="btn btn-dark">
                    <i class="bi bi-plus"></i>
                  </button>
                  <h4 className="card-text ">Quantity: {p.quantity} </h4>
                  <button onClick={()=>decrement(p)} className="btn btn-dark">
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
                <button
                  onClick={() => dispatch(deleteAction(p.id))}
                  class="btn btn-danger"
                >
                  <i class="bi bi-trash "></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class='card-body '>
            <div class='mb-2'>
            <label for="input1" class="form-label fw-medium">
                Adress {<i class="bi bi-truck fs-5"></i>}
              </label>
              <input
                type="text"
                class="form-control"
                name="address"
                ref={addresRef}
              />
            </div>
            <div class='mb-3'>
            <label for="input2" class="form-label fw-medium">
                Email {<i class="bi bi-envelope fs-5"></i>}
              </label>
              <input
              
                type="email"
                class="form-control"
                name="email"
                ref={emailRef}
              />
            </div>
            <div class='mb-3'>
            <label for="input3" class="form-label fw-medium">
                Total {<i class="bi bi-cash fs-5"></i>}
              </label>
              <input
               
                type="text"
                class="form-control mb-3"
                name="price"
                defaultValue={cartProducts.reduce((acc,cur)=>acc+cur?.product?.price??0*cur?.quantity??0,0)} 
                readOnly
              />
              <label for="input2" class="form-label fw-medium">
                Phone 
              </label>
              <input
              
                type="tel"
                class="form-control"
                name="phoneNumber"
                ref={phoneRef}
              />
            </div>
            
            <div className="text-center">
              <img style={{width:"18rem"}} className="rounded"></img>
            </div>
        </div>
        <table className="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    {cartProductRows}
  </tbody>
</table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>  
          
          <Button variant="dark" onClick={handleOrderCreate}>
            Checkout
          </Button>
        
        </Modal.Footer>
      </Modal>
      <button  className={`btn btn-dark ${style.orderBtn}`} onClick={handleShow}><i class="bi bi-bag-check fs-5"></i></button>
      <ToastContainer
            type="error"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
    </div>
  );
}

export default Cart;
