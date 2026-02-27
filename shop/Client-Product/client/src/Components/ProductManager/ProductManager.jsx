import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductsAction, handleProductImage } from "../../Store/Reducer";


function ProductManager() {
  const dispatch = useDispatch();
  const photoUrl = useSelector((state) => state.auth.photoUrl);
  
  const titleRef = useRef(0);
  const descriptionRef = useRef(0);
  const priceRef = useRef(0);
  const imageRef = useRef(0);

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  

  const handleFile = (e) => {
    if (e.target.files) {
      
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  
   
  const product = {
    title:titleRef.current.value,
    description:descriptionRef.current.value,
    price:priceRef.current.value,
    file:file,
  }


  const addProduct = () => {
    dispatch(addProductsAction(product));
    titleRef.current.value='';
    descriptionRef.current.value='';
    priceRef.current.value='';
    imageRef.current.value='';
    setPreview('');
  };

  return (
    <div class="container mt-5 ">
      <div class="card mx-auto" style={{ width: "25rem" }}>
        <div class="card-body">
          <h4 class="card-title text-center">Product</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div class="mb-3">
              <label for="input1" class="form-label">
                Title
              </label>
              <input
                ref={titleRef}
                type="text"
                class="form-control"
                name="title"
              />
            </div>
            <div class="mb-3">
              <label for="input2" class="form-label">
                Description
              </label>
              <input
                ref={descriptionRef}
                type="text"
                class="form-control"
                name="description"
              />
            </div>
            <div class="mb-3">
              <label for="input3" class="form-label">
                Price
              </label>
              <input
                ref={priceRef}
                type="text"
                class="form-control"
                name="price"
              />
            </div>
            <div class="mb-3">
              <label for="input4" class="form-label">
                Image
              </label>
              <input
                ref={imageRef}
                onChange={handleFile}
                type="file"
                class="form-control"
                name="file"
              />
            </div>
            <div className="text-center mb-3">
              <img src={preview} className="w-50 rounded"></img>
            </div>
            <button
              onClick={addProduct}
              type="submit"
              class="btn btn-dark w-100"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
