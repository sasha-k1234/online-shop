import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProductDelete, handleProductEditing } from "../../Store/Reducer";
import { getProductsAction } from "../../Store/Reducer";
import { useState,useRef,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ProductsTable() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [preview,setPreview] = useState();
    const [file,setFile] = useState();
    const [product,setProduct] = useState();
   
    const products = useSelector((state) => state.product.products);
    const photoUrl = useSelector((state) => state.auth.photoUrl);

    useEffect(() => {
        dispatch(getProductsAction());
    }, []);

    const titleRef = useRef(0);
    const descriptionRef = useRef(0);
    const priceRef = useRef(0);
    const fileRef = useRef(0);
   

    const deleteProduct = (id) => {
        dispatch(handleProductDelete(id));
    }
    
    

    const handleClose = () => setShow(false);
    const handleShow = (product) => {setShow(true)
      setProduct(product)
    }

    const handleFile = (e) => {
      if (e.target.files) {

        setFile(e.target.files[0]);
       
        setPreview(URL.createObjectURL(e.target.files[0]));
        
      }
    };


    const handleEditing = () => {
      const editProduct = {
        title:titleRef.current.value,
        price:priceRef.current.value,
        description:descriptionRef.current.value,
        file:file,
        _id:product._id,
      }
      dispatch(handleProductEditing(editProduct));
    }
    
  const productRows = products.map((p, index) => (
    <tr>
      <th scope="row">{index}</th>
      <td>{p.title}</td>
      <td>{p.price}$</td>
      <td>{p.description}</td>
      <td>
        <img style={{ width: "50px" }} src={p.imagePath}></img>
        {/* {p.image} */}
      </td>
      <td>
        <button className="btn btn-outline-danger me-3" onClick={()=>deleteProduct(p._id)}>
          <i class="bi bi-trash"></i>
        </button>
        <button className="btn btn-outline-secondary" onClick={()=>handleShow(p)}>
          <i class="bi bi-pencil-fill"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Num</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>{productRows}</tbody>
      </table>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class='card-body'>
            <div class='mb-3'>
            <label for="input1" class="form-label fw-medium">
                Title
              </label>
              <input
                type="text"
                class="form-control"
                name="title"
                ref={titleRef}
                defaultValue={product?.title}
              />
            </div>
            <div class='mb-3'>
            <label for="input2" class="form-label fw-medium">
                Description
              </label>
              <input
                ref={descriptionRef}
                type="text"
                class="form-control"
                name="description"
                defaultValue={product?.description}
              />
            </div>
            <div class='mb-3'>
            <label for="input3" class="form-label fw-medium">
                Price
              </label>
              <input
                ref={priceRef}
                type="text"
                class="form-control"
                name="price"
                defaultValue={product?.price}
              />
            </div>
            <div class='mb-4'>
            <label for="input4" class="form-label fw-medium">
                Image
              </label>
              <input
                onChange={handleFile}
                ref={fileRef}
                type="file"
                class="form-control"
                name="file"
              
              />
            </div>
            <div className="text-center mb-3">
              <img src={product?.imagePath} style={{width:"18rem"}} className="rounded"></img>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>  
          
          <Button variant="dark" onClick={handleEditing}>
            Save Changes
          </Button>
        
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductsTable;
